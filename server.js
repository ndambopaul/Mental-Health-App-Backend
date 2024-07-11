const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("common"));

// Database Configurations
// DB configs will be used to env variables soon enough
const connectionString = "mongodb://localhost:27017/mentalhealthdb";
const { DatabaseConnector } = require("./db/connect");
try {
    const db_connector = new DatabaseConnector(connectionString, "LOCAL")
    db_connector.connect_database()
} catch (error) {
    console.log(error)
}

// Authentication Middleware
const { verifyUser } = require("./middleware/authenticate");

// BASE ROUTE
app.get("/", (req, res) => {
    res.send({ message: "The server is up and running!!" }).status(200)
});

// Specific Function Routes Imports
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");


app.use("/api/v0/auth", authRoutes);
app.use("/api/v0/users", verifyUser, usersRoutes);

// Starting server
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});
