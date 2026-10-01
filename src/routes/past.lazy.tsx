import { useState } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";

import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";
import type { PastOrder, PastOrderDetail } from "../APIResponseTypes";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// isLoading vs isPending. isLoading digunakan untuk GET, isPending digunakan untuk POST
function PastOrdersRoute() {

    const [page, setPage] = useState(1);

    const [focusedOrder, setFocusedOrder] = useState<number>();

    const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery<PastOrderDetail>({
    queryKey: ["past-order", focusedOrder],
    queryFn: focusedOrder ? () => getPastOrder(focusedOrder) : skipToken,
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
    });

  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });
  if (isLoading) {
    return (
      // past-orders
      <div className="min-h-[650px] max-w-[900px] w-[90%] mx-auto">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if(!data) {
    throw new Error("Past Order Could not be loaded");
  }
//   throw new Error("lol");
  return (
    // past-orders
    <div className="min-h-[650px] max-w-[900px] w-[90%] mx-auto">
      <table className="w-full border-collapse my-[25px] text-[0.9em] font-sans min-w-[400px] border border[#ddd]">
        <thead>
          <tr className="bg-secondary text-white text-left">
            <td className="py-3 px-[15px] text-center">ID</td>
            <td className="py-3 px-[15px] text-center">Date</td>
            <td className="py-3 px-[15px] text-center">Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id} className="border-b border-[#ddd] even:bg-[f6fef0] last:border-b-2 last:border-secondary">
              <td className="py-3 px-[15px] text-center">
                <button onClick={() => setFocusedOrder(order.order_id)}>
                    {order.order_id}
                </button>
                </td>
                <td className="py-3 px-[15px] text-center">{order.date}</td>
                <td className="py-3 px-[15px] text-center">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pages */}
      <div className="flex justify-evenly items-center">
        <button className="btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div font-pacifico text-xl tesxt-primary>{page}</div>
        <button className="btn" disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
        {focusedOrder ? (
            <Modal>
            <h2>Order #{focusedOrder}</h2>
            {!isLoadingPastOrder && pastOrderData ? (
                <table className="w-full border-collapse my-[25px] text-[0.9em] font-sans min-w-[400px] border border[#ddd]">
                <thead>
                    <tr className="bg-secondary text-white text-left">
                      <td className="py-3 px-[15px] text-center">Image</td>
                      <td className="py-3 px-[15px] text-center">Name</td>
                      <td className="py-3 px-[15px] text-center">Size</td>
                      <td className="py-3 px-[15px] text-center">Quantity</td>
                      <td className="py-3 px-[15px] text-center">Price</td>
                      <td className="py-3 px-[15px] text-center">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {pastOrderData.orderItems.map((pizza) => (
                    <tr key={`${pizza.pizzaTypeId}_${pizza.size}`} className="border-b border-[#ddd] even:bg-[f6fef0] last:border-b-2 last:border-secondary">
                        <td>
                        <img className="w-[50px]" src={pizza.image} alt={pizza.name} />
                        </td>
                        <td className="py-3 px-[15px] text-center">{pizza.name}</td>
                        <td className="py-3 px-[15px] text-center">{pizza.size}</td>
                        <td className="py-3 px-[15px] text-center">{pizza.quantity}</td>
                        <td className="py-3 px-[15px] text-center">{intl.format(pizza.price)}</td>
                        <td className="py-3 px-[15px] text-center">{intl.format(pizza.total)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p>Loading …</p>
            )}
            <button onClick={() => setFocusedOrder(undefined)}>Close</button>
            </Modal>
        ) : null
        }
    </div>
  );
}