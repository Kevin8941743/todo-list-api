import express from "express"
import { createClient } from "redis"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import pg from "pg"
import bcrypt from "bcrypt"
const { Pool } = pg

dotenv.config()
const PORT = 3001
const app = express()
app.use(express.json())
const client = createClient({
    url: process.env.REDIS_URL
})

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
})

try {
    await client.connect()
} catch (error) {
    console.error(error)
}

const limiter = rateLimit({
    max: 15,
    windowMs: 20 * 60 * 1000,
    message: "Please wait 20 minutes!"
})

app.post("/register", limiter, async (req, res) => {

    const { name, email, password } = req.body 

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Some data missing"})
    }

    const result = await pool.query(
        `SELECT email FROM auth WHERE email=$1`,
        [email]
    )

    if (result.rows.length !== 0) {
        return res.status(400).json({ error: "Email already exists!"})
    }

    const hashed = await bcrypt.hash(password, 10)
    try {
    const inserting_data = await pool.query(
        `INSERT INTO auth (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name, email, hashed]
    )

    return res.status(201).json(inserting_data.rows[0])

} catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })

}
})

app.post("/login", limiter, async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Some data missing"})
    }

    const result = await pool.query(
        `SELECT * FROM auth WHERE email=$1`,
        [email]
    )

    if (result.rows.length === 0 ) {
        return res.status(400).json({ error: "Resource not found!"})
    }
