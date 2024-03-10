import React, { useEffect, useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";

type TTabViewProps = {
  tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto rounded-lg ">
      <div className="tabs">
        {tabs?.map((tab: TTab, index: number) => (
          <TabItem
            isActive={index === activeTab}
            clickHandler={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="mx-auto">
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel isActive={index === activeTab}>{tab?.content}</TabPanel>
        ))}
      </div>
    </div>
  );
};
