// Jika tidak ada elemt HTML / React yg dipanggil, sebaiknya gunakan .js saja daripda .jsx

import type { PastOrder } from "../APIResponseTypes";

// contoh implementasi di JS
// export default async function getPastOrders(page) {
//   const response = await fetch(`/api/past-orders?page=${page}`);
//   const data = await response.json();
//   return data;
// }

// implementasi di TS
export default async function getPastOrders(
  page: number,
): Promise<PastOrder[]> {
  const response = await fetch(`/api/past-orders?page=${page}`);
  const data = (await response.json()) as PastOrder[];
  return data;
}