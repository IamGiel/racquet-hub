import React from "react";

const DotLoader: React.FC = () => {
  return (
    <div className="flex space-x-1 justify-start items-center bg-white dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-[#677586] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-[#677586] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-[#677586] rounded-full animate-bounce"></div>
    </div>
  );
};

export default DotLoader;
