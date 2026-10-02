import {useContext} from "react";
import {CartContext} from "./Contexts.js";
import { Link } from "@tanstack/react-router";
import { useAppSelector } from "./hooks.js";
import { selectCartCount } from "./cartSlice"

export default function Header() {

    const [cart] = useContext(CartContext);
    const cartCount = useAppSelector(selectCartCount);

  return (
    <nav className="w-full grid grid-cols-5 border-b border-border">
      <Link to={"/"} className="col-start-2 col-span-3 flex items-center justify-center">
        <img
          src="/public/padre_gino.svg"
          alt="Padre Gino's Pizza"
          className="h-[110px] border-b border-border py-5"
        />
      </Link>
      <div className="col-start-5 flex items-center justify-center text-[40px]">
        🛒<span className="bg-secondary text-white flex items-center justify-center relative -top-[17px] -left-[17px] w-5 h-5 text-[18px] rounded-full" data-testid="cart-number">{cartCount}</span>
      </div>
    </nav>
  );
}