import { useSelector } from "react-redux"
import { selectAsks, selectBids } from "../redux/order-book.slice"

export const OrderBookTable = () => {
  const asks = useSelector(selectAsks)
  const bids = useSelector(selectBids)

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Orderbook
                </h1>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="flex">
                    <div className="w-1/2 pr-2 flex flex-col gap-8">
                      <h1 className="text-emerald-100 uppercase font-semibold text-2xl text-center">
                        asks
                      </h1>
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                            >
                              COUNT
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              AMOUNT
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              TOTAL
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              PRICE
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {asks.map(({ amount, count, id, price }) => (
                            <tr key={`${id}-${amount}-${count}-${price}`}>
                              <td className="whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                {count}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {Math.abs(amount)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {Math.abs(amount)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="w-1/2 pr-2 flex flex-col gap-8">
                      <h1 className="text-amber-100 uppercase font-semibold text-2xl text-center">
                        bids
                      </h1>
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                            >
                              PRICE
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              TOTAL
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              AMOUNT
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                            >
                              COUNT
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {bids.map(({ amount, count, id, price }) => (
                            <tr key={`${id}-${amount}-${count}-${price}`}>
                              <td className="whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                {price}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {Math.abs(amount)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {Math.abs(amount)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-1.5 text-sm text-gray-300">
                                {count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
