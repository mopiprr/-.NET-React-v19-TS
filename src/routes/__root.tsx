import { useState } from "react";
// Di React, jika import dari library sebaiknya di prirotaskan, jadi taruh diatas
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Karena import dari folder / file local, jadi prioritasnya dibawah import library.
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartContext, type CartItem } from "../Contexts";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState<CartItem[]>([]);
    return (
        // React.fragment (<>  </>). Digunakan karena CartContext.Provider dan TanStackRouterDevtools berada pada level yg sama. Sehingga menggunakan fragment
        // Semacam div khusus untuk react.
        // <Outlet /> digunakan untuk menampilkan komponen yang sesuai dengan route yang diakses. Misal jika user mengakses /order maka komponen Order akan ditampilkan, jika user mengakses /pizza-of-the-day maka komponen PizzaOfTheDay akan 
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        {/* <ReactQueryDevtools /> */}
      </>
    );
  },
});