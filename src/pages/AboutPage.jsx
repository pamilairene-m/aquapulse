function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <section className="relative px-24 py-28 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Intelligent Groundwater Monitoring
            <span className="block text-blue-600 mt-2">
              Powered by Machine Learning
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Our platform combines advanced data analytics and predictive
            modeling to transform groundwater monitoring into an intelligent,
            proactive system for environmental sustainability.
          </p>
        </div>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="px-24 py-20">
        <div className="grid grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-blue-600 text-3xl">📊</div>
            <h3 className="mt-6 text-xl font-semibold">
              Predictive Forecasting
            </h3>
            <p className="mt-4 text-gray-600">
              Regression models analyze historical groundwater datasets
              to generate accurate future predictions.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-blue-600 text-3xl">📈</div>
            <h3 className="mt-6 text-xl font-semibold">
              Trend Visualization
            </h3>
            <p className="mt-4 text-gray-600">
              Interactive charts provide station-wise historical trend
              insights for better decision-making.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-blue-600 text-3xl">🚨</div>
            <h3 className="mt-6 text-xl font-semibold">
              Smart Risk Detection
            </h3>
            <p className="mt-4 text-gray-600">
              Automated alert systems detect abnormal groundwater
              levels and notify stakeholders instantly.
            </p>
          </div>

        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="px-24 py-24 bg-white">
        <div className="grid grid-cols-2 gap-20 items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Designed for Environmental Impact
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              By integrating structured groundwater datasets with
              machine learning algorithms, the system enables proactive
              planning, resource management, and sustainability efforts.
            </p>

            <div className="mt-10 space-y-4 text-gray-700">
              <p>✔ Station-wise intelligent monitoring</p>
              <p>✔ Data-driven environmental planning</p>
              <p>✔ Scalable architecture</p>
              <p>✔ Real-time analytics dashboard</p>
            </div>
          </div>

          <div className="h-96 bg-gray-100 rounded-3xl shadow-inner flex items-center justify-center text-gray-400 text-lg">
            System Architecture Visualization
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="px-24 py-20 bg-gray-900 text-white">
        <div className="grid grid-cols-4 text-center">

          <div>
            <p className="text-4xl font-bold">120+</p>
            <p className="mt-3 text-gray-300">Monitoring Stations</p>
          </div>

          <div>
            <p className="text-4xl font-bold">98%</p>
            <p className="mt-3 text-gray-300">Prediction Accuracy</p>
          </div>

          <div>
            <p className="text-4xl font-bold">10+ Years</p>
            <p className="mt-3 text-gray-300">Historical Data</p>
          </div>

          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p className="mt-3 text-gray-300">System Monitoring</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutPage;