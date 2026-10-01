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
        <h3 className="text-center m-[50px] font-normal text-[30px]">Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate} className="flex flex-col items-center justify-center">
          <input className="w-[500px] p-2 border-2 border-[var(--border)] rounded-[5px] my-[15px] focus:border-[var(--primary)] disabled:bg-[#999] outline-none" name="name" placeholder="Name" />
          <input className="w-[500px] p-2 border-2 border-[var(--border)] rounded-[5px] my-[15px] focus:border-[var(--primary)] disabled:bg-[#999] outline-none" type="email" name="email" placeholder="Email" />
          <textarea className="w-[500px] min-h-[200px] p-2 border-2 border-[var(--border)] rounded-[5px] focus:border-[var(--primary)]" name="message"></textarea>
          <button className="btn">Submit</button>
        </form>
      )}
    </div>
  );
}