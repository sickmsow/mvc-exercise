const db = require("../db/index");

const users = [
  { name: 'Bamba', email: 'bamba@gmail.com', password: 'bambaPassword' },
  { name: 'Mamor', email: 'mamor@gmail.com', password: 'MamorPassword' },
  { name: 'Aida', email: 'aida@gmail.com', password: 'aidaPassword' },
];

async function setup() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  for (const u of users) {
    await db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
      [u.name, u.email, u.password]
    );
  }

  console.log("User table created and populated.");
}

setup().catch(console.error);

exports.list = async () => {
  const { rows } = await db.query('SELECT * FROM "user"');
  return rows;
};

exports.view = async (id) => {
  const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1', [id]);
  return rows.length ? rows[0] : null;
};

exports.add = async ({ name, email, password }) => {
  await db.query(
    'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
    [name, email, password]
  );
};

exports.getUserByEmail = async (email) => {
  try {
    const { rows } = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};
