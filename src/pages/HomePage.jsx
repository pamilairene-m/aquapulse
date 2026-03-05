import React, { useState, useEffect } from "react";

function HomePage() {
  const [waterLevel, setWaterLevel] = useState(40);

  // Animate water level up and down
  useEffect(() => {
    let increasing = true;
    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        if (prev >= 80) increasing = false;
        if (prev <= 20) increasing = true;
        return increasing ? prev + 2 : prev - 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center px-8 md:px-24 py-28 bg-gray-50">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find true power in your data with{" "}
            <span className="text-blue-600">AquaPulse</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            AI-powered groundwater prediction and trend analytics platform
            helping environmental monitoring with smart forecasting.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/predict"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Prediction
            </a>

            <a
              href="/trends"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              View Trends
            </a>
          </div>
        </div>

        {/* Full-Width Groundwater Gauge */}
        <div className="mt-16 w-full relative h-64 md:h-72 border-4 border-gray-300 rounded-lg overflow-hidden">
          
          {/* Sand at the bottom */}
          <div className="absolute bottom-0 w-full h-16 bg-brown-600"></div>

          {/* Water rising */}
          <div
            className="absolute bottom-16 w-full bg-blue-500 transition-all duration-500"
            style={{ height: `calc(${waterLevel}% - 16px)` }}
          >
            {/* Optional wave */}
            <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
              <path
                fill="#3b82f6"
                fillOpacity="0.6"
                d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,202.7C672,213,768,171,864,160C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          {/* Water Level Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-3xl md:text-4xl font-bold">
              {waterLevel}%
            </span>
          </div>
        </div>
      </section>

      {/* TRUSTED SECTION */}
      <section className="text-center py-12">
        <p className="text-gray-500">Trusted for groundwater monitoring</p>

        <div className="flex flex-wrap justify-center gap-8 mt-6 text-gray-400">
          <span>🌍 Environmental Dept</span>
          <span>💧 Water Board</span>
          <span>📊 Analytics Team</span>
          <span>🏛 Government</span>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-100 py-20 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-bold">Why choose our platform?</h2>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-12">
          <div className="bg-white p-8 rounded-xl shadow-md w-80 text-left">
            <h3 className="font-semibold text-lg">🤖 Artificial Intelligence</h3>
            <p className="mt-3 text-gray-600">
              Advanced regression models trained on historical groundwater data.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md w-80 text-left">
            <h3 className="font-semibold text-lg">📈 Machine Learning</h3>
            <p className="mt-3 text-gray-600">
              Accurate future forecasting with dynamic station-level analysis.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md w-80 text-left">
            <h3 className="font-semibold text-lg">🚨 Smart Alerts</h3>
            <p className="mt-3 text-gray-600">
              Automatic detection of high and low water levels with warnings.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20">
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl font-bold">
            The newest groundwater analytics platform
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Monitor stations, visualize trends, and predict water levels
            using AI-powered models in one centralized system.
          </p>
        </div>

        <div className="mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
            alt="dashboard"
            className="w-80"
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;