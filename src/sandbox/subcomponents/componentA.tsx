import React, { useEffect, useState } from "react";
import styles from "../sandbox.module.css";
import { dialogService } from "../../component/Services/dialog-service";
import { ComponentB } from "./componentB";
import { Login } from "../../component/Login/Login";
import { Filter } from "./filter";
import useDebounce from "../../component/utils/useDebounce";

interface FilterValueObject {
  id: number;
  name: string;
  value: string;
}
type FilterValue = FilterValueObject | string[] | string;

export const ComponentA = ({ componentName = "", data = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOptions, setDataOptions] = useState<any | null>([]);
  const [statusOptions, setStatusOptions] = useState<any | null>([]);
  const [_search, search, setSearch] = useDebounce(null, 800);
  const [selectedFilters, setSelectedFilters] = useState<any | null>([]);
  useEffect(() => {
    if (!data) {
      setIsLoading(true);
      setSelectedFilters([]);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  // Simulate an API call to fetch options
  const fetchOptions = () => {
    setIsLoading(true);
    // Mimic an API promise
    return new Promise<{ dataOptions: any[]; statusOptions: any[] }>(
      (resolve) => {
        setTimeout(() => {
          resolve({
            dataOptions: [
              { value: "all", label: "All" },
              {
                value: "my_suppliers_searches",
                label: "My suppliers searches",
              },
              {
                value: "my_colleagues_suppliers_searches",
                label: "My colleague’s suppliers searches",
              },
            ],
            statusOptions: [
              { value: "all", label: "All" },
              { value: "inProgress", label: "In Progress" },
              { value: "complete", label: "Complete" },
              { value: "noResults", label: "No Results" },
            ],
          });
          setIsLoading(false);
          console.log("fetching options done");
        }, 3000); // Simulate a 1-second delay
      }
    );
  };

  useEffect(() => {
    console.log("fetching options ");
    fetchOptions().then(({ dataOptions, statusOptions }) => {
      setDataOptions(dataOptions);
      setStatusOptions(statusOptions);
      // setSearch()
    });

    // Cleanup function
    return () => {};
  }, []);

  const hasNameProperty = (obj: any): obj is { name: string } => {
    return typeof obj === "object" && "name" in obj;
  };

  const xBtnSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.43353 3.43433C3.74595 3.12191 4.25248 3.12191 4.5649 3.43433L7.99922 6.86864L11.4335 3.43433C11.746 3.12191 12.2525 3.12191 12.5649 3.43433C12.8773 3.74675 12.8773 4.25328 12.5649 4.5657L9.13059 8.00001L12.5649 11.4343C12.8773 11.7467 12.8773 12.2533 12.5649 12.5657C12.2525 12.8781 11.746 12.8781 11.4335 12.5657L7.99922 9.13138L4.5649 12.5657C4.25248 12.8781 3.74595 12.8781 3.43353 12.5657C3.12111 12.2533 3.12111 11.7467 3.43353 11.4343L6.86785 8.00001L3.43353 4.5657C3.12111 4.25328 3.12111 3.74675 3.43353 3.43433Z"
        fill="#444752"
      />
    </svg>
  );

  return (
    <div className="inline-flex flex-col flex-shrink-0 justify-between items-start h-[auto]">
      <div className="flex flex-col items-start gap-5 p-6 w-[100%] rounded-lg bg-[#fff]">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="self-stretch text-[#222429] font-['Inter'] text-lg font-medium leading-6">
            {componentName}
          </div>
          <div className="w-[576px] text-[#878ea5] font-['Inter'] text-sm leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus praesentium tenetur pariatur.
          </div>
          <div className="filter-button-div-container">
            <button
              className={
                isLoading
                  ? styles.filterBTN_disabled
                  : styles.filterBTN + " filterBTN"
              }
              type="button"
              onClick={(event) => {
                event.preventDefault();
                console.log(
                  "opening dialog, selectedFilters are ",
                  selectedFilters
                );
                dialogService.openDialog(
                  Filter,
                  {
                    filters: data,
                    mainOptions: dataOptions,
                    statusOptions,
                    previuosState: selectedFilters,
                    categories: [
                      {
                        id: 1,
                        name: "Carbon Steel",
                        value: "carbon_steel",
                      },
                      {
                        id: 2,
                        name: "Petrol",
                        value: "petrol",
                      },
                    ],
                    countries: [
                      {
                        id: 1,
                        name: "United States",
                        value: "usa",
                      },
                      {
                        id: 2,
                        name: "Canada",
                        value: "can",
                      },
                    ],
                  },
                  (dataRecieved) => {
                    console.log("dataRecieved ", JSON.stringify(dataRecieved));
                    setSelectedFilters(dataRecieved);
                  }
                );
              }}
              disabled={isLoading}
            >
              {isLoading ? "Getting filters..." : "OPEN FILTER"}
            </button>
            <div className="filtered-items-container flex flex-col gap-[12px] mt-[12px]">
              {Object.keys(selectedFilters).length > 0 && (
                <div className={styles.selectedFilters}>
                  {Object.entries(selectedFilters).map(([key, value]) => {
                    if (Array.isArray(value)) {
                      return value.map((item, index) => (
                        <span
                          key={`${key}-${index}`}
                          className={styles.filterpill}
                          onClick={() => {
                            console.log(key, item);
                            // update the filterState
                            // need to match the data obj that is originally passed to the filter when open
                            console.log("selected filters ", selectedFilters);
                          }}
                        >
                          {item}
                          {xBtnSvg()}
                        </span>
                      ));
                    } else if (typeof value === "object" && value !== null) {
                      return (
                        <span
                          key={key}
                          className={styles.filterpill}
                          onClick={() => {
                            // update the filterState
                            // need to match the data obj that is originally passed to the filter when open
                            console.log("selected filters ", selectedFilters);
                          }}
                        >
                          {(value as FilterValueObject).name}
                          {xBtnSvg()}
                        </span>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={styles.listItems + " listitems"}>
            {!isLoading &&
              data &&
              Array.isArray(data) &&
              data.map((item: any, itemId: any) => (
                <div
                  className={styles.listitemCard + " listitemCard"}
                  key={itemId}
                >
                  <span className="listitem-span">
                    name: {item?.profile.name}
                  </span>
                  <span className="listitem-span">
                    username: {item?.username}
                  </span>
                  <span className="listitem-span">
                    dob: {item?.profile.dob}
                  </span>
                  <span className="listitem-span">roles: {item?.roles}</span>
                  <span className="listitem-span">
                    createdAt: {item?.createdAt}
                  </span>
                  <span className="listitem-span">
                    updatedAt: {item?.updatedAt}
                  </span>
                </div>
              ))}

            {isLoading && <span>loading...</span>}
          </div>
        </div>
        {/* <div className="button flex justify-center items-center pt-[0.5625rem] pb-[0.5625rem] pl-[1.0625rem] pr-[1.0625rem] rounded-md border border-[#cbd1e2] bg-white text-[#444752] font-['Inter'] text-sm font-medium leading-5">
          Contact sales
        </div> */}
      </div>
    </div>
  );
};
