import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function Deletetem({ children, pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="delete" onClick={() => dispatch(deleteItem(pizzaId))}>
      {children}
    </Button>
  );
}

export default Deletetem;
