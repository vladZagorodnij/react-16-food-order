import {createContext, useReducer} from "react";
import {fetchMeals} from "../http.js";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    onUpdateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = action.payload.product;
            updatedItems.push({
                id: action.payload.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
    }

    if (action.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    )

    async function handleAddItemToCart(id) {
        const availableProducts = await fetchMeals();
        const product = availableProducts.find((product) => product.id === id);

        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: { id, product },
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: {
                productId,
                amount
            },
        })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
    }

    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
};