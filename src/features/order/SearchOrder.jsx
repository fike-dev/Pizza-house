import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-2 py-1 text-sm bg-yellow-100 placeholder:text-stone-400 w-24  sm:w-64 md:text-md lg:w-96 lg:text-xl transition-all duration-150 focus:outline-none focus:w-28 placeholder:text-sm sm:placeholder:text-md  focus:sm:w-72 focus:lg:w-[30rem] focus:ring focus:ring-yellow-500 focus:ring-offset-1"
      />
    </form>
  );
}

export default SearchOrder;
