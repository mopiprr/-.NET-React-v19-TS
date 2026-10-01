import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    return(
        // index
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] max-w-[700px] my-[120px] mx-auto">
            {/* index-brand */}
            <div className="flex flex-col">
                <h1 className="text-[var(--primary)] font-[var(--primary)] font-normal">Padre Gino's</h1>
                <p className="text-[var(--sercondary)] font-bold text-[40px] uppercase max-w-[315px]">Pizza & Art at a location near you</p>
            </div>
            <ul className="flex flex-col items-center justify-center">
                <li className="w-full max-w-[250px] text-center">
                <Link to="/order" className="block w-full max-w-[250px] text-center mb-[10px]">Order</Link>
                </li>
                <li>
                <Link to="/past" className="block w-full max-w-[250px] text-center mb-[10px]">Past Orders</Link>
                </li>
                <li>
                <Link to="/contact" className="block w-full max-w-[250px] text-center mb-[10px]">Contact</Link>
                </li>
            </ul>
        </div>
    )
}
