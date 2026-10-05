import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
// import getPastOrders from "../api/getPastOrders";
// import getPastOrder from "../api/getPastOrder";
import { skipToken } from "@reduxjs/toolkit/query";

import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";
import type { PastOrder, PastOrderDetail } from "../APIResponseTypes";
import { useGetPastOrderQuery, useGetPastOrdersQuery } from "../api/pizzaApi";

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

import { buttonClass } from "../Cart";

const tableClass =
  "my-6.25 w-full sm:min-w-[400px] border-collapse border border-[#dddddd] font-sans text-[0.9em]";
const theadTrClass = "bg-secondary text-left text-white";
const tbodyTrClass =
  "border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary";
const tdClass = "px-3.75 py-3 text-center";

// isLoading vs isPending. isLoading digunakan untuk GET, isPending digunakan untuk POST
function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState<number>();

  const { data: pastOrderData, isLoading: isLoadingPastOrder } = useGetPastOrderQuery(
  focusedOrder ?? skipToken,
  );

  // const { isLoading: isLoadingPastOrder, data: pastOrderData } =
  //   useQuery<PastOrderDetail>({
  //     queryKey: ["past-order", focusedOrder],
  //     queryFn: focusedOrder ? () => getPastOrder(focusedOrder) : skipToken,
  //     enabled: !!focusedOrder,
  //     staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  //   });
  
  const { isLoading, data } = useGetPastOrdersQuery(page);
  // const { isLoading, data } = useQuery({
  //   queryKey: ["past-orders", page],
  //   queryFn: () => getPastOrders(page),
  //   staleTime: 30000,
  // });

  if (isLoading) {
    return (
      <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (!data) {
    throw new Error("Past Order Could not be loaded");
  }

  return (
    <div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
      <table className={tableClass}>
        <thead>
          <tr className={theadTrClass}>
            <td className={tdClass}>ID</td>
            <td className={tdClass}>Date</td>
            <td className={tdClass}>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id} className={tbodyTrClass}>
              <td className={tdClass}>
                <button
                  className={buttonClass}
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  {order.order_id}
                </button>
              </td>
              <td className={tdClass}>{order.date}</td>
              <td className={tdClass}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button
          className={buttonClass}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <div className="font-pacifico text-[20px] text-primary">{page}</div>
        <button
          className={buttonClass}
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder && pastOrderData ? (
            <table className={tableClass}>
              <thead>
                <tr className={theadTrClass}>
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
                  <tr
                    key={`${pizza.pizzaTypeId}_${pizza.size}`}
                    className={tbodyTrClass}
                  >
                    <td className={tdClass}>
                      <img
                        className="mx-auto w-[50px]"
                        src={pizza.image}
                        alt={pizza.name}
                      />
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
          <button
            className={buttonClass}
            onClick={() => setFocusedOrder(undefined)}
          >
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}