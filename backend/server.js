const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");




dotenv.config();
const app = express();

app.use(express.json()); 

// Import routes
const authRoutes = require("./routes/auth");
const protected  = require("./routes/protected");  

// Connect to Database 
connectDB()
  .then(() => {

    // Register routes after DB is connected
    app.use("/api/auth", authRoutes);
    app.use("/api", protected); 

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });

