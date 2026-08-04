INSERT INTO authors (name, email, bio) VALUES
  ('Ana Torres', 'ana.torres@example.com', 'Desarrolladora backend y escritora técnica'),
  ('Bruno Díaz', 'bruno.diaz@example.com', 'Apasionado por PostgreSQL y APIs REST'),
  ('Carla Núñez', 'carla.nunez@example.com', NULL)
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (author_id, title, content, published) VALUES
  ((SELECT id FROM authors WHERE email = 'ana.torres@example.com'), 'Primeros pasos con Express', 'Contenido de ejemplo sobre cómo armar un servidor con Express...', TRUE),
  ((SELECT id FROM authors WHERE email = 'ana.torres@example.com'), 'Conectando Express con PostgreSQL', 'Contenido de ejemplo sobre el uso de pg y consultas parametrizadas...', TRUE),
  ((SELECT id FROM authors WHERE email = 'bruno.diaz@example.com'), 'Diseñando schemas relacionales', 'Contenido de ejemplo sobre entidades, atributos y relaciones...', FALSE),
  ((SELECT id FROM authors WHERE email = 'carla.nunez@example.com'), 'Buenas prácticas para APIs REST', 'Contenido de ejemplo sobre convenciones de naming y status codes...', TRUE);