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

const buttonClass =
  "inline-block cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-border disabled:opacity-50";

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
      <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if(!data) {
    throw new Error("Past Order Could not be loaded");
  }
//   throw new Error("lol");
  return (
    <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
      <table className="my-6.25 w-full min-w-[400px] border-collapse border border-[#dddddd] font-sans text-[0.9em]">
        <thead>
          <tr className="bg-secondary text-left text-white">
            <td className="px-3.75 py-3 text-center">ID</td>
            <td className="px-3.75 py-3 text-center">Date</td>
            <td className="px-3.75 py-3 text-center">Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id} className="border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary">
              <td className="px-3.75 py-3 text-center">
                <button className={buttonClass} onClick={() => setFocusedOrder(order.order_id)}>
                    {order.order_id}
                </button>
                </td>
                <td className="px-3.75 py-3 text-center">{order.date}</td>
                <td className="px-3.75 py-3 text-center">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button className={buttonClass} disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div className="font-pacifico text-[20px] text-primary">{page}</div>
        <button className={buttonClass} disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
        {focusedOrder ? (
            <Modal>
            <h2>Order #{focusedOrder}</h2>
            {!isLoadingPastOrder && pastOrderData ? (
                <table className="my-6.25 w-full min-w-[400px] border-collapse border border-[#dddddd] font-sans text-[0.9em]">
                <thead>
                    <tr className="bg-secondary text-left text-white">
                    <td className="px-3.75 py-3 text-center">Image</td>
                    <td className="px-3.75 py-3 text-center">Name</td>
                    <td className="px-3.75 py-3 text-center">Size</td>
                    <td className="px-3.75 py-3 text-center">Quantity</td>
                    <td className="px-3.75 py-3 text-center">Price</td>
                    <td className="px-3.75 py-3 text-center">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {pastOrderData.orderItems.map((pizza) => (
                    <tr key={`${pizza.pizzaTypeId}_${pizza.size}`} className="border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary">
                        <td className="px-3.75 py-3 text-center">
                        <img className="w-[50px] mx-auto" src={pizza.image} alt={pizza.name} />
                        </td>
                        <td className="px-3.75 py-3 text-center">{pizza.name}</td>
                        <td className="px-3.75 py-3 text-center">{pizza.size}</td>
                        <td className="px-3.75 py-3 text-center">{pizza.quantity}</td>
                        <td className="px-3.75 py-3 text-center">{intl.format(pizza.price)}</td>
                        <td className="px-3.75 py-3 text-center">{intl.format(pizza.total)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p>Loading …</p>
            )}
            <button className={buttonClass} onClick={() => setFocusedOrder(undefined)}>Close</button>
            </Modal>
        ) : null
        }
    </div>
  );
}