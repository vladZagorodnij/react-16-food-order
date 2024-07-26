import Error from "./components/Error.jsx";

export async function fetchMeals() {
    const response = await fetch("http://localhost:3000/meals");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch places`);
    }

    return resData;
}

export async function updateOrder(items) {
    const response = await fetch("http://localhost:3000/orders",
        {
            method: 'PUT',
            body: JSON.stringify({items}),
            headers: {
                'Content-Type': 'application/json',
            }
        })

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to update places`);
    }

    return resData.message;
}