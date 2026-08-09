import { useState } from "react";
import API from "../api";

export default function PaymentTab({ setResponse, setStatus }) {
  const [paymentId, setPaymentId] = useState("");
  const [bookingId, setBookingId] = useState("");

  const showResponse = (res) => {
    setStatus(res.status);
    setResponse(JSON.stringify(res.data, null, 2));
  };

  const showError = (err) => {
    setStatus(err.response?.status || "Error");

    setResponse(
      JSON.stringify(
        err.response?.data || { message: err.message },
        null,
        2
      )
    );
  };

  // =========================
  // GET PAYMENT BY PAYMENT ID
  // =========================
  const getPayment = async () => {
    try {
      const res = await API.get(`/payments/${paymentId}`);
      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // =========================
  // GET PAYMENT BY BOOKING ID
  // =========================
  const getPaymentByBooking = async () => {
    try {
      const res = await API.get(
        `/payments/booking/${bookingId}`
      );

      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <h2>Payment Endpoints</h2>

      {/* =========================
          1. GET PAYMENT BY PAYMENT ID
      ========================= */}
      <div className="api-card">
        <h3>1. Get Payment by Payment ID</h3>

        <input
          type="number"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />

        <button onClick={getPayment}>
          Get Payment
        </button>
      </div>

      {/* =========================
          2. GET PAYMENT BY BOOKING ID
      ========================= */}
      <div className="api-card">
        <h3>2. Get Payment by Booking ID</h3>

        <input
          type="number"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />

        <button onClick={getPaymentByBooking}>
          Get Payment
        </button>
      </div>
    </>
  );
}