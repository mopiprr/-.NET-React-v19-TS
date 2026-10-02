import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import type { SubmitEvent } from "react";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value :"";
}

const inputClass =
  "my-3.75 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none disabled:bg-[#999]";
const buttonClass =
  "inline-block cursor-pointer rounded-[5px] border border-primary bg-transparent px-3.75 py-1.25 font-pacifico text-[20px] text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-border disabled:opacity-50";

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3 className="m-[50px] text-center font-pacifico text-[30px] font-normal text-secondary">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={mutation.mutate}
        >
          <input className={inputClass} name="name" placeholder="Name" />
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className="my-3.75 min-h-[200px] w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none"
            placeholder="Message"
            name="message"
          ></textarea>
          <button className={buttonClass}>Submit</button>
        </form>
      )}
    </div>
  );
}