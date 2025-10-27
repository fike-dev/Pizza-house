import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-yellow-500 px-4 py-3 uppercase flex items-center justify-between border-b-2 border-stone-400 sm:py-6 sm:px-7">
      <Link
        to="/"
        className="text-center text-sm tracking-[3px] sm:text-xl md:text-2xl xl:text-5xl md:tracking-[8px] "
      >
        Pizza House co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
