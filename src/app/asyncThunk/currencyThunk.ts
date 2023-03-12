import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICurrency } from "../../types/ICurrency";

export const fetchCurrency = createAsyncThunk(
    'currency/get',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<ICurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            return response.data
        } catch(e) {
            thunkApi.rejectWithValue('Failed to load currency')
        }
    }
)