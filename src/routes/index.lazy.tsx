import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
  return (
    <div className="mx-auto my-[120px] grid max-w-[700px] grid-cols-2 gap-[30px]">
      <div className="flex flex-col">
        <h1 className="font-pacifico text-[40px] font-normal text-primary">Padre Gino's</h1>
        <p className="max-w-[315px] text-[40px] font-bold uppercase text-secondary">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center">
        <li className="w-full max-w-[250px] text-center">
          <Link
            to="/order"
            className="mb-2.5 inline-block w-full max-w-[250px] cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 text-center font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Order
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link
            to="/past"
            className="mb-2.5 inline-block w-full max-w-[250px] cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 text-center font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Past Orders
          </Link>
        </li>
        <li className="w-full max-w-[250px] text-center">
          <Link
            to="/contact"
            className="mb-2.5 inline-block w-full max-w-[250px] cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 text-center font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}