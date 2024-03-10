import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveAreaChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import {
  IChartDatum,
  TTab,
  RevenueData,
  DataItem,
  Props,
} from "../../interfaces";
import data from "../../data.json";

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

export const Dashboard: React.FC = () => {
  const [filteredRevenueData, setFilteredRevenueData] = useState<RevenueData[]>(
    []
  );
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const { data: conversion } = useList<IChartDatum>({
    resource: "conversion",
    filters,
  });

  const useMemoizedChartData = (d: DataItem[] | undefined) => {
    return useMemo(() => {
      return d?.map((item: DataItem) => ({
        name:
          typeof item.name === "string"
            ? item.name
            : new Intl.DateTimeFormat("en-US", {
                month: "short",
                year: "numeric",
              }).format(item.name),
        uv: item?.uv,
        pv: item?.pv,
        amt: item?.amt,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(data);

  const tabs: TTab[] = [
    {
      // id: 1,
      // label: "Daily Revenue",
      content: (
        <ResponsiveLineChart
          kpi="Daily revenue"
          data={filteredRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
        conversion={conversion}
        filteredRevenueData={filteredRevenueData}
        setFilteredRevenueData={setFilteredRevenueData}
        tabs={tabs}
      />

      <RecentSales />
    </>
  );
};
