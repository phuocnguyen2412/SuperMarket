/* eslint-disable react/prop-types */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripeLoadedPromise = loadStripe(
    "pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate"
);

import Input from "./UI_KIT/Input";
import Button from "./UI_KIT/Button";

export default function Cart(props) {
    const [email, setEmail] = useState("");
    function handleFormSubmit(event) {
        event.preventDefault();
        const lineItems = props.cart.CartItems.map((product) => {
            return { price: product.price_id, quantity: product.quantity };
        });
        stripeLoadedPromise.then((stripe) => {
            stripe
                .redirectToCheckout({
                    lineItems: lineItems,
                    mode: "payment",
                    successUrl: "https://react-tutorial.app/app.html",
                    cancelUrl: "https://react-tutorial.app/app.html",
                    customerEmail: email,
                })
                .then((response) => {
                    // this will only log if the redirect did not work
                    console.log(response.error);
                })
                .catch((error) => {
                    // wrong API key? you will see the error message here
                    console.log(error);
                });
        });
    }
    return (
        <div className="products-layout">
            <h1>Products</h1>
            {props.cart.CartItems.length == 0 ? (
                <p>Take a look at our products</p>
            ) : (
                <>
                    <table className="table table-cart">
                        <thead>
                            <tr>
                                <th width="25%" className="th-product">
                                    Product
                                </th>
                                <th width="20%">Unit price</th>
                                <th width="10%">Quanity</th>
                                <th width="25%">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cart.CartItems.map((CartItem) => (
                                <tr key={CartItem.id}>
                                    <td>
                                        <img
                                            src={CartItem.image}
                                            width="30"
                                            height="30"
                                            alt=""
                                        />
                                        {CartItem.name}
                                    </td>
                                    <td>${CartItem.price}</td>
                                    <td>{CartItem.quantity}</td>
                                    <td>
                                        <strong>
                                            $
                                            {CartItem.quantity * CartItem.price}
                                        </strong>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="2"></th>
                                <th className="cart-highlight">Total</th>
                                <th className="cart-highlight">
                                    $
                                    {props.cart.CartItems.reduce(
                                        (total, cartItem) =>
                                            total +
                                            cartItem.price * cartItem.quantity,
                                        0
                                    )}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    <form className="pay-form" onSubmit={handleFormSubmit}>
                        <p>
                            Enter your email and then click on pay and your
                            products will be delivered to you on the same day!
                        </p>

                        <Input
                            onChange={(event) => setEmail(event.target.value)}
                            autocomplete="email"
                            placeholder="Email"
                            type="email"
                            required
                        />

                        <Button type="submit">Pay</Button>
                        <strong style={{ marginLeft: "20px" }}>
                            USE THIS CARD NUMBER TO PAY: 4242 4242 4242 4242
                        </strong>
                    </form>
                </>
            )}
        </div>
    );
}
