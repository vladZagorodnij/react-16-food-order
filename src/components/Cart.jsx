import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Cart() {
    const { items, onUpdateCartItemQuantity } = useContext(CartContext);
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div className="cart">
            <h2>Your cart</h2>
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
                <ul>
                    {items.map((item) => {
                        return (
                            <li key={item.id} className="cart-item">
                                <div>
                                    <span>{item.name} - </span>
                                    <span>{item.quantity} x </span>
                                    <span>${item.price}</span>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => onUpdateCartItemQuantity(item.id, -1)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onUpdateCartItemQuantity(item.id, 1)}>
                                        +
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            <p className="cart-total">
                <strong>{formattedTotalPrice}</strong>
            </p>
            <div className="modal-actions">
                <form method="dialog" className="modal-actions">
                    <button className="text-button">Close</button>
                </form>
                {items.length > 0 && <button className="button">Go to checkout</button>}
            </div>
        </div>
    )
}