import { useState } from "react";
import API from "../api";

export default function PaymentTab({ setResponse, setStatus }) {
  const [paymentId, setPaymentId] = useState("");
  const [bookingId, setBookingId] = useState("");

  // -----------------------------
  // SUCCESS RESPONSE
  // -----------------------------
  const showResponse = (res) => {
    setStatus(res.status);

    const method = res.config?.method?.toUpperCase() || "N/A";
    const url = res.config?.baseURL
      ? `${res.config.baseURL}${res.config.url}`
      : res.config?.url || "N/A";

    setResponse(
      `✅ API Successfully Ran\n\n` +
      `Data:\n` +
      `${JSON.stringify(res.data, null, 2)}\n\n` +
      `Request:\n` +
      `${method} ${url}\n` +
      `Status: ${res.status}`
    );
  };

  // -----------------------------
  // ERROR RESPONSE
  // -----------------------------
  const showError = (err) => {
    const errorData =
      err.response?.data || {
        message: err.message,
      };

    const method = err.config?.method?.toUpperCase() || "N/A";
    const url = err.config?.baseURL
      ? `${err.config.baseURL}${err.config.url}`
      : err.config?.url || "N/A";

    setStatus(err.response?.status || "Error");

    setResponse(
      `❌ API Failed\n\n` +
      `Error:\n` +
      `${JSON.stringify(errorData, null, 2)}\n\n` +
      `Request:\n` +
      `${method} ${url}\n` +
      `Status: ${err.response?.status || "Error"}`
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
          onChange={(e) =>
            setPaymentId(e.target.value)
          }
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
          onChange={(e) =>
            setBookingId(e.target.value)
          }
        />

        <button onClick={getPaymentByBooking}>
          Get Payment
        </button>
      </div>
    </>
  );
}