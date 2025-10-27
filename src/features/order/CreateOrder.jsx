import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import store from "../../store";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    error: addressError,
    address,
    position: { latitude: lat, longitude: lng },
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const errors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action='/order/new'> */}
      <Form method="POST" className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 sm:text-xl">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 sm:text-xl">Phone number</label>
          <div className="grow">
            <input className="input w-full " type="tel" name="phone" required />
            {errors?.phone && (
              <p className="text-xs mt-3 py-1 px-3 text-red-700 bg-red-100 rounded-md">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40 sm:text-xl">Address</label>
          <div className="relative grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {!lat && !lng && (
              <span className="absolute right-1 top-1 sm:top-2.5 sm:right-2  z-50">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  {isLoadingAddress ? "Getting position...." : "Get position"}
                </Button>
              </span>
            )}
            {addressStatus === "error" && (
              <p className="text-xs mt-3 py-1 px-3 text-red-700 bg-red-100 rounded-md">
                {addressError}{" "}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <input
            className="h-5 w-5 sm:h-6 sm:w-6 accent-yellow-400 focus:outline-none  "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => {
              // console.log(e.target.value);
              setWithPriority(e.target.checked);
            }}
          />
          <label className="sm:basis-40 sm:text-xl grow" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div className="mt-6">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={lat && lng ? `${lat}, ${lng}` : ""}
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order...."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect.
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  // DONT OVERUSE THIS METHOD
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
