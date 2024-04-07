import { Popover, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { iconFill, iconSize, iconStroke } from "../Configs/Colors";
import { AdjustmentsVerticalIcon } from "@heroicons/react/20/solid";
import style from "./FilterPopover.module.css";
import { ServiceIcon } from "./serviceIcon";

export interface IFilter {
  name: string;
  description: string;
  href: string;
  type: string;
}

export default function FilterPopover({
  filterData = [],
  onSelectedItemsChange,
  selectedItems = [],
  onClickFilter,
}: {
  filterData?: any[]; // Adjust the type if filterData has a specific type
  // onSelectedItemsChange: (type: string, selectedItems: IFilter) => void;
  onSelectedItemsChange: (selectedItems: IFilter[]) => void;
  selectedItems: any[];
  onClickFilter: (action: any) => void;
}) {
  const [collectedFilters, setCollectedFilters] = useState<any>([]);

  const handleCheckboxChange = (item: IFilter) => {
    const existingFilterIndex = collectedFilters.findIndex(
      (filter: any) => filter?.type === item?.type
    );
    console.log("existingFilterIndex ", existingFilterIndex);
    // check if collectedFilters has item
    const inCollectedFilters = collectedFilters.some(
      (filter: any) => filter?.type === item?.type
    );

    if (existingFilterIndex !== -1) {
      // means that a filter with the same type exists, so we replace it with the new item in the updated state
      setCollectedFilters((prev: any) => {
        const updatedFilters = [...prev];
        updatedFilters[existingFilterIndex] = item;
        return updatedFilters;
      });
    } else {
      setCollectedFilters((prev: any) => [...prev, item]);
    }
    // onSelectedItemsChange(item?.type, item);
  };

  useEffect(() => {
    console.log("collectedFilters ", collectedFilters);
    onSelectedItemsChange(collectedFilters);
  }, [collectedFilters]);

  const getTypeHeader = (type: string): string => {
    switch (type) {
      case "TYPE_SPORT":
        return "Sport Type Options";
      case "TYPE_CATEGORY":
        return "Category Type Options";
      case "TYPE_STATUS":
        return "Status Type Options";
      // Add more cases for other types if needed
      default:
        return "Options"; // Default header text
    }
  };

  const handleRestFilters = (event: any) => {
    console.log(event);
    event.preventDefault();
    onSelectedItemsChange([]);
    setCollectedFilters([]);
  };

  return (
    <div className={style.componentStyle + " popover-filter-container"}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={() => {
                console.log("Button clicked!");
                onClickFilter("filter_clicked");
              }}
              className={
                style.binocular +
                ` binocular 
                    group inline-flex items-center rounded-md text-base font-medium 
                    hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
                  `
              }
            >
              {/* <ServiceIcon height={`24px`} width={`24px`}/> */}
              <span className="inline-flex w-full justify-center rounded-md bg-[#B5B782] px-4 py-2 text-sm font-medium text-[#013F62] hover:text-[#013F62] hover:bg-[#FEDC97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                Filter
                <ChevronDownIcon
                  fill="#013F62"
                  stroke="#013F62"
                  className={
                    style.chevy +
                    ` chevy -mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100 transition-transform ${
                      open ? "transform rotate-180" : ""
                    }`
                  }
                  aria-hidden="true"
                />
              </span>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={
                  "absolute left-[65px] z-10 -translate-x-1/2 transform px-4 sm:px-0"
                }
                style={{ width: "230px" }}
              >
                <div className={style.popoverDiv + " popoverDiv"}>
                  <div
                    className="poptitle z-10"
                    style={{ fontWeight: 700, fontSize: "16px" }}
                  >
                    Category Filters:
                  </div>
                  {/* <pre>{JSON.stringify(collectedFilters, null, 4)}</pre> */}
                  <div
                    className="relative grid gap-[12px] bg-white p-[12px] lg:grid-cols-2"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {filterData.map((item: any, index: number) => (
                      <div key={item?.name + index}>
                        {index > 0 &&
                          filterData[index - 1]?.type !== item.type && (
                            <hr />
                          )}{" "}
                        {/* Render <hr /> when type changes */}
                        {index === 0 ||
                        filterData[index - 1]?.type !== item.type ? (
                          <h3
                            className={style.hrHeaderTitle + " hrHeaderTitle"}
                          >
                            {getTypeHeader(item.type)}
                          </h3>
                        ) : null}{" "}
                        {/* Render header when type changes */}
                        <div className={style.subInput + " subInput"}>
                          {/* Input options for each item */}
                          {item.type === "TYPE_SPORT" && (
                            <>
                              <input
                                type="radio"
                                id={item.name}
                                name="sportTypeGroup" // Ensure this name is unique to the group
                                style={{ cursor: "pointer" }}
                                onChange={() => handleCheckboxChange(item)}
                                checked={selectedItems.includes(item.name)} // Check if the item is selected
                              />
                              <label htmlFor={item.name}>{item.name}</label>
                            </>
                          )}
                          {item.type === "TYPE_CATEGORY" && (
                            <>
                              <input
                                type="radio" // Assuming categories can have multiple selections
                                id={item.name}
                                name="sportCategoryGroup" // Unique name for this group
                                style={{ cursor: "pointer" }}
                                onChange={() => handleCheckboxChange(item)}
                                checked={selectedItems.includes(item.name)} // Check if the item is selected
                              />
                              <label htmlFor={item.name}>{item.name}</label>
                            </>
                          )}
                          {item.type === "TYPE_STATUS" && (
                            <>
                              <input
                                type="radio" // Assuming statuses can have multiple selections
                                id={item.name}
                                name="statusGroup" // Unique name for this group
                                style={{ cursor: "pointer" }}
                                onChange={() => handleCheckboxChange(item)}
                                checked={selectedItems.includes(item.name)} // Check if the item is selected
                              />
                              <label htmlFor={item.name}>{item.name}</label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={style.resetFilter + " reset-filters"}>
                    <hr />
                    <button
                      className={style.btnReset + " btnReset"}
                      onClick={handleRestFilters}
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
