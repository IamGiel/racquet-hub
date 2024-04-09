import classNames from "classnames";
import { ClockIcon } from "../../assets/svgs/ClockIcon";
import { RacketSportIcon } from "../../assets/svgs/RacketSportIcon";
import { SportCategoryIcon } from "../../assets/svgs/SportCategoryIcon";
import { EventCalendar } from "../../assets/svgs/EventCalendar";
import { LocationIcon } from "../../assets/svgs/Location";

const StepperComponent = () => {
  // const numSteps = ["Sport", "Cate", "Date", "Time"];
  const numSteps = [
    { name: "Sport", icon: <RacketSportIcon /> },
    { name: "Location", icon: <LocationIcon /> },
    { name: "Category", icon: <SportCategoryIcon /> },
    { name: "Date", icon: <EventCalendar /> },
    { name: "Time", icon: <ClockIcon /> },
  ];
  const totalSteps = numSteps.length;

  // Calculate the width of each stepper item dynamically
  const stepperItemWidth = `${100 / totalSteps}%`;

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
          key={stepItemId}
          className={classNames("flex", "relative", "text-indigo-600", {
            "after:content-['']": stepItemId !== numSteps.length - 1,
            "after:w-full": stepItemId !== numSteps.length - 1,
            "after:h-0.5": stepItemId !== numSteps.length - 1,
            "after:bg-[#bfbfbf]": stepItemId !== numSteps.length - 1,
            "after:inline-block": stepItemId !== numSteps.length - 1,
            "after:absolute": stepItemId !== numSteps.length - 1,
            "lg:after:top-5": stepItemId !== numSteps.length - 1,
          })}
          style={{ width: stepperItemWidth }} // Set the width dynamically
        >
          <div className="block whitespace-nowrap z-10">
            <span
              className="w-6 h-6 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10"
              style={{ background: "#bfbfbf" }}
            >
              {stepItem.icon}
            </span>{" "}
            {/* {stepItem} */}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default StepperComponent;
