import * as React from "react";
// import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import { createTheme as createMaterialTheme } from "@mui/material/styles";
// import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import styles from "./Landing.module.css";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortIconPositions,
  SortToggleType,
} from "@table-library/react-table-library/sort";

import { list } from "./TestData/List";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../../store";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { useNavigate } from "react-router-dom";
import { dialogService } from "../Services/dialog-service";
import { ProposeComponent } from "../Dialogs/ProposeComponent.dialog";

export const ProposalListv3 = ({ proposalList }: any) => {
  const navigateTo = useNavigate()

  const userAuth = useAppSelector((state) =>
    JSON.parse(state.userAuth.payload)
  );
  const isAuthenticated = useAppSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const convertedData = proposalList.map((item: any) => ({
    id: item._id.$oid,
    name: item.user_details.name,
    sport: item.sport,
    date: new Date(item.playTime),
    type: item.type,
    status: item.eventStatus.status,
    location: item.location.location,
    user_id: item.user_details.user_id,
  }));

  const theme = useTheme({
    Table: `
      border-radius: 6px; /* Border radius for the table */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow for each row */
      gap:12px;
      padding:12px;
    `,
    // BaseCell: `
    //   margin: 9px 0 12px; /* Updated margin with 12px bottom margin */
    //   padding: 11px;
    // `,
   
   
    BaseRow: `
      margin-bottom: 12px;
      &:hover {
        background-color: #f0f5ff; /* Light blue background on hover */
      }
    `,
  });
  

  // React.useEffect(() => {
  //   console.log("proposalList in v3 ", proposalList);

  //   // const convertedList = convertedData(proposalList)
  //   console.log("convertedList ", convertedData);
  //   // convertedData(proposalList)
  // }, []);

  const data = { nodes: convertedData };
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        SPORT: (array) => array.sort((a, b) => a.sport.localeCompare(b.sport)),
        DATE: (array) => array.sort((a, b) => a.date - b.date),
        CATEGORY: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        STATUS: (array) => array.sort((a, b) => a.status - b.status),
        LOCATION: (array) =>
          array.sort((a, b) => a.location.localeCompare(b.location)),
        // LOCATION: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action: any, state: any) {
    console.log(action, state);
  }

  const sortIconOptions = {
    iconDefault: <ChevronDown />,
    iconUp: <ChevronUpIcon />,
    iconDown: <ChevronDown />,
  };

  const sortIconOptionsNone = {
    iconDefault: null,
    iconUp: null,
    iconDown: null,
  };

  function onEditProposal(proposalItem:any){
    console.log(`on open proposalItem `, proposalItem);
    if(isAuthenticated){
      navigateTo(`/proposal/${proposalItem?.id}/edit`, {state:proposalItem})

    }
  }

  const mainFontColor = `#023047`;
  const handleMakeProposal = (event: any) => {
    event.preventDefault();
    // console.log(event);
    dialogService.openDialog(ProposeComponent, {
      data: "testing data transfer",
    });
  };


  return (
    <>
      {/* <pre>test</pre> */}
      <div
            className={
              styles.eventsIntro + " eventsIntro sm:flex sm:items-center"
            }
          >
            <div className={styles.descriptionTitle + " descriptionTitle"}>
              <h1
                className="text-base font-semibold text-gray-900"
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
                List of players who want to start an event. Checkout their
                proposal.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  background: isAuthenticated ? "rgb(3, 63, 99)" : "lightGrey",
                }}
                onClick={handleMakeProposal}
                disabled={isAuthenticated ? false : true}
              >
                Propose an Event
              </button>
            </div>
          </div>
      <Table data={data} sort={sort} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow className={styles.headerRow + ' headerRow'}>
                <HeaderCellSort sortKey="NAME" sortIcon={sortIconOptions}>
                  Name
                </HeaderCellSort>
                <HeaderCellSort sortKey="SPORT" sortIcon={sortIconOptions}>
                  Sport
                </HeaderCellSort>
                <HeaderCellSort sortKey="DATE" sortIcon={sortIconOptions}>
                  Date
                </HeaderCellSort>
                <HeaderCellSort sortKey="CATEGORY" sortIcon={sortIconOptions}>
                  Category
                </HeaderCellSort>
                <HeaderCellSort sortKey="STATUS" sortIcon={sortIconOptions}>
                  Status
                </HeaderCellSort>
                <HeaderCellSort sortKey="LOCATION" sortIcon={sortIconOptions}>
                  Location
                </HeaderCellSort>
                <HeaderCellSort
                  sortKey="ACTION"
                  sortIcon={sortIconOptionsNone}
                ></HeaderCellSort>
                {/* <div>"TEST"</div> */}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any) => (
                <Row item={item} key={item.id}>
                  {/* <pre>{JSON.stringify(item,null,4)}</pre> */}
                  <Cell className="capitalize">{item.name}</Cell>
                  <Cell className="capitalize">{item.sport}</Cell>
                  <Cell className="capitalize">
                    {item.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Cell>
                  <Cell className="capitalize">{item.type}</Cell>
                  <Cell className="capitalize">{item.status}</Cell>
                  <Cell className="capitalize">{item.location}</Cell>
                  {userAuth?.data._id !== item?.user_id && (
                    <button
                      type="button"
                      className={styles["join-button"] + " join-button"}
                      style={{
                        display: isAuthenticated ? "flex" : "none",
                        gap: "12px",
                        alignItems: "center",
                        background:
                          item.eventStatus?.status === "closed"
                            ? "lightgrey"
                            : "",
                        pointerEvents:
                          item.eventStatus?.status === "closed"
                            ? "none"
                            : undefined,
                        justifyContent: "center",
                      }}
                    >
                      {item.eventStatus?.status === "closed" ? "Full" : "Join"}
                      <span className="sr-only">, {item.name}</span>
                    </button>
                  )}
                  {userAuth?.data._id === item?.user_id && (
                     <button
                     type="button"
                     className={
                       styles["join-button"] + " join-button"
                     }
                     style={{
                       display: isAuthenticated ? "flex" : "none",
                       gap: "12px",
                       alignItems: "center",
                       background: "#e2715b",
                       pointerEvents:
                         item.eventStatus?.status ===
                         "closed"
                           ? "none"
                           : undefined,
                       justifyContent: "center",
                     }}
                     onClick={()=>onEditProposal(item)}
                   >
                     Edit
                   </button>
                  )}
                  {/* <button>{JSON .stringify(item,null,4 )}</button> */}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      {/* <pre>{JSON.stringify(userAuth,null,4)}</pre> */}
    </>
  );
};
