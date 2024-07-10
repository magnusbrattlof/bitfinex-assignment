import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

export interface OrderBookEntry {
  id: number
  price: number
  count: number
  amount: number
}

export interface OrderBookState {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

const initialState: OrderBookState = {
  bids: [],
  asks: [],
}

export const orderBookSlice = createAppSlice({
  name: "order-book",
  initialState,
  reducers: create => ({
    addOrderBookSnapshot: create.reducer(
      (state, action: PayloadAction<[number, [number, number, number][]]>) => {
        const snapshot = action.payload[1]
        state.bids = snapshot
          .filter(entry => entry[2] > 0)
          .map(([price, count, amount], id) => ({ id, price, count, amount }))

        state.asks = snapshot
          .filter(entry => entry[2] < 0)
          .map(([price, count, amount], id) => ({ id, price, count, amount }))
      },
    ),
    updateOrAddBid: create.reducer(
      (state, action: PayloadAction<[number, [number, number, number]]>) => {
        const [id, [price, count, amount]] = action.payload
        const newEntry = { id, price, count, amount }
        const existingEntry = state.bids.find(entry => entry.id === id)
        if (existingEntry) {
          existingEntry.price = price
          existingEntry.count = count
          existingEntry.amount = amount
        } else {
          state.bids.push(newEntry)
        }
      },
    ),
    updateOrAddAsk: create.reducer(
      (state, action: PayloadAction<[number, [number, number, number]]>) => {
        const [id, [price, count, amount]] = action.payload
        const newEntry = { id, price, count, amount }
        const existingEntry = state.asks.find(entry => entry.id === id)
        if (existingEntry) {
          existingEntry.price = price
          existingEntry.count = count
          existingEntry.amount = amount
        } else {
          state.asks.push(newEntry)
        }
      },
    ),
    removeAsk: create.reducer((state, action: PayloadAction<number>) => {
      state.asks = state.asks.filter(entry => entry.price !== action.payload)
    }),
    removeBid: create.reducer((state, action: PayloadAction<number>) => {
      state.bids = state.bids.filter(entry => entry.price !== action.payload)
    }),
  }),
  selectors: {
    selectAsks: orderBook => orderBook.asks,
    selectBids: orderBook => orderBook.bids,
  },
})

export const {
  addOrderBookSnapshot,
  updateOrAddAsk,
  updateOrAddBid,
  removeAsk,
  removeBid,
} = orderBookSlice.actions

export const { selectAsks, selectBids } = orderBookSlice.selectors
