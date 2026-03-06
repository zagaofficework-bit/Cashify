const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()


app.use(express.json())
app.use(cookieParser())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.routes")
const productRouter = require("./routes/product.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");

/**
 * - Use Routes
 */

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);

module.exports = app