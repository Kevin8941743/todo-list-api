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