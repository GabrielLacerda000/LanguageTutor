import { Elysia } from "elysia";
import { tutorRoute } from "./routes/tutorRoute";

const app = new Elysia()
tutorRoute(app);
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
