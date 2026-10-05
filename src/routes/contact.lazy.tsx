import { createLazyFileRoute } from "@tanstack/react-router";
// import { useMutation } from "@tanstack/react-query";
// import postContact from "../api/postContact";
import type { SubmitEvent } from "react";

import { usePostContactMutation } from "../api/pizzaApi";

import { buttonClass } from "../Cart";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

const inputClass =
  "my-[15px] w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none disabled:bg-[#999]";

function ContactRoute() {
  const [postContact, { isSuccess, isLoading }] = usePostContactMutation();
  // const mutation = useMutation({
  //   mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     const formData = new FormData(e.target);
  //     return postContact(
  //       getString(formData, "name"),
  //       getString(formData, "email"),
  //       getString(formData, "message"),
  //     );
  //   },
  // });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    postContact({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      message: getString(formData, "message"),
    });
  }

  return (
    <div className="contact">
      <h2>Contact</h2>
      {isSuccess ? (
        <h3 className="m-[50px] text-center font-pacifico text-[30px] font-normal text-secondary">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input className={inputClass} name="name" placeholder="Name" />
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className={`${inputClass} min-h-[200px]`}
            placeholder="Message"
            name="message"
          ></textarea>
          <button className={buttonClass}>Submit</button>
        </form>
      )}
    </div>
  );
}