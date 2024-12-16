import React from "react";
import IssueForm from "./_components/IssueForm/form";
import DocumentObtained from "./_components/DocumentObtained/document";

const Page = () => {
  return (
    <section className="flex flex-col gap-16 items-center-center w-full py-10 px-8">
      <IssueForm />

      <DocumentObtained />
    </section>
  );
};

export default Page;
