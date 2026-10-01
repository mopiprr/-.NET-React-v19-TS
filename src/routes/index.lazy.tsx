import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    return(
        // index
        <div className="text-primary font-normal grid grid-cols-[1fr_1fr] gap-[30px] my-[120px] mx-auto max-w-[700px]">
            {/* index-brand */}
            <div className="flex flex-col">
                <h1 className="text-primary font-normal font-pacifico">Padre Gino's</h1>
                <p className="text-secondary font-bold text-[40px] uppercase max-w-[315px]">Pizza & Art at a location near you</p>
            </div>
            <ul className="flex flex-col items-center justify-center">
                <li>
                <Link to="/order" className="w-full max-w-[250px] text-center mb-[10px]">Order</Link>
                </li>
                <li>
                <Link to="/past" className="w-full max-w-[250px] text-center mb-[10px]">Past Orders</Link>
                </li>
                <li>
                <Link to="/contact" className="w-full max-w-[250px] text-center mb-[10px]">Contact</Link>
                </li>
            </ul>
        </div>
    )
}