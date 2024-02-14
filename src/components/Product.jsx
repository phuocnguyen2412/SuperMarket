/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "./UI_KIT/Button.jsx";
export default function Product(props) {
    const { image, name, description, price, id } = props.details;
    function findItemInCart() {
        for (let i = 0; i < props.cart.CartItems.length; i++) {
            if (props.cart.CartItems[i].id === id)
                return props.cart.CartItems[i];
        }
        return false;
    }

    return (
        <div className="product">
            <div className="product-image-container">
                <Link to={`${id}`}>
                    <img
                        src={image}
                        width="100"
                        height="100"
                        className="product-image"
                        alt="product name here"
                    />
                </Link>
                <div className="product-quantity-container">
                    {findItemInCart() && (
                        <div className="product-quantity">
                            {findItemInCart().quantity}
                        </div>
                    )}
                </div>
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="product-checkout">
                <div>
                    {findItemInCart() && (
                        <Button
                            outline
                            className="product-delete"
                            onClick={() =>
                                props.cart.handleSubtractCartItem(props.details)
                            }
                        >
                            x
                        </Button>
                    )}
                </div>

                <Button
                    outline
                    onClick={() => props.cart.handleAddCartItem(props.details)}
                >
                    ${price}
                </Button>
            </div>
        </div>
    );
}
