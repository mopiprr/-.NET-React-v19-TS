import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

afterEach(cleanup);

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("menampilkan judul halaman Contact", () => {
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const heading = screen.getByRole("heading", { level: 2 });
  expect(heading.innerText).toBe("Contact");
});

test("menampilkan tombol Submit pada formulir", () => {
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const btn = screen.getByRole("button");
  expect(btn.innerText).toBe("Submit");
});
