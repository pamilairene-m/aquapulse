import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

/* Leaflet Map Imports */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function TrendPage() {
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState("");
  const [trendData, setTrendData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef();
  const mapSectionRef = useRef(); // <--- Added ref for scrolling

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/stations")
      .then(res => setStations(res.data))
      .catch(() => setError("Failed to load stations"));
  }, []);

  const handleShowTrend = async () => {
    if (!stationId) {
      setError("Please select a station");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setTrendData([]);

      const response = await axios.get(
        `http://localhost:4000/api/trends/${stationId}`
      );

      if (!response.data || response.data.length === 0) {
        setError("No trend data available for this station");
      } else {
        const formattedData = response.data.map(item => ({
          ...item,
          waterLevel: parseFloat(item.waterLevel.toFixed(2))
        }));
        setTrendData(formattedData);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load trend data");
    } finally {
      setLoading(false);
    }
  };

  const handleViewMap = () => {
    if (!stationId) {
      setError("Please select a station first");
      return;
    }
    const station = stations.find(s => s.STATION === stationId);
    setSelectedStation(station);

    // Pan to the station on the map
    if (mapRef.current && station) {
      mapRef.current.setView([station.LATITUDE, station.LONGITUDE], 12);
    }

    // Scroll smoothly to the map section
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Groundwater Trend Analysis</h1>
        <p className="text-gray-600 max-w-3xl">
          View historical groundwater level trends for monitoring stations across the Netherlands.
          Analyze fluctuations and detect long-term environmental patterns.
        </p>
      </div>

      {/* Station Selector + Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block font-semibold mb-1">Select Monitoring Station</label>
          <select
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Select Station --</option>
            {stations.map((station, index) => (
              <option key={index} value={station.STATION}>
                {station.STNAME}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleShowTrend}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Show Trend"}
        </button>

        <button
          onClick={handleViewMap}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          View on Map
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Trend Chart */}
      {trendData.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow space-y-6">

          <h2 className="text-2xl font-bold">Trend Chart</h2>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`${value} m`, name]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="waterLevel"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  name="Water Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Latest Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-500">Latest Water Level</p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                {trendData[trendData.length - 1].waterLevel} m
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-500">Latest Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full font-semibold ${
                  trendData[trendData.length - 1].status === "High"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {trendData[trendData.length - 1].status}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-500">Alert</p>
              <p className="mt-1 font-medium text-gray-700">
                {trendData[trendData.length - 1].alert}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Map Section */}
      {selectedStation && (
        <div
          ref={mapSectionRef} // <--- Added ref for scrolling
          className="bg-white p-6 rounded-2xl shadow space-y-4"
        >
          <h2 className="text-2xl font-bold">Station Map</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={[selectedStation.LATITUDE, selectedStation.LONGITUDE]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
              <Marker position={[selectedStation.LATITUDE, selectedStation.LONGITUDE]}>
                <Popup>
                  <div className="space-y-1">
                    <p className="font-bold">{selectedStation.STNAME}</p>
                    {trendData.length > 0 ? (
                      <>
                        <p>Latest Water Level: {trendData[trendData.length - 1].waterLevel} m</p>
                        <p>Status: {trendData[trendData.length - 1].status}</p>
                        <p>Alert: {trendData[trendData.length - 1].alert}</p>
                      </>
                    ) : (
                      <p>No trend data loaded</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

    </div>
  );
}

export default TrendPage;