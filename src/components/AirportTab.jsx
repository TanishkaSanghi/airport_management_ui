import { useState } from "react";
import API from "../api";

export default function AirportTab({ setResponse, setStatus }) {
  const [airportId, setAirportId] = useState("");

  const [airport, setAirport] = useState({
    name: "",
    city: "",
    country: "",
    code: "",
  });

  const [updateAirport, setUpdateAirport] = useState({
    name: "",
    city: "",
    country: "",
    code: "",
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
  // GET ALL AIRPORTS
  // -----------------------------
  const getAllAirports = async () => {
    try {
      const res = await API.get("/airports");
      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // GET AIRPORT BY ID
  // -----------------------------
  const getAirport = async () => {
    try {
      const res = await API.get(`/airports/${airportId}`);
      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // CREATE AIRPORT
  // -----------------------------
  const createAirport = async () => {
    try {
      const res = await API.post("/airports", airport);
      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  // -----------------------------
  // PATCH AIRPORT
  // -----------------------------
  const patchAirport = async () => {
    try {
      const data = {};

      if (updateAirport.name.trim() !== "") {
        data.name = updateAirport.name;
      }

      if (updateAirport.city.trim() !== "") {
        data.city = updateAirport.city;
      }

      if (updateAirport.country.trim() !== "") {
        data.country = updateAirport.country;
      }

      if (updateAirport.code.trim() !== "") {
        data.code = updateAirport.code;
      }

      const res = await API.patch(
        `/airports/${airportId}`,
        data
      );

      showResponse(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <h2>Airport Endpoints</h2>

      {/* =========================
          1. GET AIRPORTS
      ========================= */}
      <div className="api-card">
        <h3>1. Get Airports</h3>

        <button onClick={getAllAirports}>
          Get All
        </button>

        <input
          placeholder="Airport ID"
          value={airportId}
          onChange={(e) => setAirportId(e.target.value)}
        />

        <button onClick={getAirport}>
          Get by ID
        </button>
      </div>

      {/* =========================
          2. CREATE AIRPORT
      ========================= */}
      <div className="api-card">
        <h3>2. Create Airport</h3>

        <input
          placeholder="Airport Name"
          value={airport.name}
          onChange={(e) =>
            setAirport({
              ...airport,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="City"
          value={airport.city}
          onChange={(e) =>
            setAirport({
              ...airport,
              city: e.target.value,
            })
          }
        />

        <input
          placeholder="Country"
          value={airport.country}
          onChange={(e) =>
            setAirport({
              ...airport,
              country: e.target.value,
            })
          }
        />

        <input
          placeholder="Airport Code"
          value={airport.code}
          onChange={(e) =>
            setAirport({
              ...airport,
              code: e.target.value,
            })
          }
        />

        <button onClick={createAirport}>
          Create Airport
        </button>
      </div>

      {/* =========================
          3. UPDATE AIRPORT
      ========================= */}
      <div className="api-card">
        <h3>3. Update Airport</h3>

        <input
          placeholder="Airport ID"
          value={airportId}
          onChange={(e) => setAirportId(e.target.value)}
        />

        <input
          placeholder="Airport Name"
          value={updateAirport.name}
          onChange={(e) =>
            setUpdateAirport({
              ...updateAirport,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="City"
          value={updateAirport.city}
          onChange={(e) =>
            setUpdateAirport({
              ...updateAirport,
              city: e.target.value,
            })
          }
        />

        <input
          placeholder="Country"
          value={updateAirport.country}
          onChange={(e) =>
            setUpdateAirport({
              ...updateAirport,
              country: e.target.value,
            })
          }
        />

        <input
          placeholder="Airport Code"
          value={updateAirport.code}
          onChange={(e) =>
            setUpdateAirport({
              ...updateAirport,
              code: e.target.value,
            })
          }
        />

        <button onClick={patchAirport}>
          Patch Airport
        </button>
      </div>
    </>
  );
}