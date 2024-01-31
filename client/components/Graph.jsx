"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Image from "next/image";
import nodataImg from "@/assets/expense.png"
import { useTransactionContext } from "@/context/TransactionContext";
Chart.register(ArcElement);

const Graph = () => {
  const {graphData} = useTransactionContext()

  console.log(graphData);

  if (!graphData || !graphData.data || graphData.data.length === 0) {
    // Handle the case when there is no data
    return (
      <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
          <Image alt="nodata" className="w-[250px] h-[250px]" src={nodataImg} />
        </div>
      </div>
    );
  }

  const categories = graphData.data.map(
    (transaction) => transaction.categoryType
  );
  const categoryCounts = {};
  categories.forEach((category) => {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const totalCount = Object.values(categoryCounts).reduce(
    (total, count) => total + count,
    0
  );

  const labels = Object.keys(categoryCounts).concat("Total");
  const dataValues = Object.values(categoryCounts).concat(totalCount);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: dataValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(0, 0, 255)",
          "rgb(169, 169, 169)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const labelsData = data.labels.map((label, index) => {
    const backgroundColor = data.datasets[0].backgroundColor[index];
    const value = data.datasets[0].data[index];
    const isTotal = label === "Total";
    return (
      <div key={index} className="labels flex justify-between">
        <div className="flex gap-2 items-center">
          <div
            className={`w-2 h-2 px-4 rounded ${isTotal ? "bg-gray-400" : ""}`}
            style={{ background: backgroundColor }}
          ></div>
          <div className="flex flex-col">
            <span className="text-md">{label}</span>
          </div>
        </div>
        <span className={`font-bold ${isTotal ? "text-gray-600" : ""}`}>{`${
          value === totalCount ? 100 : ((value / totalCount) * 100).toFixed(2)
        }%`}</span>
      </div>
    );
  });
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut data={data} />
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              ${totalCount}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4  ">
          {labelsData}
        </div>
      </div>
    </div>
  );
};

export default Graph;
