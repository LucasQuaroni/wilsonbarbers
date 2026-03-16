import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Este endpoint se ejecuta cada 15 minutos gracias a Vercel Cron
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

    // Obtener la fecha y hora actual
    const now = new Date()
    const currentDate = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().slice(0, 5)

    // Calcular 15 minutos después
    const inFifteenMinutes = new Date(now.getTime() + 15 * 60 * 1000)
    const fifteenMinutesTime = inFifteenMinutes.toTimeString().slice(0, 5)

    // Buscar turnos dentro de los próximos 15 minutos que no hayan enviado recordatorio
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(
        `
        id,
        client_name,
        client_email,
        appointment_date,
        appointment_time,
        barber:barber_id(name),
        service:service_id(name),
        reminder_sent
      `
      )
      .eq('appointment_date', currentDate)
      .gte('appointment_time', currentTime)
      .lte('appointment_time', fifteenMinutesTime)
      .eq('status', 'confirmed')
      .eq('reminder_sent', false)

    if (error) {
      console.error('Error fetching appointments:', error)
      return NextResponse.json(
        { error: 'Error fetching appointments' },
        { status: 500 }
      )
    }

    // Enviar recordatorios
    let sentCount = 0
    for (const appointment of appointments || []) {
      try {
        // Enviar email de recordatorio al cliente
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'noreply@barberia.com',
            to: appointment.client_email,
            subject: `Recordatorio: Tu turno en 15 minutos`,
            html: `
              <h2>¡Tu turno comienza en 15 minutos!</h2>
              <p>Hola ${appointment.client_name},</p>
              <p>Te recordamos que tu turno está agendado para:</p>
              <h3>Detalles</h3>
              <ul>
                <li><strong>Hora:</strong> ${appointment.appointment_time}</li>
                <li><strong>Barbero:</strong> ${appointment.barber?.name}</li>
                <li><strong>Servicio:</strong> ${appointment.service?.name}</li>
              </ul>
              <p>¡No llegues tarde!</p>
            `,
          }),
        })

        // Marcar como recordatorio enviado
        await supabase
          .from('appointments')
          .update({ reminder_sent: true })
          .eq('id', appointment.id)

        sentCount++
      } catch (emailError) {
        console.error('Error sending reminder email:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `${sentCount} recordatorios enviados`,
        appointmentsChecked: appointments?.length || 0,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Configuración de Vercel Cron (cada 15 minutos)
export const config = {
  maxDuration: 60,
}
