import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { buttonClass } from "../Cart";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const menuLinkClass = `${buttonClass} mb-[10px] w-full max-w-[250px] text-center`;

function Index() {
  return (
    <div className="mx-auto my-[120px] grid max-w-[700px] grid-cols-1 gap-[30px] sm:grid-cols-2">
      <div className="flex flex-col">
        <h1 className="font-pacifico text-[40px] font-normal text-primary">Padre Gino's</h1>
        <p className="max-w-[315px] text-[40px] font-bold uppercase text-secondary">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center">
        <li className="w-full max-w-[250px] text-center">
          <Link to="/order" className={menuLinkClass}>
            Order
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link to="/past" className={menuLinkClass}>
            Past Orders
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link to="/contact" className={menuLinkClass}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}