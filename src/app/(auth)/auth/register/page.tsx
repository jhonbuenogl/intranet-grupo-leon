import React from "react";
import AuthForm from "../../_components/AuthForm/form";

const Page = () => {
  return (
    <section className="grid grid-cols-7 justify-center min-h-screen bg-zinc-800">
      <div className="hidden sm:block sm:col-span-4"></div>
      <div className="col-span-7 sm:col-span-3 py-10 w-full flex items-center justify-center bg-zinc-100">
        <AuthForm mode="register" />
      </div>
    </section>
  );
};

export default Page;
