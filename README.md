# MiniBlog API

API REST para gestionar **authors** y **posts** de un blog, desarrollada como proyecto integrador (Módulo 2 - Backend) para DevSpark. Permite operaciones CRUD completas con relación 1:N entre autores y posts.

Construida con Node.js, Express y PostgreSQL. Desplegada en Railway.

## URL de la API

> ⚠️ Completar después del deploy: `https://TU-APP.up.railway.app`

## Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **Cliente DB:** `pg` (node-postgres),queries parametrizadas
- **Testing:** Jest + Supertest
- **Documentación:** OpenAPI 3.0
- **Deployment:** Railway

## Modelo de datos

**authors**: `id`, `name` (requerido), `email` (requerido, único), `bio`, `created_at`
**posts**: `id`, `author_id` (FK → authors.id), `title` (requerido), `content` (requerido), `published`, `created_at`

## Endpoints

### Authors
- `GET /authors` - Listar todos los autores
- `GET /authors/:id` - Obtener un autor específico
- `POST /authors` - Crear un nuevo autor
- `PUT /authors/:id` - Actualizar un autor existente
- `DELETE /authors/:id` - Eliminar un autor

### Posts
- `GET /posts` - Listar todos los posts
- `GET /posts/:id` - Obtener un post específico
- `GET /posts/author/:authorId` - Obtener posts de un autor (con detalle del autor)
- `POST /posts` - Crear un nuevo post
- `PUT /posts/:id` - Actualizar un post existente
- `DELETE /posts/:id` - Eliminar un post

### health
- `GET /health` - Verifica que el servidor está activo

## Ejemplos de uso

### Listar autores


curl https://TU-APP.up.railway.app/authors

### Crear un autor


curl -X POST https://TU-APP.up.railway.app/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Valentina Fresia","email":"valen@example.com","bio":"Backend developer"}'


### Crear un post


curl -X POST https://TU-APP.up.railway.app/posts \
  -H "Content-Type: application/json" \
  -d '{"author_id":1,"title":"Mi primer post","content":"Contenido del post","published":true}'

### Obtener posts de un autor específico

```bash
curl https://TU-APP.up.railway.app/posts/author/1
```

> Los ejemplos completos de request/response de cada endpoint están en la documentación OpenAPI (`openapi.yaml`).

## Documentación OpenAPI

La especificación completa está en [`openapi.yaml`](./openapi.yaml), con todos los endpoints, parámetros, bodies y respuestas.

Para visualizarla en Swagger UI localmente:

```bash
npx @redocly/cli preview-docs openapi.yaml
```

## Ejecutar localmente

### Prerrequisitos

- Node.js 18+
- PostgreSQL 14+

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/valefresia/ProyectoM2_valentinaFresia-.git
cd ProyectoM2_valentinaFresia-
```

2. Instalar dependencias:


npm install


3. Configurar variables de entorno. Copiar `.env.example` a `.env` y completar con tus datos:

```
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/miniblog
NODE_ENV=development
```

4. Crear la base de datos y las tablas:

```bash
psql -U postgres -c "CREATE DATABASE miniblog;"
psql -U postgres -d miniblog -f db/schema.sql
psql -U postgres -d miniblog -f db/seed.sql
```

5. Iniciar el servidor:

```bash
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## Ejecutar los tests

npm test
Los tests son unitarios: mockean la conexión a PostgreSQL, así que no necesitan la base de datos corriendo. Cubren validaciones, casos de éxito y errores (404, 400) de los controllers de `authors` y `posts`.

## Deployment en Railway

1. Crear un proyecto en Railway y conectarlo al repositorio de GitHub.
2. Agregar un servicio de PostgreSQL desde el marketplace de Railway.
3. Railway inyecta automáticamente `DATABASE_URL` en las variables del servicio de la API (usando la Internal URL entre servicios del mismo proyecto).
4. Ejecutar `db/schema.sql` y `db/seed.sql` contra la base de Railway usando su Public URL.
5. Railway detecta `package.json` y corre `npm install` + `npm start` automáticamente.
6. Verificar el deploy con `curl https://TU-APP.up.railway.app/health`.

## Registro de uso de IA en el proyecto

Este proyecto fue desarrollado con asistencia de Claude :
- Generar la estructura inicial del proyecto y explicar cada capa (config/services/controllers/routes/middlewares).
- Redactar el schema SQL, las queries parametrizadas, los tests unitarios y esta documentación.
- Guiar paso a paso el debugging de errores durante el desarrollo (conexión a PostgreSQL, rutas de Express, comandos de PowerShell).

Todo el código fue revisado, ejecutado y probado manualmente (con curl / Invoke-RestMethod) antes de cada commit.
