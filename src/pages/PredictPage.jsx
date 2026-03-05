import React, { useEffect, useState } from "react";
import axios from "axios";

function PredictPage() {
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState("");
  const [date, setDate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load stations
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/stations")
      .then((res) => setStations(res.data))
      .catch(() => setError("Failed to load stations"));
  }, []);

  const handlePredict = async () => {
    if (!stationId || !date) {
      setError("Please select station and date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPrediction(null);

      const response = await axios.post(
        "http://localhost:4000/api/predict",
        { stationId, date }
      );

      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-24 py-16 overflow-visible">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          🌊 Groundwater Level Forecast
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl">
          Predict future groundwater levels using AI-powered regression models.
          Select a monitoring station and forecast date to generate insights.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 max-w-4xl overflow-visible">

        <div className="grid grid-cols-2 gap-8">

          {/* Station Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Monitoring Station
            </label>
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Select Station --</option>
              {stations.map((station, index) => (
                <option key={index} value={station.STATION}>
                  {station.STNAME}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Forecast Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Predict Button */}
        <div className="mt-8">
          <button
            onClick={handlePredict}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition duration-300"
          >
            {loading ? "Generating Prediction..." : "Predict"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-10 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-inner border border-blue-100">

            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              📊 Prediction Result
            </h3>

            <div className="grid grid-cols-3 gap-6">

              {/* Predicted Level */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-sm text-gray-500">
                  Predicted Water Level
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {prediction.predicted_level.toFixed(2)} m
                </p>
              </div>

              {/* Status */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-sm text-gray-500">
                  Status
                </p>
                <p
                  className={`text-2xl font-bold mt-2 ${
                    prediction.status === "High"
                      ? "text-green-600"
                      : prediction.status === "Low"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {prediction.status}
                </p>
              </div>

              {/* Alert */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-sm text-gray-500">
                  Alert
                </p>
                <p className="text-lg font-medium text-gray-700 mt-2">
                  {prediction.alert}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PredictPage;