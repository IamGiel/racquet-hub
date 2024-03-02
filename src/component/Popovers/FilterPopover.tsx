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
  onSelectedItemsChange: (type: string, selectedItems: IFilter) => void;
  selectedItems: any[];
  onClickFilter: (action: any) => void;
}) {
  // const [selectedItems, setSelectedItems] = useState<string[]>(filterData);

  const handleCheckboxChange = (item: IFilter) => {
    // we need to pass the parent the selected item
    onSelectedItemsChange(item?.type, item);
  };

  useEffect(() => {
    console.log("filterdata ", filterData);
  }, []);

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
              <button className="inline-flex w-full justify-center rounded-md bg-[#B5B782] px-4 py-2 text-sm font-medium text-[#013F62] hover:text-[#013F62] hover:bg-[#FEDC97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
              </button>
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
                  <div
                    className="relative grid gap-[12px] bg-white p-[12px] lg:grid-cols-2"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    
                    {/* <span>{JSON.stringify(filterData)}</span> */}
                    {filterData.map((item: any) => (
                      <div
                        key={item?.name}
                        className={style.subInput + " subInput"}
                      >
                        {item.type === "TYPE_SPORT" && (
                          <>
                            <input
                              type="radio"
                              id={item.name}
                              name="sportTypeGroup" // Ensure this name is unique to the group
                              style={{ cursor: "pointer" }}
                              onChange={() => handleCheckboxChange(item)}
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
                            />
                            <label htmlFor={item.name}>{item.name}</label>
                          </>
                        )}
                      </div>
                    ))}
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
