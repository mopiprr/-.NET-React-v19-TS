import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PizzaSize } from "./APIResponseTypes";

interface OrderState {
    pizzaType: string;
    pizzaSize: PizzaSize;
}

const initialState: OrderState = {
    pizzaType: "pepperoni",
    pizzaSize: "M",
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPizzaType(state, action: PayloadAction<string>) {
            state.PizzaType = action.payload;
        },
        setPizzaSize(state, action: PayloadAction<PizzaSize>) {
            state.PizzaSize = action.payload;
        },
    },
    selectors: {
        selectPizzaType: (PizzaType) => order.PizzaType,
        selectPizzaSize: (PizzaSize) => order.PizzaSize,
    },
});

export const { setPizzaType, setPizzaSize } = orderSlice.actions;
export const { selectPizzaType, selectPizzaSize } = orderSlice.selectors;