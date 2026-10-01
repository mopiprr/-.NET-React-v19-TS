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

const buttonClass = "inline-block cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 font-pacifico text-[20px] text-primary disabled:bg-[#ccc] disabled:opacity-50"; 
const trClass = "border-b border-[#ddd] even:bg-[f6fef0] last:border-b-2 last:border-secondary"
const tdClass ="py-3 px-[15px] text-center";

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
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if(!data) {
    throw new Error("Past Order Could not be loaded");
  }
//   throw new Error("lol");
  return (
    //past-orders
    <div className="min-h-[650px] min-w-[900px] w-[90%] mx-auto">
      <table className="w-full my-[25px] mx-0 font-sans min-w-[400px] border-b border-[#ddd] border-collapse text-[0.9em]">
        <thead>
          <tr className="bg-secondary text-white text-left">
            <td className={tdClass}>ID</td>
            <td className={tdClass}>Date</td>
            <td className={tdClass}>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr className={trClass}
            key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                    {order.order_id}
                </button>
                </td>
                <td className={tdClass}>{order.date}</td>
                <td className={tdClass}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pages */}
      <div className="flex items-center justify-evenly">
        <button className={buttonClass}
        disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button className={buttonClass}
        disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
        {focusedOrder ? (
            <Modal>
            <h2>Order #{focusedOrder}</h2>
            {!isLoadingPastOrder && pastOrderData ? (
                <table className="w-full my-[25px] mx-0 font-sans min-w-[400px] border-b border-[#ddd] border-collapse text-[0.9em]">
                <thead>
                    <tr className={trClass}>
                      <td className={tdClass}>Image</td>
                      <td className={tdClass}>Name</td>
                      <td className={tdClass}>Size</td>
                      <td className={tdClass}>Quantity</td>
                      <td className={tdClass}>Price</td>
                      <td className={tdClass}>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {pastOrderData.orderItems.map((pizza) => (
                    <tr className={trClass}
                    key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                        <td className={tdClass}>
                        <img src={pizza.image} alt={pizza.name} />
                        </td>
                        <td className={tdClass}>{pizza.name}</td>
                        <td className={tdClass}>{pizza.size}</td>
                        <td className={tdClass}>{pizza.quantity}</td>
                        <td className={tdClass}>{intl.format(pizza.price)}</td>
                        <td className={tdClass}>{intl.format(pizza.total)}</td>
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