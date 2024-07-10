import { createAppSlice } from "./createAppSlice"

export interface SocketConnection {
  connected: boolean
}

const initialState: SocketConnection = {
  connected: false,
}

export const socketSlice = createAppSlice({
  name: "socket",
  initialState,
  reducers: create => ({
    connect: create.reducer(state => {
      state.connected = true
    }),
    disconnect: create.reducer(state => {
      state.connected = false
    }),
  }),
})

export const { connect, disconnect } = socketSlice.actions
