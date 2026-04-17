import express from "express"
import { createClient } from "redis"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import pg from "pg"
import bcrypt from "bcrypt"
const { Pool } = pg

