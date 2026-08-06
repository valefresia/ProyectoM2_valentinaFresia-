// Mockeamos el módulo de conexión a la DB: en vez de conectarse
// a PostgreSQL real, "pool.query" va a ser una función falsa (jest.fn())
// que nosotros controlamos en cada test.
jest.mock("../src/config/db", () => ({
  query: jest.fn(),
}));

const request = require("supertest");
const pool = require("../src/config/db");
const app = require("../src/app");

describe("Authors API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /authors devuelve 200 y la lista de autores", async () => {
    // Simulamos qué le "devolvería" la base si preguntáramos
    pool.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: "Ana Torres", email: "ana@example.com", bio: null, created_at: new Date() },
      ],
    });

    // Hacemos un request real (con supertest) contra tu app de Express
    const res = await request(app).get("/authors");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe("Ana Torres");
  });
});