import React, { useContext, useReducer, useEffect, createContext } from "react";
import {
    CLEAR_ITEMS,
    DECREASE_ITEM,
    DISPLAY_ITEMS,
    GET_TOTAL,
    INCREASE_ITEM,
    LOADING,
    REMOVE_ITEM,
    TOGGLE_AMOUNT,
} from "./action";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const defaultState = {
    cart: [],
    total: 0,
    amount: 0,
    lodaing: false,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const clearItems = () => {
        dispatch({ type: CLEAR_ITEMS });
    };

    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } });
    };

    const increaseItem = (id) => {
        dispatch({ type: INCREASE_ITEM, payload: { id } });
    };

    const decreaseItem = (id) => {
        dispatch({ type: DECREASE_ITEM, payload: { id } });
    };

    const fetchData = async () => {
        dispatch({ type: LOADING });
        const resp = await fetch(url);
        const cart = await resp.json();
        dispatch({ type: DISPLAY_ITEMS, payload: cart });
    };

    const toggleAmount = (id, type) => {
        dispatch({ type: TOGGLE_AMOUNT, payload: { id, type } });
    };

    useEffect(() => {
        fetchData(url);
    }, []);

    useEffect(() => {
        dispatch({ type: GET_TOTAL });
    }, [state.cart]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                clearItems,
                removeItem,
                increaseItem,
                decreaseItem,
                toggleAmount,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
