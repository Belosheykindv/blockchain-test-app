
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { blockChainAPI } from "../api/apiRequest.js"
import { useDispatch } from "react-redux"

let initialState = {
    adress: '',
    transactions: []
}
const blockChainSliceReducer = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {
        getAllTransactions: (state, action) => {
            state.transactions = action.payload
        },
        getAccountName: (state, action) => {
            state.adress = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTransactionsThunk.fulfilled, (state, action) => {
            state.transactions.push(action.payload)

        })
    }
})

export const getTransactionsThunk = createAsyncThunk(
    'getTransactions',
    async (adress) => {
        const response = await blockChainAPI.getTransactions(adress)
        console.log('response - ', response)
        return response
    },
)



export const { getAllTransactions, getAccountName } = blockChainSliceReducer.actions
export default blockChainSliceReducer.reducer