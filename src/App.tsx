// destructuring, dari import React menjadi komponen yang digunakan saja.
// import React from "react";
import {createRoot} from "react-dom/client"
import { StrictMode, useState } from "react";;
// import Pizza from "./Pizza.jsx";
// import Order from "./Order.jsx";
// import PizzaOfTheDay from "./PizzaOfTheDay";
// import Header from "./Header";
// import { CartContext } from "./Contexts.jsx";
// import { Outlet } from "@tanstack/react-router";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

// const App = () => {
//   const cartHook = useState([]);
//   return (
//     <StrictMode>
//       <CartContext.Provider value={cartHook}>
//         <div>
//           {/* <h1>Padre Gino's Pizza – Order Now</h1> */}
//           <Header />
//           {/* <Pizza 
//             name="Pepperoni" 
//             description="Mozzarella Cheese, Pepperoni" 
//             image={"/public/pizzas/pepperoni.webp"}
//           />
//           <Pizza
//             name="The Hawaiian Pizza"
//             description="Sliced Ham, Pineapple, Mozzarella Cheese"
//             image={"/public/pizzas/hawaiian.webp"}
//           />
//           <Pizza
//             name="The Big Meat Pizza"
//             description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
//             image={"/public/pizzas/big_meat.webp"}
//           /> */}
//           <Order />
//           <PizzaOfTheDay />
//         </div>
//       </CartContext.Provider>
//     </StrictMode>
//   );
// }
// Karena sudah ditaruh dalam route semua, maka seluruh App dapat disederhanakan. Termasuk import librarynya disederhanakan agar semakin ringan

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
if(!container) {
  throw new Error("No container to render to");
}
const root = createRoot(container);
root.render(<App />);
