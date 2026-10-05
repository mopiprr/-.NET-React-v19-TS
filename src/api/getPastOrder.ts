// import type { PastOrderDetail } from "../APIResponseTypes";

// // Implementasi JS
// // export default async function getPastOrder(order) {
// //   const response = await fetch(`/api/past-order/${order}`);
// //   const data = await response.json();
// //   return data;
// // }

// // Implementasai TS
// export default async function getPastOrder(
//   order: number,
// ): Promise<PastOrderDetail> {
//   const response = await fetch(`/api/past-order/${order}`);
//   const data = (await response.json()) as PastOrderDetail;
//   return data;
// }