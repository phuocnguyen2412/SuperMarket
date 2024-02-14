import { useParams, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import useFetch from "./CustomHook/useFetch.jsx";
import Loader from "./Loader.jsx";

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const param = useParams();

    const { get, loading } = useFetch(
        "https://react-tutorial-demo.firebaseio.com/"
    );

    useEffect(() => {
        get(`productinfo/id${param.id}.json`)
            .then((data) => {
                console.log(data);
                setProductDetails(data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="product-details-layout">
            {loading && <Loader />}
            <div>
                <h2>{productDetails.name}</h2>
                <img
                    src={productDetails.image}
                    width="125"
                    height="125"
                    className="product-details-image"
                    alt="product name here"
                />
            </div>
            <div>
                <div className="tabs">
                    <ul>
                        <li>
                            <NavLink
                                to=""
                                className={({ isActive }) =>
                                    isActive ? "tab-active" : ""
                                }
                                end
                            >
                                Details
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="nutrition"
                                className={({ isActive }) =>
                                    isActive ? "tab-active" : ""
                                }
                            >
                                Nutrition
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="storage"
                                className={({ isActive }) =>
                                    isActive ? "tab-active" : ""
                                }
                            >
                                Storage
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet context={productDetails} />
            </div>
        </div>
    );
}
