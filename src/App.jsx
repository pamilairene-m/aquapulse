// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [stations, setStations] = useState([]);
//   const [stationId, setStationId] = useState("");
//   const [date, setDate] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* -------------------------------
//      FETCH STATIONS
//   -------------------------------- */

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/stations")
//       .then((res) => {
//         setStations(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load stations");
//       });
//   }, []);

//   /* -------------------------------
//      HANDLE PREDICTION
//   -------------------------------- */

//   const handlePredict = async () => {
//     if (!stationId || !date) {
//       setError("Please select station and date");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setPrediction(null);

//       const response = await axios.post(
//         "http://localhost:4000/api/predict",
//         {
//           stationId,
//           date
//         }
//       );

//       setPrediction(response.data);

//     } catch (err) {
//       console.error("Prediction error:", err);
//       setError("Prediction failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h2>🌊 Groundwater Level Forecast</h2>

//       {/* Station Dropdown */}
//       <div style={{ marginBottom: "15px" }}>
//         <label>Select Station:</label><br />
//         <select
//           value={stationId}
//           onChange={(e) => setStationId(e.target.value)}
//           style={{ width: "450px", padding: "8px", marginTop: "5px" }}
//         >
//           <option value="">-- Select Station --</option>

//           {stations.map((station, index) => (
//             <option key={index} value={station.STATION}>
//               {station.STNAME}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Date Picker */}
//       <div style={{ marginBottom: "15px" }}>
//         <label>Select Future Date:</label><br />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           min={new Date().toISOString().split("T")[0]}
//           style={{ padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       {/* Predict Button */}
//       <button
//         onClick={handlePredict}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         Predict
//       </button>

//       {loading && <p>Loading prediction...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Prediction Result */}
//       {prediction && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Prediction Result</h3>
//           <p><strong>Status:</strong> {prediction.status}</p>
//           <p><strong>Alert:</strong> {prediction.alert}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import PredictPage from "./pages/PredictPage";
import TrendPage from "./pages/TrendPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/trends" element={<TrendPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;