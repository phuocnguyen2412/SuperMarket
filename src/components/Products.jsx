/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import Product from "./Product.jsx";
import useFetch from "./CustomHook/useFetch.jsx";
import Loader from "./Loader.jsx";
export default function Products(props) {
    const [products, setProducts] = useState([]);
    const { get, loading } = useFetch(
        "https://course-assets.tek4.vn/reactjs-assets/"
    );
    useEffect(() => {
        get("supermarket.json")
            .then((data) => setProducts(data))
            .catch((error) => console.log("Could not load products", error));
    }, []);
    return (
        <div className="cart-layout">
            <div>
                <h1>Your Cart</h1>
                <p>You have not added any product to your cart yet.</p>
                <div className="products-grid">
                    {loading && <Loader />}
                    {products &&
                        products.map((product) => (
                            <Product
                                key={product.id}
                                details={product}
                                cart={props.cart}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
