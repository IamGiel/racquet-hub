import { Dialog, Transition } from "@headlessui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./filter.module.css";
import { InputDropdownFilter } from "../../component/Form/InputDropdownFilter";

export const Filter = ({ close, data }: any) => {
  const [open, setOpen] = useState(true);
  const [mainOption, setMainOption] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    console.log("data passed when modal opened ", data);
    return () => {
      // close({ selectedOption, selectedCategory, selectedStatus });
    };
  }, [selectedCountry, selectedCategory, selectedStatus]);

  const handleMainOptionsChange = (option: any) => {
    console.log("handled main option ", option);
    setMainOption(option.value);
  };
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    console.log("handle status change ", value, checked);
    setSelectedStatus((prevSelectedStatus: any) => {
      if (checked) {
        return [...prevSelectedStatus, value];
      } else {
        return prevSelectedStatus.filter((status: any) => status !== value);
      }
    });
  };

  const handleCloseFilter = () => {
    // console.log("added DAta in dialog ", addedData);
    setOpen(false);
    close({
      selectedCategory,
      selectedStatus,
      selectedCountry,
      mainOption,
    });
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseFilter}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div
                  className="flex min-h-full flex-1 flex-col justify-center p-[12px]"
                  style={{ background: "#fff", minWidth: "840px" }}
                >
                  <div
                    className={
                      styles.headerSection + " headerSection first-col"
                    }
                  >
                    <span
                      className={styles.headerTitleFont + " headerTitleFont"}
                    >
                      Filters
                    </span>
                  </div>
                  <div
                    className={styles.bodySection + " headerSection first-col"}
                  >
                    {/* main options */}
                    <div className={styles.tableView + " tableView"}>
                      <div className={styles.sectionTitle + " sectionTitle"}>
                        Table View
                      </div>

                      <div className={styles.radioOption + " radio-group"}>
                        {data?.mainOptions?.map((option: any) => (
                          <label
                            key={option.value}
                            className={styles.radioItem + " radioOption"}
                          >
                            <input
                              type="radio"
                              name="option"
                              value={option.value}
                              checked={mainOption === option.value}
                              onChange={() => handleMainOptionsChange(option)}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    {/* all other options */}
                    <div className={styles.allOthersView + " allOthersView"}>
                      <div className={styles.sectionTitle + " sectionTitle"}>
                        All Other Filters
                      </div>
                      <div
                        className={
                          styles.columnSectionForAllFilters +
                          " columnSectionForAllFilters"
                        }
                      >
                        <div
                          className={
                            styles.threeFilterColumn + " threeFilterColumn"
                          }
                        >
                          <div
                            className={styles.columnFilterA + " columnFilterA"}
                          >
                            <div
                              className={styles.filterLabelA + " filterLabelA"}
                            >
                              Status
                            </div>
                            <div
                              className={
                                styles.statusCheckBox + " statusCheckbox"
                              }
                            >
                              {data?.statusOptions?.map((option: any) => (
                                <div
                                  className={
                                    styles.statusCheckboxItem +
                                    " statusCheckboxItem"
                                  }
                                >
                                  <label
                                    key={option.value}
                                    className={styles.checkboxOption}
                                  >
                                    <input
                                      className={styles.statusCheckBoxItem}
                                      type="checkbox"
                                      value={option.value}
                                      checked={selectedStatus?.includes(
                                        option.value
                                      )}
                                      onChange={handleStatusChange}
                                    />
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className={styles.dropdowns + " dropdowns"}>
                            <InputDropdownFilter
                              label="search a category"
                              setState={(val) => {
                                console.log("selected in filter ", val);
                                setSelectedCategory(val);
                              }}
                              state={selectedCategory ?? "Search a category"}
                              placeholder={
                                selectedCategory ?? "Search a category"
                              }
                              listProp={data?.categories}
                            />
                          </div>
                          <div className={styles.dropdowns + " dropdowns"}>
                            <InputDropdownFilter
                              label="search a country"
                              setState={(val) => {
                                console.log("selected in filter ", val);
                                setSelectedCountry(val);
                              }}
                              state={selectedCountry ?? "Search a country"}
                              placeholder={
                                selectedCountry ?? "Search a country"
                              }
                              listProp={data?.countries}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.footerSection}>
                    <button type="button" className={styles.cancelBtn}>
                      Clear Filters
                    </button>
                    <button type="button" className={styles.cancelBtn}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.applyBtn}
                      onClick={(event) => {
                        event.preventDefault();
                        handleCloseFilter();
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
