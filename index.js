import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);
app.use(cookieParser());
app.use(express.urlencoded ({ extended:false}))

const PORT = 8000;

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));