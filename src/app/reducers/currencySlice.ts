import { createSlice } from "@reduxjs/toolkit";
import { ICurrency } from "../../types/ICurrency";
import { fetchCurrency } from "../asyncThunk/currencyThunk";

interface InitialStateCurrency {
    currency: ICurrency[];
    isLoading: boolean;
    error: string;
}

const initialState: InitialStateCurrency = {
    currency: [],
    isLoading: false,
    error: ''
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: builder => 
        builder
            .addCase(fetchCurrency.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.isLoading = false
                state.currency = [
                    {r030: 1, cc: 'UAH', exchangedate: '13.03.2023', rate: 1, txt: 'Українська гривня'}, 
                    ...action.payload as ICurrency[]
                ]
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
})

export default currencySlice.reducer;