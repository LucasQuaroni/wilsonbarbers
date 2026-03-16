-- Insertar barberos de ejemplo
INSERT INTO barbers (name, role, bio, email, is_active, display_order) VALUES
('Carlos García', 'Maestro Barbero', 'Más de 15 años de experiencia en barbería clásica y moderna', 'carlos@barberia.com', true, 1),
('Juan Rodríguez', 'Barbero Especialista', 'Experto en cortes contemporáneos y diseños personalizados', 'juan@barberia.com', true, 2),
('Miguel López', 'Barbero', 'Especialista en afeitados con navaja tradicional', 'miguel@barberia.com', true, 3)
ON CONFLICT DO NOTHING;

-- Insertar servicios disponibles
INSERT INTO services (name, description, price, duration_minutes, is_active, display_order) VALUES
('Corte Clásico', 'Corte tradicional con máquina y tijera', 350.00, 30, true, 1),
('Corte Moderno', 'Diseños contemporáneos y creativos', 400.00, 40, true, 2),
('Afeitado con Navaja', 'Afeitado tradicional con navaja de acero', 200.00, 20, true, 3),
('Corte + Afeitado', 'Paquete completo de corte y afeitado', 500.00, 50, true, 4),
('Barba y Bigote', 'Diseño y arreglación de barba', 150.00, 20, true, 5),
('Tratamiento Facial', 'Tratamiento hidratante post-afeitado', 250.00, 15, true, 6)
ON CONFLICT DO NOTHING;

-- Insertar configuración del negocio
INSERT INTO business_config (key, value) VALUES
('businessName', 'Barbería Premium Rosario'),
('phone', '+54 (341) 123-4567'),
('email', 'info@barberia-rosario.com'),
('address', 'Calle Mitre 1234, Rosario, Santa Fe')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insertar horarios de trabajo
INSERT INTO working_hours (day_of_week, open_time, close_time, is_closed) VALUES
(0, NULL, NULL, true), -- Domingo: Cerrado
(1, '09:00', '19:00', false), -- Lunes
(2, '09:00', '19:00', false), -- Martes
(3, '09:00', '19:00', false), -- Miércoles
(4, '09:00', '20:00', false), -- Jueves
(5, '09:00', '20:00', false), -- Viernes
(6, '10:00', '18:00', false) -- Sábado
ON CONFLICT (day_of_week) DO UPDATE SET 
  open_time = EXCLUDED.open_time,
  close_time = EXCLUDED.close_time,
  is_closed = EXCLUDED.is_closed;
