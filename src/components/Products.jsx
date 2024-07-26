import {useState, useEffect, useContext} from "react";
import {fetchMeals} from "../http.js";
import Error from "./Error.jsx";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Products() {
    const [isFetching, setIsFetching] = useState(false);
    const [availableMeals, setAvailableMeals] = useState([]);
    const [error, setError] = useState();
    const { addItemToCart } = useContext(CartContext);

    useEffect(() => {
        async function fetchAvailableMeals() {
            setIsFetching(true);

            try {
                const meals = await fetchMeals();

                setAvailableMeals(meals);
            } catch (error) {
                setError({message: error.message || 'Could not fetch meals, please try again later'});
                setIsFetching(false);
            }

            setIsFetching(false);
        }

        fetchAvailableMeals();
    }, [])

    if (error) return <Error title="An error occured!" message={error.message}>{error}</Error>;

    return (
        <ul id="meals">
            {availableMeals.map((meal) => (
                <li key={meal.id} className="meal-item">
                    <article>
                        <img src={`http://localhost:3000/${meal.image}`} alt=""/>
                        <h3>{meal.name}</h3>
                        <div className="meal-item-price">{meal.price}</div>
                        <div className="meal-item-description">{meal.description}</div>
                        <button
                            className="meal-item-actions"
                            onClick={() => addItemToCart(meal.id)}
                        >
                            Add to cart
                        </button>
                    </article>
                </li>
            ))}
        </ul>
    )
}