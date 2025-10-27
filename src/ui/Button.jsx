import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  // const className =
  //   "bg-yellow-400 font-semibold text-stone-800 inline-block rounded-full tracking-wide hover:bg-yellow-300 transition-colors duration-150 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-yellow-200 disabled:text-stone-500  ";

  const base =
    "  text-sm font-semibold text-stone-800  inline-block rounded-full tracking-wide hover:bg-yellow-300 transition-colors duration-150 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-yellow-200 disabled:text-stone-500  ";

  const styles = {
    primary: base + " bg-yellow-400 py-1.5 px-3.5 md:py-4  md:px-12",
    small: base + " bg-yellow-400 px-3 py-1 md:py-2 md:px-5 text-xs md:text-md",
    round:
      base +
      " bg-yellow-400  px-1.5 py-1 md:py-2 md:px-3.5 text-xs md:text-sm ",
    secondary:
      " font-semibold text-sm border-2 border-stone-200 text-stone-500  inline-block rounded-full tracking-wide hover:bg-stone-300 hover:text-stone-800 transition-colors duration-150 focus:outline-none focus:text-stone-800  focus:ring focus:ring-stone-400 focus:bg-stone-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500  py-1 px-3 md:py-3.5  md:px-12 mt-3",
    delete:
      base +
      " bg-red-500 hover:bg-red-400 focus:bg-red-400 focus:ring-red-400 px-3 py-1 md:py-2 md:px-5 text-xs md:text-md",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}{" "}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
