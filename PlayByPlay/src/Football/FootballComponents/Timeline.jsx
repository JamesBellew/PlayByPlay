import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

const Timeline = () => {
  const rightArrow = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 inline-block ">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    );
  };
  return (
    <>
      <ol class="relative mb-5  p-4 text-left border-l border-gray-200 dark:border-gray-700">
        <h1 className="ml-4 text-xl">Timeline</h1>
        <li class="mb-10 ml-4">
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border 
          border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Move 1 (2 seconds)
          </time>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <div className="inline-block mr-2 bg-green-500 text-center rounded-full h-7 w-7 ">
              3
            </div>
            to Col 1 Row 2
          </h3>
          <h3 class="text-lg mt-2 font-semibold text-gray-900 dark:text-white">
            <div className="inline-block mr-2 bg-green-500 text-center rounded-full h-7 w-7 ">
              4
            </div>
            to Col 1 Row 2
          </h3>
        </li>
        <li class="mb-10 ml-4 inline">
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border 
          border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Move 1 (2 seconds)
          </time>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <div className="inline-block mr-2 bg-green-500 text-center rounded-full h-7 w-7 ">
              3
            </div>
            to Col 1 Row 2
          </h3>
          <h3 class="text-lg mt-2 font-semibold text-gray-900 dark:text-white">
            <div className="inline-block mr-2 bg-green-500 text-center rounded-full h-7 w-7 ">
              4
            </div>
            to Col 1 Row 2
          </h3>
        </li>
      </ol>
    </>
  );
};

export default Timeline;
