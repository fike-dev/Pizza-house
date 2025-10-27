import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  // console.log(username);
  if (!username) return null;

  return (
    <div className="hidden text-md font-semibold md:block lg:text-xl">
      {username}
    </div>
  );
}

export default Username;
