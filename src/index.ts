import express from "express";
import cors from "cors" ;
import AllsubjectRouter from "./routes/subjects"

const PORT = 3011;
const app = express();


if(!process.env. FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not set in .env file');
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));



app.get("/", (_req, res) => {
  res.send("hello");
});

app.use('/subjects', AllsubjectRouter);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
