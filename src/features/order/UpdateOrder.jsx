import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  console.log(fetcher);

  const isSubmitting =
    fetcher.state === "submitting" || fetcher.state === "loading";

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <input type="hidden" value={JSON.stringify(order)} />
      <Button type="primary" disabled={isSubmitting}>
        {isSubmitting ? "Updating priority..." : "Make Priority"}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const dataToUpdate = { priority: true };
  await updateOrder(params.orderId, dataToUpdate);

  return null;
}

export default UpdateOrder;
