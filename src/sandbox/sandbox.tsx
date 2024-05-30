import React, { useEffect, useState } from "react";
import styles from "./sandbox.module.css";
import { ComponentA } from "./subcomponents/componentA";
import { ComponentB } from "./subcomponents/componentB";
import dummyjson from './dummy.json'
export const Sandbox = () => {
  // this entry component pulls data, gets the list
  useEffect(() => {
    fetchData();
  }, []);

  // create state for the list
  const [listItems, setListItems] = useState<any>(null)

  const fetchData = () => {
    // return promise of a dummy array
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyjson)
        setListItems(dummyjson)
      }, 1800);
    });
  };

  return (
    <div className={styles.sandboxContainer + ` sandboxContainer`}>
      <div className={styles.componentAB + " componentA"}>
        {/* pass the list to component a */}
        {/* <pre>{JSON.stringify(listItems)}</pre> */}
        <ComponentA componentName="Component A" data={listItems}/>
      </div>
      <div className={styles.componentAB + " componentA"}>
        <ComponentB componentName="Component B" />
      </div>
    </div>
  );
};
