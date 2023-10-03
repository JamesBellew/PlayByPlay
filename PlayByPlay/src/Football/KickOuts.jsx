import React, { useState, useEffect } from "react";
const KickOuts = () => {
  return (
    <div class="flex flex-col bg-green-500 relative gap-4 h-[90vh]">
      <div class="flex-grow flex flex-col">
        <div class="flex-grow bg-purple-600 grid grid-cols-10">
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>

        <div class="flex-grow bg-blue-600">Full back</div>
        <div class="flex-grow bg-yellow-600">In Between full / Half</div>
        <div class="flex-grow bg-gray-600">half</div>
      </div>

      <div class="bg-purple-600 h-1/6">Midfield</div>

      <div class="flex-grow flex flex-col">
        <div class="flex-grow bg-pink-600">in between</div>
        <div class="flex-grow bg-orange-600">Half Forward</div>
        <div class="flex-grow bg-black">Full forward</div>
      </div>
    </div>
  );
};

export default KickOuts;
