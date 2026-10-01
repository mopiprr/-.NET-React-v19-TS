import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

const linkClass = "inline-block w-full max-w-[250px] mb-2.5 py-1.25 px-3.75 text-center rounded-[5px] border border-primary bg-transparent font-pacifico text-[20px] text-primary hover:bg-primary/10";

function Index() {
    return(
        // index
        <div className="text-primary font-normal grid grid-cols-1 sm:grid-cols-2 gap-[30px] my-[120px] mx-auto max-w-[700px]">
            {/* index-brand */}
            <div className="flex flex-col">
                <h1 className="text-primary font-normal font-pacifico">Padre Gino's</h1>
                <p className="text-secondary font-bold text-[40px] uppercase max-w-[315px]">Pizza & Art at a location near you</p>
            </div>
            <ul className="flex flex-col items-center justify-center">
                <li>
                <Link to="/order" className={linkClass}>Order</Link>
                </li>
                <li>
                <Link to="/past" className={linkClass}>Past Orders</Link>
                </li>
                <li>
                <Link to="/contact" className={linkClass}>Contact</Link>
                </li>
            </ul>
        </div>
    )
}