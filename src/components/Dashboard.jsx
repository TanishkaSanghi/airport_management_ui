import { useState } from "react";
import "./Dashboard.css";

import PassengerTab from "./PassengerTab.jsx";
import FlightTab from "./FlightTab.jsx";
import AirportTab from "./AirportTab.jsx";
import BookingTab from "./BookingTab.jsx";
import PaymentTab from "./PaymentTab.jsx";
import OutputPanel from "./OutputPanel.jsx";

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("Passengers");

  const [response, setResponse] = useState("Airport Management API Ready");

  const [status, setStatus] = useState("");

  return (

    <div className="dashboard">

      <div className="header">

        <div>

          <h1>Airport Management System</h1>

          <p>Live API Manual Testing Portal</p>

        </div>

        <div className="server-status">

          🟢 Server Active

        </div>

      </div>

      <div className="tabs">

        <button
          className={activeTab === "Passengers" ? "active" : ""}
          onClick={() => setActiveTab("Passengers")}
        >
          Passengers
        </button>

        <button
          className={activeTab === "Flights" ? "active" : ""}
          onClick={() => setActiveTab("Flights")}
        >
          Flights
        </button>

        <button
          className={activeTab === "Airports" ? "active" : ""}
          onClick={() => setActiveTab("Airports")}
        >
          Airports
        </button>

        <button
          className={activeTab === "Bookings" ? "active" : ""}
          onClick={() => setActiveTab("Bookings")}
        >
          Bookings
        </button>

        <button
          className={activeTab === "Payments" ? "active" : ""}
          onClick={() => setActiveTab("Payments")}
        >
          Payments
        </button>

      </div>

      <div className="main-content">

        <div className="left-panel">

          {activeTab === "Passengers" && (
            <PassengerTab
              setResponse={setResponse}
              setStatus={setStatus}
            />
          )}

          {activeTab === "Flights" && (
            <FlightTab
              setResponse={setResponse}
              setStatus={setStatus}
            />
          )}

          {activeTab === "Airports" && (
            <AirportTab
              setResponse={setResponse}
              setStatus={setStatus}
            />
          )}

          {activeTab === "Bookings" && (
            <BookingTab
              setResponse={setResponse}
              setStatus={setStatus}
            />
          )}

          {activeTab === "Payments" && (
            <PaymentTab
              setResponse={setResponse}
              setStatus={setStatus}
            />
          )}

        </div>

        <OutputPanel
          response={response}
          status={status}
        />

      </div>

    </div>

  );

}