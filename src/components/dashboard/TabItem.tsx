import React from "react";

type TTabItem = {
  //   label: string;
  isActive: Boolean;
  clickHandler: () => void;
};
export const TabItem = ({ isActive, clickHandler }: TTabItem) => {
  return (
    <a
      className={`text-l font-bold tab ${isActive ? "tab-active" : ""}`}
      onClick={clickHandler}
    ></a>
  );
};
