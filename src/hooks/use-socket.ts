import { useEffect } from "react"
import {
  addOrderBookSnapshot,
  removeAsk,
  removeBid,
  updateOrAddAsk,
  updateOrAddBid,
} from "../redux/order-book.slice"
import { useAppDispatch } from "../redux/hooks"

const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2")

export const useSocket = () => {
  const dispatch = useAppDispatch()

  /**
   * Algorithm to create and keep a trading book instance updated
   * 1. subscribe to channel
   * 2. receive the book snapshot and create your in-memory book structure
   * 3. when count > 0 then you have to add or update the price level
   *  3.1 if amount > 0 then add/update bids
   *  3.2 if amount < 0 then add/update asks
   * 4. when count = 0 then you have to delete the price level.
   *  4.1 if amount = 1 then remove from bids
   *  4.2 if amount = -1 then remove from asks
   */

  useEffect(() => {
    socket.addEventListener("message", event => {
      const parsedEvent = JSON.parse(event.data)

      // check if the parsed event is an array like [1, [1, 2, 3]] or [0, [1, 2, 3], [1, 2, 3]]
      if (Array.isArray(parsedEvent) && Array.isArray(parsedEvent[1][0])) {
        dispatch(addOrderBookSnapshot(parsedEvent))
      }

      if (Array.isArray(parsedEvent)) {
        const [price, count, amount] = parsedEvent[1] as [
          number,
          number,
          number,
        ]
        if (count > 0) {
          if (amount > 0) {
            dispatch(updateOrAddBid([price, [price, count, amount]]))
          }
          if (amount < 0) {
            dispatch(updateOrAddAsk([price, [price, count, amount]]))
          }
        }

        if (count === 0) {
          if (amount === 1) {
            dispatch(removeBid(price))
          }
          if (amount === -1) {
            dispatch(removeAsk(price))
          }
        }
      }
    })

    const msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    })

    socket.addEventListener("open", event => {
      socket.send(msg)
    })

    // if lost connection to the server, try to reconnect
    socket.addEventListener("close", () => {
      console.log("socket closed, trying to reconnect")
      socket.send(msg)
    })

    return () => {
      console.log("closing socket")
      socket.close()
    }
  }, [])
}
