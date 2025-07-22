import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">MySite</h1>
      <div className="space-x-4">
        <Link to="/" className="text-white-600 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-white-600 hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-white-600 hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
}
