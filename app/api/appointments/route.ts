import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const body = await request.json()
    const {
      clientName,
      clientEmail,
      clientPhone,
      barberId,
      serviceId,
      appointmentDate,
      appointmentTime,
      notes,
    } = body

    // Validar datos requeridos
    if (
      !clientName ||
      !clientEmail ||
      !barberId ||
      !serviceId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Obtener información del barbero y servicio
    const [barberRes, serviceRes] = await Promise.all([
      supabase.from('barbers').select('name, email').eq('id', barberId).single(),
      supabase.from('services').select('name, duration_minutes').eq('id', serviceId).single(),
    ])

    if (barberRes.error || serviceRes.error) {
      return NextResponse.json(
        { error: 'Barbero o servicio no encontrado' },
        { status: 404 }
      )
    }

    // Crear el turno
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        barber_id: barberId,
        service_id: serviceId,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        notes: notes,
        status: 'confirmed',
      })
      .select()

    if (appointmentError) {
      console.error('Error creating appointment:', appointmentError)
      return NextResponse.json(
        { error: 'Error al crear el turno' },
        { status: 500 }
      )
    }

    // Enviar email de confirmación al cliente
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'noreply@barberia.com',
          to: clientEmail,
          subject: `Confirmación de tu turno - ${barberRes.data.name}`,
          html: `
            <h2>¡Turno Confirmado!</h2>
            <p>Hola ${clientName},</p>
            <p>Tu turno ha sido confirmado exitosamente.</p>
            <h3>Detalles del Turno</h3>
            <ul>
              <li><strong>Fecha:</strong> ${appointmentDate}</li>
              <li><strong>Hora:</strong> ${appointmentTime}</li>
              <li><strong>Barbero:</strong> ${barberRes.data.name}</li>
              <li><strong>Servicio:</strong> ${serviceRes.data.name}</li>
              <li><strong>Duración:</strong> ${serviceRes.data.duration_minutes} minutos</li>
            </ul>
            <p>Recibirás un recordatorio 15 minutos antes de tu cita.</p>
            <p>Si necesitas cancelar o cambiar tu turno, contáctanos.</p>
          `,
        }),
      })
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // No fallar si el email falla, el turno ya fue creado
    }

    // Enviar email al barbero
    if (barberRes.data.email) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'noreply@barberia.com',
            to: barberRes.data.email,
            subject: `Nuevo turno reservado - ${appointmentDate} ${appointmentTime}`,
            html: `
              <h2>Nuevo Turno Reservado</h2>
              <h3>Detalles</h3>
              <ul>
                <li><strong>Cliente:</strong> ${clientName}</li>
                <li><strong>Email:</strong> ${clientEmail}</li>
                <li><strong>Teléfono:</strong> ${clientPhone || 'No proporcionado'}</li>
                <li><strong>Fecha:</strong> ${appointmentDate}</li>
                <li><strong>Hora:</strong> ${appointmentTime}</li>
                <li><strong>Servicio:</strong> ${serviceRes.data.name}</li>
                <li><strong>Duración:</strong> ${serviceRes.data.duration_minutes} minutos</li>
              </ul>
              ${notes ? `<p><strong>Notas:</strong> ${notes}</p>` : ''}
            `,
          }),
        })
      } catch (emailError) {
        console.error('Error sending barber email:', emailError)
      }
    }

    return NextResponse.json(
      { success: true, appointment: appointment ? appointment[0] : null },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
