import { Provider } from "react-redux"
import { OrderBookTable } from "./components/table"
import { store } from "./redux/store"
import { useSocket } from "./hooks/use-socket"

const App = () => {
  useSocket()
  return (
    <Provider store={store}>
      <OrderBookTable />
    </Provider>
  )
}

export default App
