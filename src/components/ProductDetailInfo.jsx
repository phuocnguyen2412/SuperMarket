import { useOutletContext } from "react-router-dom";

import Button from "./UI_KIT/Button";
export default function ProductDetailInfo(props) {
    const context = useOutletContext();
    console.log(context);
    return (
        <>
            <p>
                {context.description} sold at <strong>${context.price}</strong>{" "}
                per piece.
            </p>
            <Button onClick={() => props.cart.handleAddCartItem(context)}>
                ${context.price}
            </Button>
        </>
    );
}
