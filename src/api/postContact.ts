// Implementasi JS
// export default async function postContact(name, email, message) {
//   const response = await fetch("/api/contact", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, message }),
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return response.json();
// }

// Implementasi TS
export default async function postContact(
  name: string,
  email: string,
  message: string
) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}