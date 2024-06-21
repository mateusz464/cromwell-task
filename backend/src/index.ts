import express from "express";
import helmet from "helmet";
import session from "express-session";
import cors from "cors";
import http from "http";
import { connect } from "./config/mongo";
import {BASE_API_URL, PORT} from "./config/config";

// Load routes
import user from "./routes/users";

// CORS options
const corsOptions = {
  origin: ["*", `${BASE_API_URL}:${PORT}`],
};

// Connect to MongoDB
void connect();

const app = express();

// Middlewares
const isCookie = process.env.NODE_ENV === "production";
app.use(express.json());
app.use(helmet());
app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: isCookie,
      maxAge: 86400,
    },
  })
);
app.use(cors(corsOptions));

// Mount routes
app.use("/api/user", user);

export const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

// Unhandled promise rejection handlers
process.on("unhandledRejection", (err: any, promise) => {
  console.log(`ERROR : ${err.message}`);
  server.close(() => process.exit(1));
});