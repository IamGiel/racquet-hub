import classNames from "classnames";
import { ClockIcon } from "../../assets/svgs/ClockIcon";
import { RacketSportIcon } from "../../assets/svgs/RacketSportIcon";
import { SportCategoryIcon } from "../../assets/svgs/SportCategoryIcon";
import { EventCalendar } from "../../assets/svgs/EventCalendar";
import { LocationIcon } from "../../assets/svgs/Location";

const StepperComponent = ({ status }: any) => {
  // const numSteps = ["Sport", "Cate", "Date", "Time"];
  const numSteps = [
    {
      id: "sportType",
      name: "Sport",
      icon: <RacketSportIcon />,
      status: status.values.sportType,
    },
    {
      id: "categoryType",
      name: "Category",
      icon: <SportCategoryIcon />,
      status: status.values.categoryType,
    },
    {
      id: "location",
      name: "Location",
      icon: <LocationIcon />,
      status: status.values.location,
    },
    {
      id: "date",
      name: "Date",
      icon: <EventCalendar />,
      status: status.values.date,
    },
  ];
  const totalSteps = numSteps.length;

  // Calculate the width of each stepper item dynamically
  const stepperItemWidth = `${100 / totalSteps}%`;

  // create a list of objects that includes the form fields
  // e.g, [{id:sportType, status:formik.values.sportType}, {id:categoryType, status:formik.values.sportType}]
  // this list we will add to numSteps

  return (
    <ol
      className={classNames(
        "flex",
        "items-center",
        "w-full",
        "text-xs",
        "text-gray-900",
        "font-medium",
        "sm:text-base"
      )}
    >
      {numSteps.map((stepItem, stepItemId) => (
        <li
          key={stepItem?.id}
          className={classNames("flex", "relative", "text-indigo-600", {
            "after:content-['']": stepItemId !== numSteps.length - 1,
            "after:w-full": stepItemId !== numSteps.length - 1,
            "after:h-0.5": stepItemId !== numSteps.length - 1,
            "after:bg-[#bfbfbf]": stepItemId !== numSteps.length - 1,
            "after:inline-block": stepItemId !== numSteps.length - 1,
            "after:absolute": stepItemId !== numSteps.length - 1,
            "lg:after:top-5": stepItemId !== numSteps.length - 1,
            ":after:top-[12px]": stepItemId !== numSteps.length - 1,
            // if formik.values[stepItem?id] let the color for this stepper change to green
          })}
          style={{ width: stepperItemWidth }} // Set the width dynamically
        >
          <div className="block whitespace-nowrap z-10">
            <span
              className="w-6 h-6 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10"
              style={{
                background: stepItem?.status ? "#033f63" : "#bfbfbf",
              }}
            >
              {stepItem.icon}
            </span>{" "}
          </div>
        </li>
      ))}
      {/* <pre>{JSON.stringify(status, null, 4)}</pre> */}
    </ol>
  );
};

export default StepperComponent;
