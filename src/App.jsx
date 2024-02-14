import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import ProductDetailInfo from "./components/ProductDetailInfo.jsx";
import ProductDetailNutrition from "./components/ProductDetailNutrition.jsx";
import ProductDetailStorage from "./components/ProductDetailStorage.jsx";

function App() {
    function isExistingItem(arr, k) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === k.id) return true;
        }
        return false;
    }

    const [cart, setCart] = useState(function () {
        let savedCart = {
            CartItems: [],
            handleAddCartItem: function (newCartItem) {
                setCart((prevCart) => {
                    if (isExistingItem(prevCart.CartItems, newCartItem)) {
                        console.log(1);
                        // Nếu sản phẩm đã tồn tại, tăng quantity lên 1
                        const updatedCart = prevCart.CartItems.map((cartItem) =>
                            cartItem.id === newCartItem.id
                                ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity + 1,
                                  }
                                : cartItem
                        );
                        console.log(updatedCart);
                        return {
                            ...prevCart,
                            CartItems: updatedCart,
                        };
                    } else {
                        // Nếu sản phẩm không tồn tại, thêm mới với quantity = 1
                        const newCart = [
                            ...prevCart.CartItems,
                            {
                                ...newCartItem,
                                quantity: 1,
                            },
                        ];

                        return {
                            ...prevCart,
                            CartItems: newCart,
                        };
                    }
                });
            },
            handleSubtractCartItem: function (cartItem) {
                setCart((prevCart) => {
                    const updatedCart = prevCart.CartItems.filter(
                        (product) => product.id !== cartItem.id
                    );
                    return {
                        ...cart,
                        CartItems: updatedCart,
                    };
                });
            },
        };
        try {
            savedCart = {
                ...savedCart,
                CartItems: JSON.parse(localStorage.getItem("CartItems")) || [],
            };
        } catch (err) {
            savedCart = {
                ...savedCart,
                CartItems: [],
            };
        }
        return savedCart;
    });

    useEffect(() => {
        if (cart) {
            localStorage.setItem("CartItems", JSON.stringify(cart.CartItems));
        }
    }, [cart]);
    return (
        <BrowserRouter>
            <NavBar cart={cart} />
            <div className="container">
                <Routes>
                    <Route path="/SuperMarket/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/products"
                        element={<Products cart={cart} />}
                    />
                    <Route path="/cart" element={<Cart cart={cart} />} />
                    <Route path="/products/:id" element={<ProductDetails />}>
                        <Route
                            path=""
                            element={<ProductDetailInfo cart={cart} />}
                        ></Route>
                        <Route
                            path="nutrition"
                            element={<ProductDetailNutrition />}
                        ></Route>
                        <Route
                            path="storage"
                            element={<ProductDetailStorage />}
                        ></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
