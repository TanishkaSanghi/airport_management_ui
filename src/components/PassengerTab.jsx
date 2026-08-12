import { useState } from "react";
import API from "../api";

export default function PassengerTab({ setResponse, setStatus }) {
  const [passengerId, setPassengerId] = useState("");

  const [passenger, setPassenger] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    passport_number: "",
  });

  // -----------------------------
  // SUCCESS RESPONSE
  // -----------------------------
  const handleSuccess = (res) => {
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
  const handleError = (err) => {
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
  // GET PASSENGER
  // -----------------------------
  const getPassenger = async () => {
    try {
      const res = await API.get(`/passengers/${passengerId}`);
      handleSuccess(res);
    } catch (err) {
      handleError(err);
    }
  };

  // -----------------------------
  // CREATE PASSENGER
  // -----------------------------
  const createPassenger = async () => {
    try {
      const res = await API.post("/passengers", passenger);
      handleSuccess(res);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <h2>Passenger APIs</h2>

      <hr />

      <br />

      {/* GET PASSENGER */}
      <div className="api-card">
        <h3>Get Passenger By ID</h3>

        <input
          type="number"
          placeholder="Passenger ID"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
        />

        <button onClick={getPassenger}>
          GET Passenger
        </button>
      </div>

      <br />

      {/* CREATE PASSENGER */}
      <div className="api-card">
        <h3>Create Passenger</h3>

        <input
          placeholder="First Name"
          value={passenger.first_name}
          onChange={(e) =>
            setPassenger({
              ...passenger,
              first_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Last Name"
          value={passenger.last_name}
          onChange={(e) =>
            setPassenger({
              ...passenger,
              last_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={passenger.email}
          onChange={(e) =>
            setPassenger({
              ...passenger,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone Number"
          value={passenger.phone}
          onChange={(e) =>
            setPassenger({
              ...passenger,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Passport Number"
          value={passenger.passport_number}
          onChange={(e) =>
            setPassenger({
              ...passenger,
              passport_number: e.target.value,
            })
          }
        />

        <button onClick={createPassenger}>
          CREATE Passenger
        </button>
      </div>
    </div>
  );
}