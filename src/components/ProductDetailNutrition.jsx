import { useOutletContext } from "react-router-dom";
export default function ProductDetailNutrition() {
    const context = useOutletContext();
    return (
        <>
            <table className="table table-nutrition">
                <thead>
                    <tr>
                        <th>Nutrient</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Protein</td>
                        <td>{context.nutrition.protein}g</td>
                    </tr>
                    <tr>
                        <td>Carbohydrates</td>
                        <td>{context.nutrition.carbs}g</td>
                    </tr>
                    <tr>
                        <td>Fat</td>
                        <td>{context.nutrition.fat}g</td>
                    </tr>
                    <tr>
                        <td>Salt</td>
                        <td>{context.nutrition.salt}g</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
