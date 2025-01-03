import React from "react";
// import { Link } from "react-router-dom";

const AppBar: React.FC = () => {
  return (
    <div className="w-screen h-12 bg-slate-200 shadow">
      <div className="flex items-center h-full">
        <div className="grow" />
        <div className="text-lg font-bold">
          <span>Dailyish</span>
          <span className="text-orange-700">.</span>
          <span className="text-blue-600">io</span>
        </div>
        <div className="text-lg pl-2.5 text-gray-600">
          <span>a blog from</span>
          <span className="font-semibold pl-1.5">Ben Ryder</span>
        </div>
        <div className="grow" />
      </div>
    </div>
  );
};

export default AppBar;
