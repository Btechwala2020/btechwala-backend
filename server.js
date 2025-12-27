import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= RAZORPAY SETUP ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("✅ Backend running");
});

/* ================= CREATE ORDER ================= */
app.post("/create-order", async (req, res) => {
  try {
    const { type } = req.body;

    let amount = 0;

    // 🔥 PRICE LOGIC
    if (
      type === "FIRST_YEAR_PYQ" ||
      type === "SECOND_YEAR_PYQ" ||
      type === "THIRD_YEAR_PYQ" ||
      type === "FOURTH_YEAR_PYQ"
    ) {
      amount = 1000;
    }
     else if (type === "FIRST_YEAR_QUANTUM" ||
      type === "SECOND_YEAR_QUANTUM" ||
      type === "THIRD_YEAR_QUANTUM" ||
      type === "FOURTH_YEAR_QUANTUM"
    ) {
      amount = 2500; // ₹149
    } else {
      return res.status(400).json({ error: "Invalid product type" });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

/* ================= VERIFY PAYMENT ================= */
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

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
  console.log(`🚀 Server running on port ${PORT}`);
});
