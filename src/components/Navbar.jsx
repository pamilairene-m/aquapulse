import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-20 py-5 bg-white shadow-sm">
      <div className="text-xl font-bold text-blue-600">
        AquaPulse
      </div>

      <div className="flex gap-8 text-gray-700">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/predict" className="hover:text-blue-600">Predict</Link>
        <Link to="/trends" className="hover:text-blue-600">Trends</Link>
        <Link to="/map" className="hover:text-blue-600">Map</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
      </div>

      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Navbar;