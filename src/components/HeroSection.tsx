"use client";
import React from "react";
import Monster from "./Monster";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function Example() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-8 lg:px-12"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Monster Opera</span>
              <p className="text-black text-xl font-semibold">Monster Opera</p>
            </a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Github <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="relative isolate min-h-screen flex flex-col justify-center px-8 lg:px-12 mt-12">
        {/* Monsters Section */}
        <div className="flex flex-row justify-center justify-between items-center space-x-6">
          <Monster />
          <Monster />
          <Monster />
        </div>

        {/* Announcement Section */}
        <div className="mt-12 flex justify-center flex-col items-center space-y-4">
          <PlayIcon className="w-12 h-12 text-gray-400" />
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Make your music and share it with your friends.{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
