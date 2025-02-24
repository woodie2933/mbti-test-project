import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-[#292929] text-white">
      <nav className="flex items-center ml-2 space-x-10">
        <Link
          to="/"
          className="text-white transition hover:text-[#f56d6d]  duration-300"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="text-white transition hover:text-[#f56d6d]  duration-300"
        >
          Profile
        </Link>
        <Link
          to="/test"
          className="text-white transition hover:text-[#f56d6d]  duration-300"
        >
          Test
        </Link>
        <Link
          to="/result"
          className="text-white transition hover:text-[#f56d6d]  duration-300"
        >
          Result
        </Link>
      </nav>
    </header>
  );
};

export default Header;
