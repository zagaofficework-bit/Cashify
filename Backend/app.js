const express      = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app          = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Import route handlers
const authRouter         = require("./routes/auth.routes");
const productRouter      = require("./routes/product.routes");
const subscriptionRouter = require("./routes/subscription.routes");
const adminRouter        = require("./routes/admin.routes");
const addressRouter      = require("./routes/address.routes");
const orderRouter        = require("./routes/order.routes");
const messageRouter      = require("./routes/message.routes");


// API routes
app.use("/api/auth",          authRouter);
app.use("/api/products",      productRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/admin",         adminRouter);
app.use("/api/address",       addressRouter);
app.use("/api/orders",        orderRouter);
app.use("/api/messages",      messageRouter);

module.exports = app;