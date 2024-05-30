import React from "react";

/*
This component should be able to accept different types of filter items 
that will filter the component that requires it.

It should be able to take props of array of items that a component with 
list needs it to filter.

For example this list 

const items = [
  {"name":"Josh", "age":10, "role":"student"},
  {"name":"Mike", "age":28, "role":"teacher"},
  {"name":"Josh", "age":9, "role":"student"},
  {"name":"Josh", "age":38, "role":"principal"}
]

The filter items will be "name", "age", and "role" for this example.

In this Filter component (ie ComponentB), it will offer user view dropdown of the filters
and allow multiple select of the filter.  Once selected, it will communicate to the component
that filters that were selected and apply the filters on the view.

Another functionality is to allow the user to have a slider.  In this case, "age" is a type
number, and therefore, a scale is relevant.  For example, a user can filter ages between 
7 - 15 and the slider allows that to be applied on the component that invoked this 
filter component.
*/

export const ComponentB = ({componentName = ''}) => {
  return (
    <div className="inline-flex flex-col flex-shrink-0 justify-between items-start h-[auto]">
      <div className="flex flex-col items-start gap-5 p-6 w-[100%] rounded-lg bg-[#eef0f5]">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="self-stretch text-[#222429] font-['Inter'] text-lg font-medium leading-6">
            {componentName}
          </div>
          <div className="w-[576px] text-[#878ea5] font-['Inter'] text-sm leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus praesentium tenetur pariatur.
          </div>
        </div>
        <div className="button flex justify-center items-center pt-[0.5625rem] pb-[0.5625rem] pl-[1.0625rem] pr-[1.0625rem] rounded-md border border-[#cbd1e2] bg-white text-[#444752] font-['Inter'] text-sm font-medium leading-5">
          Contact sales
        </div>
      </div>
    </div>
  );
};
