import { configureStore } from '@reduxjs/toolkit'
import blockChainSliceReducer from './blockChainReducer'
export const store = configureStore({
    reducer: {
        blockChain: blockChainSliceReducer,
    },
})

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch