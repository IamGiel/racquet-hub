import Avatar from "boring-avatars";
import styles from "./Landing.module.css";
import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

import FilterPopover, { IFilter } from "../Popovers/FilterPopover";
import { iconFill, iconSize, iconStroke } from "../Configs/Colors";
// import { ProposeComponent } from "/Users/alphagiel/Work/FULL STACKS/racquet-hub/src/component/Dialogs/ProposeComponent.dialog";
import {
  sportCategoryFilters,
  sportTypeFilters,
  statusFilters,
} from "../Configs/Options";
import { ProposalForm } from "../Form/ProposalForm";
import { dialogService } from "../Services/dialog-service";
import { ProposeComponent } from "../Dialogs/ProposeComponent.dialog";
import { DatePicker } from "../Form/DatePicker";

export default function ProposalListv2({ proposals }: any) {
  const [listOfProposals, setListOfProposals] = useState(proposals || []);
  const [filteredList, setfilteredList] = useState(proposals || []);
  const [filterData, setFilterData] = useState<any>([]);
  const [selections, setSelections] = useState<any>([]);

  const [sortConfig, setSortConfig] = useState<any>({
    key: "playtime",
    direction: "desc",
  });

  const columns = [
    { id: `name`, label: `Name`, sortValue: `name` },
    { id: `sport`, label: `Sport`, sortValue: `sport` },
    { id: `type`, label: `Type`, sortValue: `type` },
    { id: `playTime`, label: `Time`, sortValue: `playTime` },
    {
      id: `playPlace.distance`,
      label: `Place`,
      sortValue: `playPlace.distance`,
    },
    {
      id: `eventStatus.status`,
      label: `Status`,
      sortValue: `eventStatus.status`,
    },
  ];

  const mainFontColor = `#023047`;

  function makeReadableTimePlace(timePlace: string) {
    const formattedDateTime = new Date(timePlace).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC", // Set the desired timezone, adjust as needed
    });
    return formattedDateTime;
  }

  const handleSort = (key: any) => {
    // console.log("handle sort key ", key);
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // If key === time, convert time into a format that can be sorted asc and desc
    sortColumns(key, direction);
    setSortConfig({ key, direction });
  };

  const sortColumns = (colname: string, direction: string) => {
    // console.log();
    // setfilteredList((prevList: any) => {
    //   return [...prevList].sort((a, b) => {
    //     if (colname.includes(".")) {
    //       // Handle sorting for nested properties
    //       const keys = colname.split(".");
    //       const aValue = keys.reduce((obj, key) => obj[key], a);
    //       const bValue = keys.reduce((obj, key) => obj[key], b);

    //       if (typeof aValue === "string" && typeof bValue === "string") {
    //         return direction === "asc"
    //           ? aValue.localeCompare(bValue)
    //           : bValue.localeCompare(aValue);
    //       } else {
    //         return direction === "asc" ? aValue - bValue : bValue - aValue;
    //       }
    //     } else if (colname === "time") {
    //       const aTime = new Date(a[colname]).getTime();
    //       const bTime = new Date(b[colname]).getTime();
    //       return direction === "asc" ? aTime - bTime : bTime - aTime;
    //     } else {
    //       // Handle sorting for other columns
    //       // Modify this part based on your specific column sorting logic
    //       return direction === "asc"
    //         ? String(a[colname]).localeCompare(String(b[colname]))
    //         : String(b[colname]).localeCompare(String(a[colname]));
    //     }
    //   });
    // });
  };

  const renderCaret = (key: any) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <>
          {/* Up arrow icon */}
          <ChevronUpIcon
            height={iconSize}
            width={iconSize}
            fill={iconFill}
            stroke={iconStroke}
          />
        </>
      ) : (
        <>
          {/* Down arrow icon */}
          <ChevronDownIcon
            height={iconSize}
            width={iconSize}
            fill={iconFill}
            stroke={iconStroke}
          />
        </>
      );
    }
    // If not the sorted column, return a different SVG icon
    return (
      <ChevronUpDownIcon
        height={iconSize}
        width={iconSize}
        fill={iconFill}
        stroke={iconStroke}
      />
    );
  };

  function handleControl(columnId: string, val?: boolean) {
    // console.log("columnId ", columnId);

    handleSort(columnId);
  }

  const handleSelectedItemsChange = (filterBy: IFilter[]) => {
    // Set the current selection
    // setSelections(filterBy?.name);
    // console.log("filterBy ", filterBy);
    const namesOfFilters: any = [];
    const copyOfList = [...listOfProposals];

    // Initialize the filtered list with the original list of items
    let filteredList = [...copyOfList];

    // Iterate through each filter
    filterBy.forEach((aFilter: IFilter) => {
      namesOfFilters.push(aFilter?.name);

      // Apply the current filter to the filtered list
      if (aFilter?.type === "TYPE_SPORT") {
        filteredList = filteredList.filter((listItem: any) => {
          return listItem.sport.toLowerCase() === aFilter?.name.toLowerCase();
        });
      }

      if (aFilter?.type === "TYPE_CATEGORY") {
        filteredList = filteredList.filter((listItem: any) => {
          return listItem.type.toLowerCase() === aFilter?.name.toLowerCase();
        });
      }

      if (aFilter?.type === "TYPE_STATUS") {
        filteredList = filteredList.filter((listItem: any) => {
          return (
            listItem.eventStatus.status.toLowerCase() ===
            aFilter?.name.toLowerCase()
          );
        });
      }

      // Add more conditions for other filter types if needed
    });

    // console.log("a namesOfFilters ", namesOfFilters);
    setSelections(namesOfFilters);
    setfilteredList(filteredList);
  };

  const handleMakeProposal = (event: any) => {
    event.preventDefault();
    // console.log(event);
    dialogService.openDialog(ProposeComponent, {
      data: "testing data transfer",
    });
  };

  function showPopoverForFiltering(msg: any) {
    // open popover that allows for filtering this column
    // console.log("column to filter ", msg);

    // setFilterData(sportTypeFilters);
    setFilterData([
      ...sportTypeFilters,
      ...statusFilters,
      ...sportCategoryFilters,
    ]);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        className="sm:flex sm:items-center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className={styles.descriptionTitle + " descriptionTitle"}>
          <h1
            className="text-base font-semibold leading-6 text-gray-900"
            style={{
              fontWeight: "700",
              fontSize: "30px",
              color: mainFontColor,
            }}
          >
            Events
          </h1>
          <p
            className="mt-2 text-sm text-gray-700"
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: mainFontColor,
            }}
          >
            List of players who want to start an event. Checkout their proposal.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            style={{ background: "rgb(3, 63, 99)" }}
            onClick={handleMakeProposal}
          >
            Propose an Event
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-[100vh]">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {/* {listOfProposals.length > 0 && ( */}
            <div className={styles.filtersub + " filtersub"}>
              <div className={styles.filterPopDiv + " filterPopDiv"}>
                <FilterPopover
                  filterData={filterData}
                  onSelectedItemsChange={handleSelectedItemsChange}
                  selectedItems={selections}
                  onClickFilter={showPopoverForFiltering}
                />
              </div>
            </div>
            {/* )} */}
            <hr style={{ margin: "24px 0px 0px" }} />
            {/* <pre>{JSON.stringify(filteredList, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(proposals, null, 4)}</pre> */}
            {filteredList && filteredList.length > 0 && (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        style={{ maxWidth: "300px" }}
                      >
                        <div
                          className="col-label-container"
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                          }}
                        >
                          <span className="colLabel capitalize text-[#023047]">
                            {column.label}
                          </span>{" "}
                          <div className="controller-container">
                            {(column?.id === "name" ||
                              column?.id === "playPlace.distance" ||
                              column?.id === "playTime") && (
                              <span
                                className={styles.caretStyle + " caret"}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleControl(column.id);
                                }}
                              >
                                {renderCaret(column?.id)}
                              </span>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredList.map((proposalItem: any) => (
                    <tr key={proposalItem.domain}>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                        }
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          <Avatar
                            size={40}
                            name={proposalItem.domain}
                            square={true}
                            variant="beam"
                            colors={[
                              // #033f63 // #28666e // #7c9885 // #b5b682 // #fedc97
                              "#033f63",
                              "#28666e",
                              "#7c9885",
                              "#b5b682",
                              "#fedc97",
                            ]}
                          />
                        </span>
                        <span className="td_info text-[#023047]">
                          {proposalItem.name}
                        </span>
                      </td>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                        }
                      >
                        {proposalItem.sport}
                      </td>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                        }
                      >
                        {proposalItem.type}
                      </td>
                      {/* <td
                      className={
                        styles.tdAlignment +
                        " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                      }
                    >
                      {proposalItem.email}
                    </td> */}
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                        }
                      >
                        {makeReadableTimePlace(proposalItem.playTime)}
                      </td>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                        }
                      >
                        {/* {JSON.stringify(proposalItem.playPlace)} */}
                        <div className="location-details">
                          <span>{proposalItem.playPlace?.location}</span>
                          <span>
                            {proposalItem.playPlace?.distance
                              ? `, ${proposalItem.playPlace?.distance} miles away`
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment whitespace-nowrap py-4 text-sm text-gray-500"
                        }
                      >
                        {proposalItem.eventStatus?.status}
                      </td>
                      <td
                        className={
                          styles.tdAlignment +
                          " tdAlignment relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                        }
                      >
                        <a
                          href={`http://localhost:3001`}
                          className="text-indigo-600 hover:text-indigo-900"
                          style={{ color: "rgb(3, 63, 99)" }}
                        >
                          Edit
                          <span className="sr-only">, {proposalItem.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {filteredList && filteredList.length === 0 && (
              <div className={styles.noProposalsFound + " no-proposla-found"}>
                NO PROPOSALS FOUND
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
