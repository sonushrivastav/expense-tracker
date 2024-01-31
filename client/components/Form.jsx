"use client"
import { LOCALHOST_URL } from "@/config/config";
import { useTransactionContext } from "@/context/TransactionContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Form = () => {
  const [formData,setFormData] = useState({})
  const {graphData} = useTransactionContext()

  

  const getTranscationHistory = async()=> {
  try {
    const response = await axios.get(`${LOCALHOST_URL}/transaction/history`)
    localStorage.setItem("transaction", JSON.stringify(response.data))
  } catch (error) {
    console.log(error);
  }
   }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
     try {
       const response = await axios.post(`${LOCALHOST_URL}/transaction`, formData)
       if (response.data) {
         setFormData({
           
         })
         getTranscationHistory()
         window.location.reload();
       }
     } catch (error) {
       console.log(error);
     }
   }
  const category = [
    {type:"Food",color:"red"},
    {type:"Travel",color:"green"},
    {type:"Business",color:"yellow"},
    {type:"Rent", color:"blue"},
  ]

  const handleCategorychange = (value) => {
    const selectedCategory = category.find((categ) => categ.type === value);

    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        categoryType: selectedCategory.type,
        categoryColor: selectedCategory.color,
      }));
    }
  }


  
  

  //  console.log(history);
  // console.log(formData);
  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <input
            type="text"
            required
            value={formData?.description || ""}
            onChange={(e)=>setFormData((prev)=>({...prev,description:e.target.value}))}
            placeholder="Enter Description... "
            className="w-full outline-none rounded-md custom-input border border-gray-300 px-3 py-2"
          />
          <input
            type="date"
            required
            value={formData?.date || ""}
            onChange={(e)=>setFormData((prev)=>({...prev,date:e.target.value}))}
            placeholder="Enter Date "
            className="w-full rounded-md custom-input outline-none border border-gray-300 px-3 py-2"
          />
          <select
            onChange={(e) => handleCategorychange(e.target.value)}
            value={formData?.categoryType || ""}
            required className="w-full custom-input outline-none rounded-md border border-gray-300 px-3 py-2">
            <option value="" selected default>
              Select Category
            </option>
            {
              category?.map((categ) => (
                <option key={categ?.type} value={categ?.type}>{ categ?.type}</option>
              ))
            }
          </select>
          <input
            type="number"
            required
            value={formData?.amount || ""}
            placeholder="Amount"
            onChange={(e)=>setFormData((prev)=>({...prev,amount:e.target.value}))}
            className="w-full custom-input outline-none rounded-md border border-gray-300 px-3 py-2"
          />
          <button className="border py-2 rounded-md text-white bg-indigo-500 w-full">
            Make Transaction
          </button>
        </div>
          </form>
          
          <div className="flex flex-col py-6 gap-3">
              <h1 className='py-4 font-bold text-xl'>History</h1>
              <div className="w-full rounded flex flex-col gap-5  ">
          {
            graphData?.data?.length ?
      graphData?.data?.map((transaction) => (
        <div
          key={transaction.date}
          style={{ borderRight: `4px solid ${transaction?.categoryColor}` }}
          className={`flex  items-center justify-between shadow-sm shadow-gray-400 gap-2 rounded px-5 py-2 `}
        >
          <span>${transaction?.amount}</span>
          <span>{transaction?.categoryType}</span>
          
        </div>
      ))
             : null
          }
              </div>
          </div>
    </div>
  );
};

export default Form;
