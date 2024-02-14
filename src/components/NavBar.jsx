/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function Navbar(props) {
    const [totalCart, setTotalCart] = useState(0);
    const cart = props.cart;
    useEffect(() => {
        const result = cart.CartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setTotalCart(result);
    }, [props]);

    return (
        <nav className="navbar">
            <NavLink to="/SuperMarket/" className="nav-brand">
                SuperM
            </NavLink>

            <ul>
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "active" : "")}
                        to="/SuperMarket/"
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "active" : "")}
                        to="/SuperMarket/about"
                    >
                        About us
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "active" : "")}
                        to="/SuperMarket/products"
                    >
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/SuperMarket/cart"
                        className="nav-item nav-cart btn btn-accent"
                    >
                        Cart ({totalCart})
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
