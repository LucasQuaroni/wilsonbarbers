import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Este endpoint se ejecuta diariamente a las 8:00 AM para enviar el resumen del día
export async function GET(request: NextRequest) {
  try {
    // Validar que la solicitud viene de Vercel Cron
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()

    // Obtener la fecha actual
    const today = new Date().toISOString().split('T')[0]

    // Obtener todos los turnos del día
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(
        `
        id,
        client_name,
        client_email,
        appointment_time,
        barber:barber_id(name, email),
        service:service_id(name),
        status
      `
      )
      .eq('appointment_date', today)
      .in('status', ['confirmed', 'completed'])
      .order('appointment_time', { ascending: true })

    if (error) {
      console.error('Error fetching daily appointments:', error)
      return NextResponse.json(
        { error: 'Error fetching appointments' },
        { status: 500 }
      )
    }

    // Obtener configuración del negocio
    const { data: configData } = await supabase
      .from('business_config')
      .select('key, value')

    const config: any = {}
    configData?.forEach((item) => {
      config[item.key] = item.value
    })

    // Obtener emails de todos los barberos
    const { data: barbers } = await supabase
      .from('barbers')
      .select('email')
      .eq('is_active', true)

    const barberEmails = barbers?.filter((b) => b.email).map((b) => b.email) || []

    // Preparar el resumen HTML
    const appointmentsHtml =
      appointments && appointments.length > 0
        ? appointments
            .map(
              (apt) =>
                `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px;">${apt.appointment_time}</td>
            <td style="padding: 10px;">${apt.client_name}</td>
            <td style="padding: 10px;">${apt.barber?.name}</td>
            <td style="padding: 10px;">${apt.service?.name}</td>
            <td style="padding: 10px;">
              <span style="
                padding: 4px 8px;
                border-radius: 4px;
                background-color: ${apt.status === 'completed' ? '#d4edda' : '#cfe2ff'};
                color: ${apt.status === 'completed' ? '#155724' : '#004085'};
              ">
                ${apt.status === 'completed' ? 'Completado' : 'Confirmado'}
              </span>
            </td>
          </tr>
        `
            )
            .join('')
        : '<tr><td colspan="5" style="padding: 10px; text-align: center;">No hay turnos para hoy</td></tr>'

    const summaryHtml = `
      <h2>Resumen de Turnos - ${today}</h2>
      <p>Buenos días,</p>
      <p>Aquí está el resumen de los turnos programados para hoy:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Hora</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Cliente</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Barbero</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Servicio</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">Estado</th>
          </tr>
        </thead>
        <tbody>
          ${appointmentsHtml}
        </tbody>
      </table>
      <p style="color: #666; font-size: 12px;">
        Este es un mensaje automático de tu barbería. No respondas a este email.
      </p>
    `

    // Enviar resumen al email del negocio
    if (config.email) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'noreply@barberia.com',
            to: config.email,
            subject: `Resumen de turnos - ${today}`,
            html: summaryHtml,
          }),
        })
      } catch (emailError) {
        console.error('Error sending summary to business:', emailError)
      }
    }

    // Enviar resumen a todos los barberos
    for (const email of barberEmails) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'noreply@barberia.com',
            to: email,
            subject: `Resumen de turnos - ${today}`,
            html: summaryHtml,
          }),
        })
      } catch (emailError) {
        console.error('Error sending summary to barber:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Resumen diario enviado',
        appointmentsCount: appointments?.length || 0,
        emailsSent: (barberEmails.length > 0 ? 1 : 0) + barberEmails.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Daily summary cron error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Configuración de Vercel Cron (diariamente a las 8:00 AM)
export const config = {
  maxDuration: 60,
}
