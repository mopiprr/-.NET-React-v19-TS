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
        <h3 className="text-center font-normal text-[30px] m-12.5 text-secondary font-pacifico">Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate} className="flex flex-col items-center justify-center">
          <input className="w-125 p-2 border-2 border-border mb-[15px] mt-[15px] rounder-[5px] my-[15px] focus:border-primary focus:outline-none disabled:bg-[#999]"
          name="name" placeholder="Name" />
          <input className="w-125 p-2 border-2 border-border mb-[15px] mt-[15px] rounded-[5px] my-[15px] focus:border-primary focus:outline-none disabled:bg-[#999]" 
          type="email" name="email" placeholder="Email" />
          <textarea className="min-h-50 w-125 p-2 border-2 border-border mb-[15px] mt-[15px] rounded-[5px] my-[15px] focus:border-primary focus:outline-none disabled:bg-[#999]"
          placeholder="Message" name="message"></textarea>
          <button className="border border-primary bg-transparent text-primary font-pacifico text-5 py-[5px] px-[15px] rounded-[5px] inline-block curson-pointer disabled:opacity-50 disabled:bg-[#ccc]">Submit</button>
        </form>
      )}
    </div>
  );
}