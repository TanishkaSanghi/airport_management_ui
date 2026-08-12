import { useState } from "react";
import API from "../api";

export default function BookingTab({ setResponse, setStatus }) {
  const [bookingId, setBookingId] = useState("");

  const [booking, setBooking] = useState({
    seat_number: "",
    class_type: "",
    passenger_id: "",
    flight_id: "",
    amount: "",
    method: "",
  });

  const [patchBooking, setPatchBooking] = useState({
    seat_number: "",
    class_type: "",
    status: "",
  });

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

  // -----------------------------
  // CREATE BOOKING
  // -----------------------------
  const createBooking = async () => {
    try {
      const res = await API.post("/bookings", {
        ...booking,
        passenger_id: Number(booking.passenger_id),
        flight_id: Number(booking.flight_id),
        amount: Number(booking.amount),
      });

      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // GET BOOKING
  // -----------------------------
  const getBooking = async () => {
    try {
      const res = await API.get(`/bookings/${bookingId}`);
      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // PATCH BOOKING
  // -----------------------------
  const patchBookingAPI = async () => {
    try {
      const data = {};

      if (patchBooking.seat_number.trim() !== "") {
        data.seat_number = patchBooking.seat_number;
      }

      if (patchBooking.class_type.trim() !== "") {
        data.class_type = patchBooking.class_type;
      }

      if (patchBooking.status.trim() !== "") {
        data.status = patchBooking.status;
      }

      const res = await API.patch(
        `/bookings/${bookingId}`,
        data
      );

      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // DELETE BOOKING
  // -----------------------------
  const deleteBooking = async () => {
    try {
      const res = await API.delete(
        `/bookings/${bookingId}`
      );

      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <h2>Booking Endpoints</h2>

      {/* =========================
          1. CREATE BOOKING
      ========================= */}
      <div className="api-card">
        <h3>1. Create Booking</h3>

        <input
          placeholder="Seat Number"
          value={booking.seat_number}
          onChange={(e) =>
            setBooking({
              ...booking,
              seat_number: e.target.value,
            })
          }
        />

        <input
          placeholder="Class Type"
          value={booking.class_type}
          onChange={(e) =>
            setBooking({
              ...booking,
              class_type: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Passenger ID"
          value={booking.passenger_id}
          onChange={(e) =>
            setBooking({
              ...booking,
              passenger_id: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Flight ID"
          value={booking.flight_id}
          onChange={(e) =>
            setBooking({
              ...booking,
              flight_id: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={booking.amount}
          onChange={(e) =>
            setBooking({
              ...booking,
              amount: e.target.value,
            })
          }
        />

        <input
          placeholder="Payment Method"
          value={booking.method}
          onChange={(e) =>
            setBooking({
              ...booking,
              method: e.target.value,
            })
          }
        />

        <button onClick={createBooking}>
          Create Booking
        </button>
      </div>

      {/* =========================
          2. GET BOOKING
      ========================= */}
      <div className="api-card">
        <h3>2. Get Booking</h3>

        <input
          type="number"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) =>
            setBookingId(e.target.value)
          }
        />

        <button onClick={getBooking}>
          Get Booking
        </button>
      </div>

      {/* =========================
          3. UPDATE BOOKING
      ========================= */}
      <div className="api-card">
        <h3>3. Update Booking</h3>

        <input
          type="number"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) =>
            setBookingId(e.target.value)
          }
        />

        <input
          placeholder="Seat Number"
          value={patchBooking.seat_number}
          onChange={(e) =>
            setPatchBooking({
              ...patchBooking,
              seat_number: e.target.value,
            })
          }
        />

        <input
          placeholder="Class Type"
          value={patchBooking.class_type}
          onChange={(e) =>
            setPatchBooking({
              ...patchBooking,
              class_type: e.target.value,
            })
          }
        />

        <input
          placeholder="Status"
          value={patchBooking.status}
          onChange={(e) =>
            setPatchBooking({
              ...patchBooking,
              status: e.target.value,
            })
          }
        />

        <button onClick={patchBookingAPI}>
          Patch Booking
        </button>
      </div>

      {/* =========================
          4. DELETE BOOKING
      ========================= */}
      <div className="api-card">
        <h3>4. Delete Booking</h3>

        <input
          type="number"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) =>
            setBookingId(e.target.value)
          }
        />

        <button
          style={{ background: "#dc2626" }}
          onClick={deleteBooking}
        >
          Delete Booking
        </button>
      </div>
    </>
  );
}