import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER (₹1)
app.post("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 100, // ₹1 = 100 paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });
  res.json(order);
});

// VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {
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
});

app.listen(5000, () =>
  console.log("✅ Razorpay backend running on 5000")
);
