import {
    REMOVE_ITEM,
    INCREASE_ITEM,
    DECREASE_ITEM,
    CLEAR_ITEMS,
    GET_TOTAL,
    LOADING,
    DISPLAY_ITEMS,
    TOGGLE_AMOUNT,
} from "./action";

const reducer = (state, action) => {
    if (action.type === CLEAR_ITEMS) {
        return { ...state, cart: [] };
    }

    if (action.type === REMOVE_ITEM) {
        return {
            ...state,
            cart: state.cart.filter((cart) => cart.id !== action.payload.id),
        };
    }

    if (action.type === INCREASE_ITEM) {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id) {
                return { ...cartItem, amount: cartItem.amount++ };
            }
            return cartItem;
        });
        return { ...state, cart: tempCart };
    }

    if (action.type === DECREASE_ITEM) {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    return { ...cartItem, amount: cartItem.amount-- };
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0);
        return { ...state, cart: tempCart };
    }

    if (action.type === LOADING) {
        return { ...state, loading: true };
    }

    if (action.type === DISPLAY_ITEMS) {
        return { ...state, cart: action.payload, loading: false };
    }

    if (action.type === GET_TOTAL) {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal;
                cartTotal.amount += amount;
                return cartTotal;
            },
            {
                total: 0,
                amount: 0,
            }
        );
        total = parseFloat(total.toFixed(2));
        return { ...state, total, amount };
    }

    if (action.type === TOGGLE_AMOUNT) {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === "inc") {
                        return { ...cartItem, amount: cartItem.amount++ };
                    }

                    if (action.payload.type === "dec") {
                        return { ...cartItem, amount: cartItem.amount-- };
                    }
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0);
        return { ...state, cart: tempCart };
    }

    throw new Error(`Thers is no '${action.type}' - action type`);
};

export default reducer;
