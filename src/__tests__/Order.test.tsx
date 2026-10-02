import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Route } from "../routes/order.lazy";
import { CartContext } from "../Contexts";

afterEach(cleanup);

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const mockPizzas = [
  {
    id: "pepperoni",
    name: "The Pepperoni Pizza",
    image: "/public/pizzas/pepperoni.webp",
    sizes: { S: 9.75, M: 12.5, L: 15.25 },
  },
];

test("menampilkan judul halaman Create Order", () => {
  fetchMocker.mockResponse(JSON.stringify(mockPizzas));
  const Component = Route.options.component!;
  const screen = render(
    <CartContext.Provider value={[[], () => {}]}>
      <Component />
    </CartContext.Provider>
  );

  const heading = screen.getByRole("heading", { name: "Create Order" });
  expect(heading.innerText).toBe("Create Order");
});

test("menampilkan pizza dan harga setelah data diambil", async () => {
  fetchMocker.mockResponse(JSON.stringify(mockPizzas));
  const Component = Route.options.component!;

  const screen = render(
    <CartContext.Provider value={[[], () => {}]}>
      <Component />
    </CartContext.Provider>
  );

  const title = await screen.findByRole("heading", { level: 1 }, { timeout: 4000 });
  expect(title.innerText).toBe("The Pepperoni Pizza");

  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img.src).toContain("/public/pizzas/pepperoni.webp");
  expect(img.alt).toBe("The Pepperoni Pizza");

  const price = screen.getByText("$12.50");
  expect(price.innerText).toBe("$12.50");
}, 6000);