import { useState } from "react";
import API from "../api";

export default function FlightTab({ setResponse, setStatus }) {

  const [flightId, setFlightId] = useState("");
  const [seatFlightId, setSeatFlightId] = useState("");

  const [newFlight, setNewFlight] = useState({
    flight_number: "",
    airline_name: "",
    departure_time: "",
    arrival_time: "",
    gate: "",
    total_seats: "",
    origin_airport_id: "",
    dest_airport_id: "",
  });

  const [updateFlight, setUpdateFlight] = useState({
    flight_number: "",
    airline_name: "",
    departure_time: "",
    arrival_time: "",
    status: "",
    gate: "",
    total_seats: "",
  });

  const showSuccess = (res) => {
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

  const getFlights = async () => {
    try {
      const res = await API.get("/flights");
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  const getFlight = async () => {
    try {
      const res = await API.get(`/flights/${flightId}`);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  const getSeats = async () => {
    try {
      const res = await API.get(`/flights/${seatFlightId}/seats`);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  const createFlight = async () => {
    try {
      const res = await API.post("/flights", {
        ...newFlight,
        total_seats: Number(newFlight.total_seats),
        origin_airport_id: Number(newFlight.origin_airport_id),
        dest_airport_id: Number(newFlight.dest_airport_id),
      });

      showSuccess(res);

    } catch (err) {
      showError(err);
    }
  };

  const patchFlight = async () => {
  try {
    const data = {};

    if (updateFlight.flight_number)
      data.flight_number = updateFlight.flight_number;

    if (updateFlight.airline_name)
      data.airline_name = updateFlight.airline_name;

    if (updateFlight.departure_time)
      data.departure_time = updateFlight.departure_time;

    if (updateFlight.arrival_time)
      data.arrival_time = updateFlight.arrival_time;

    if (updateFlight.status)
      data.status = updateFlight.status;

    if (updateFlight.gate)
      data.gate = updateFlight.gate;

    if (updateFlight.total_seats)
      data.total_seats = Number(updateFlight.total_seats);

    const res = await API.patch(`/flights/${flightId}`, data);

    showSuccess(res);

  } catch (err) {
    showError(err);
  }
};

  const deleteFlight = async () => {
    try {

      const res = await API.delete(`/flights/${flightId}`);

      showSuccess(res);

    } catch (err) {
      showError(err);
    }
  };

  return (

<div>

<h2>Flight APIs</h2>

<hr/>

<div className="api-card">

<h3>1. Get All Flights</h3>

<button className="get-btn"
onClick={getFlights}>
Get Flights
</button>

</div>

<div className="api-card">

<h3>2. Get Flight By ID</h3>

<input
placeholder="Flight ID"
value={flightId}
onChange={(e)=>setFlightId(e.target.value)}
/>

<button
className="get-btn"
onClick={getFlight}>
Get Flight
</button>

</div>

<div className="api-card">

<h3>3. Get Seat Availability</h3>

<input
placeholder="Flight ID"
value={seatFlightId}
onChange={(e)=>setSeatFlightId(e.target.value)}
/>

<button
className="get-btn"
onClick={getSeats}>
Get Seats
</button>

</div>

<div className="api-card">

  <h3>4. Create Flight</h3>

  <input
    placeholder="Flight Number"
    value={newFlight.flight_number}
    onChange={(e) =>
      setNewFlight({ ...newFlight, flight_number: e.target.value })
    }
  />

  <input
    placeholder="Airline Name"
    value={newFlight.airline_name}
    onChange={(e) =>
      setNewFlight({ ...newFlight, airline_name: e.target.value })
    }
  />

  <input
    placeholder="Departure Time (YYYY-MM-DD HH:MM:SS)"
    value={newFlight.departure_time}
    onChange={(e) =>
      setNewFlight({ ...newFlight, departure_time: e.target.value })
    }
  />

  <input
    placeholder="Arrival Time (YYYY-MM-DD HH:MM:SS)"
    value={newFlight.arrival_time}
    onChange={(e) =>
      setNewFlight({ ...newFlight, arrival_time: e.target.value })
    }
  />

  <input
    placeholder="Gate"
    value={newFlight.gate}
    onChange={(e) =>
      setNewFlight({ ...newFlight, gate: e.target.value })
    }
  />

  <input
    placeholder="Total Seats"
    value={newFlight.total_seats}
    onChange={(e) =>
      setNewFlight({ ...newFlight, total_seats: e.target.value })
    }
  />

  <input
    placeholder="Origin Airport ID"
    value={newFlight.origin_airport_id}
    onChange={(e) =>
      setNewFlight({ ...newFlight, origin_airport_id: e.target.value })
    }
  />

  <input
    placeholder="Destination Airport ID"
    value={newFlight.dest_airport_id}
    onChange={(e) =>
      setNewFlight({ ...newFlight, dest_airport_id: e.target.value })
    }
  />

  <button
    className="post-btn"
    onClick={createFlight}
  >
    Create Flight
  </button>

</div>

<div className="api-card">

  <h3>5. Patch Flight</h3>

  <input
    placeholder="Flight ID"
    value={flightId}
    onChange={(e) => setFlightId(e.target.value)}
  />

  <input
    placeholder="Flight Number"
    value={updateFlight.flight_number}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        flight_number: e.target.value,
      })
    }
  />

  <input
    placeholder="Airline Name"
    value={updateFlight.airline_name}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        airline_name: e.target.value,
      })
    }
  />

  <input
    placeholder="Departure Time"
    value={updateFlight.departure_time}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        departure_time: e.target.value,
      })
    }
  />

  <input
    placeholder="Arrival Time"
    value={updateFlight.arrival_time}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        arrival_time: e.target.value,
      })
    }
  />

  <input
    placeholder="Status"
    value={updateFlight.status}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        status: e.target.value,
      })
    }
  />

  <input
    placeholder="Gate"
    value={updateFlight.gate}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        gate: e.target.value,
      })
    }
  />

  <input
    placeholder="Total Seats"
    value={updateFlight.total_seats}
    onChange={(e) =>
      setUpdateFlight({
        ...updateFlight,
        total_seats: e.target.value,
      })
    }
  />

  <button
    className="patch-btn"
    onClick={patchFlight}
  >
    Patch Flight
  </button>

</div>

<div className="api-card">

  <h3>6. Delete Flight</h3>

  <input
    placeholder="Flight ID"
    value={flightId}
    onChange={(e) => setFlightId(e.target.value)}
  />

  <button
    className="delete-btn"
    onClick={deleteFlight}
  >
    Delete Flight
  </button>

</div>

</div>

  );

}
