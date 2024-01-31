import Form from "@/components/Form";
import Graph from "@/components/Graph";
import { TransactionProvider } from "@/context/TransactionContext.jsx";
import Image from "next/image";

export default function Home() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl mobile-px-5 text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8  mb-10 bg-indigo-500 text-white rounded">
          Expense Tracker
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <TransactionProvider>
           <Graph/>
          <Form />
        </TransactionProvider>
        </div>
      </div>
    </div>
  );
}
