import Pizza from "../Pizza.jsx";
import type { Pizza as PizzaType, PizzaSize } from "../APIResponseTypes.js"
import {useState, useEffect, useContext} from "react";
import Cart from "../Cart.jsx";
// import { CartContext } from "../Contexts.js";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../hooks.js";
import { addToCart, clearCart, selectCartCount, selectCartItems } from "../cartSlice.js";
import { selectPizzaSize, selectPizzaType, setPizzaSize, setPizzaType } from "../orderSlice.js";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

// shared by the three size radios: the label is the visible "card", the input is visually hidden
const sizeLabelClass =
  "mx-3.75 mb-2.5 inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-[5px] border border-[#999] bg-border text-[#999] peer-checked:bg-white peer-checked:text-[#333] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary";

function Order() {
  // const [pizzaType, setPizzaType] = useState("pepperoni");
  // const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");
  const [pizzaTypes, setPizzaTypes] = useState<PizzaType[]>([]);
  const [loading, setLoading] = useState(true);
  // const [cart, setCart] = useContext(CartContext);

  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const pizzaType = useAppSelector(selectPizzaType);
  const pizzaSize = useAppSelector(selectPizzaSize);

  let price: string | undefined;
  let selectedPizza: PizzaType | undefined;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = selectedPizza ? intl.format(selectedPizza.sizes[pizzaSize]) : undefined;  
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

 
  async function fetchPizzaTypes() {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzasRes.json() as PizzaType[];
    setPizzaTypes(pizzasJson);
    setLoading(false);
    }

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        cart,
        }),
    });

  // setCart([]);
  dispatch(clearCart());
  setLoading(false);
  }

  return (
    <div className="w-full ml-[5%]">
      <h2>Create Order</h2>
      <form className="flex justify-between"
        onSubmit={(e) => {
            e.preventDefault();
            if (!selectedPizza || !price) {
              return;
            }
            // setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
            dispatch(addToCart({ pizza: selectedPizza, size: pizzaSize, price }));
        }}
        >
        <div className="my-2.5 w-full border-r border-border p-3.75 text-center">
          <div className="my-2.5 text-center">
            <label htmlFor="pizza-type" className="mb-2.5 block text-[20px] text-secondary">Pizza Type</label>
            <select className="form-select mb-7.5 block w-full py-1.25 pl-1.25 text-[16px]" name="pizza-type" value={pizzaType} onChange={(e) => dispatch(setPizzaType(e.target.value))}>
              { pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))};
               
            </select>
          </div>
          <div className="my-2.5 text-center">
            <label htmlFor="pizza-size" className="mb-2.5 block text-[20px] text-secondary">Pizza Size</label>
            <div className="my-2.5 text-center">
              <span>
                <input
                  className="peer hidden"
                  onChange={(e) => dispatch(setPizzaSize(e.target.value as PizzaSize))}
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s" className={sizeLabelClass}>Small</label>
              </span>
              <span>
                <input
                  className="peer hidden"
                  onChange={(e) => dispatch(setPizzaSize(e.target.value as PizzaSize))}
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m" className={sizeLabelClass}>Medium</label>
              </span>
              <span>
                <input
                  className="peer hidden"
                  onChange={(e) => dispatch(setPizzaSize(e.target.value as PizzaSize))}
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l" className={sizeLabelClass}>Large</label>
              </span>
            </div>
          </div>
          <button type="submit" className="inline-block cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-border disabled:opacity-50">Add to Cart</button>
        </div>
        {loading || !selectedPizza ? (
            <h3> loading.....</h3>
        ) : (
            <div className="my-2.5 ml-6.25 w-full p-3.75 text-center">
          <Pizza
            name={selectedPizza.name}
            description={selectedPizza.description}
            image={selectedPizza.image}
          />
          <p>{price}</p>
        </div>
        )}
      </form>
      {
        loading ? <h2>LOADING …</h2> : <Cart cart={cart} checkout={checkout} />
        }
    </div>
  );
}