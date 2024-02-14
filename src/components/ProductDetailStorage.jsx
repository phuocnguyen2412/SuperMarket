import { useOutletContext } from "react-router-dom";
export default function ProductDetailStorage() {
    const context = useOutletContext();
    return (
        <>
            <p>
                <strong>Storage instructions:</strong> {context.storage}
            </p>
        </>
    );
}
