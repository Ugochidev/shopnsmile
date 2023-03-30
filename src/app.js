// require dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route")
const requisitionRoute = require("./routes/requisition.route");
const connectDB = require("./DBconnect/database");
//  middleware
app.use(express.json());

const PORT = process.env.PORT || 2016;

// connecting to DB

connectDB();
// Base route
app.get("/", (req, res)=> {
   res.send("Hello World!");
  
});

// route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute)
app.use("/api/v1/requisition", requisitionRoute);

app.listen(PORT, async () => {
  console.log(`The app is listening on PORT ${PORT}`);
});