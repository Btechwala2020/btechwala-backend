import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= CORS CONFIG ================= */
app.use(
  cors({
    origin: "*", // 🔥 frontend domain bhi laga sakte ho
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ================= RAZORPAY ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

/* ================= CREATE ORDER (₹1) ================= */
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 1000, // ₹1 = 100 paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* ================= VERIFY PAYMENT ================= */
app.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Razorpay backend running on port ${PORT}`);
});
