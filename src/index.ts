import express from "express";

const app = express();
const port = 8005;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "RoomDashboard backend is running." });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
