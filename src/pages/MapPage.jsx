import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function FlyToStation({ station }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.flyTo([station.LATITUDE, station.LONGITUDE], 13, {
        duration: 1.5
      });
    }
  }, [station, map]);

  return null;
}

function MapPage() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const markerRefs = useRef({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/stations")
      .then((res) => setStations(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedStation && markerRefs.current[selectedStation.STATION]) {
      markerRefs.current[selectedStation.STATION].openPopup();
    }
  }, [selectedStation]);

  return (
    <div className="h-screen flex bg-gray-50">

      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">
          Monitoring Stations
        </h2>

        <div className="space-y-3">
          {stations.map((station) => (
            <div
              key={station.STATION}
              onClick={() => setSelectedStation(station)}
              className="p-3 bg-gray-100 rounded-lg text-sm cursor-pointer hover:bg-indigo-100 transition"
            >
              <p className="font-semibold">{station.STNAME}</p>
              <p className="text-gray-500 text-xs">
                ID: {station.STATION}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[900px]">

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🗺 San Joaquin County – Groundwater Wells
          </h1>

          <div className="h-[600px] w-full">
            <MapContainer
              center={[37.88, -121.48]}
              zoom={10}
              className="h-full w-full rounded-xl"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {selectedStation && (
                <FlyToStation station={selectedStation} />
              )}

              {stations.map((station) => (
                <Marker
                  key={station.STATION}
                  position={[station.LATITUDE, station.LONGITUDE]}
                  ref={(ref) => {
                    if (ref) {
                      markerRefs.current[station.STATION] = ref;
                    }
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{station.STNAME}</strong>
                      <br />
                      Station ID: {station.STATION}
                      <br />
                      County: {station.COUNTY_NAME}
                    </div>
                  </Popup>
                </Marker>
              ))}

            </MapContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MapPage;