import pool from "../db/pool.js";

export const createUser = async ({ name, email, password }) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name, email, password]
    );

    return result.rows[0];
};

export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};

export const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, name, email FROM users WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};