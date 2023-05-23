import { getProductById } from "./Menu.js";

export async function addToCart(id) {
    const product = await getProductById(id);
    const results = app.store.cart.filter((prodInCart) => {
        return prodInCart.product.id === id;
    });

    if (results.length === 1) {
        // Product already in the cart
        app.store.cart = app.store.cart.map((p) =>
            p.product.id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
    } else {
        // Changing cart so make sure to trigger the event
        // Returning new array will trigger the set
        app.store.cart = [...app.store.cart, { product, quantity: 1 }];
    }
}

export function removeFromCart(id) {
    app.store.cart = app.store.cart.filter((p) => p.product.id !== id);
}
