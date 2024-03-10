import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Help from "../../assets/Help.svg";
import Trend from "../../assets/Trend.svg";
import EditOnHover from "../../assets/StatusHover.svg";
import { AiFillCaretUp } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TKpiCardProps = {
  title: string;
  data: any;
  icon: string;
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  icon,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `${calc}%` : `${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const arr = [
    "Average Order value",
    "Conversion rate",
    "Gross Sales",
    "Net return value",
    "Store search conversion",
    "Return rate",
  ];
  return (
    <>
      {!total || !percent ? ( // Render loading skeleton if data is loading
        <SkeletonTheme baseColor="#e3e3e3">
          <p style={{ marginBottom: "5px" }}>
            <Skeleton width={150} height={32} />
          </p>
          <p>
            <Skeleton width={250} height={65} />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <div
            className={`stat my-2 py-6 flex-1 rounded-xl hover:bg-[#f1f1f1]`}
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
          >
            <div className="title-icon-container flex items-center justify-between">
              <div
                className="stat-title text-l font-semibold text-black relative"
                onMouseEnter={toggleModal}
                onMouseLeave={toggleModal}
                style={{
                  marginBottom: "0.2em", // Add padding to create space between text and underline
                  textDecoration: "underline dashed",
                  textUnderlineOffset: "0.2em",
                  textDecorationColor: "#cccccc", // Add textDecorationColor property
                  textDecorationThickness: "0.1em", // Add textDecorationThickness property for space
                }}
              >
                {title}
              </div>
              <div className="relative">
                <img
                  src={icon}
                  alt="edit icon"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  id="dropdownMenuButton1"
                  // aria-expanded={isDropdownOpen}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className={`ml-2 ${showEdit ? "" : "hidden"}`}
                />

                <ul
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={`absolute z-[100] float-left m-0 ${
                    isDropdownOpen ? "" : "hidden"
                  } list-none overflow-hidden w-[18rem] rounded-2xl border-none bg-white bg-clip-padding text-left text-base shadow-lg`}
                  aria-labelledby="dropdownMenuButton1"
                  data-te-dropdown-menu-ref
                >
                  {arr.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center px-4 hover:bg-[#f1f1f1] active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 m-2 rounded-lg "
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={Trend}
                        alt="Help Icon"
                        className="h-4 w-4 mr-2"
                      />
                      <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 "
                        href="#"
                        data-te-dropdown-item-ref
                      >
                        {item}
                      </a>
                      <img
                        src={Help}
                        alt="Trend Icon"
                        className={`h-4 w-4 ml-2 ${
                          hoveredItem === index ? "block" : "hidden"
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="stat-value flex font-bold pt-2">
              {formatTotal(total ?? "...")}
              <div className="flex items-center ml-[0.5rem]">
                <AiFillCaretUp
                  className="w-5 h-5"
                  style={{ color: "#7f7f7f" }}
                />
                <span
                  className="mx-1 text-sm font-medium"
                  style={{ color: "#7f7f7f" }}
                >
                  {percent}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`w-[195%] mt-[-4.5rem] ml-6 pl-6 py-2 flex-1 rounded-xl drop-shadow bg-[#ffffff] relative z-1 ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="font-bold">{title}</div>
            <div className="inline-block text-[0.8rem]">
              Your {title} volume, shown in sessions.
            </div>
          </div>
        </>
      )}
    </>
  );
};
