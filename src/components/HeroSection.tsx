"use client";
import React from "react";
import Monster from "./Monster";

export default function Example() {
  return (
    <div className="">
      <header className=" z-50 ">
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
            <a
              href="https://github.com/ThibSara/monster-opera"
              className="text-sm/6 font-semibold text-gray-900"
            >
              {" "}
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </nav>
      </header>
      <div className="min-h-[calc(100vh-70px)]  relative isolate flex flex-col justify-center px-8 lg:px-12">
        {/* Monsters Section */}
        <div className="flex flex-row justify-center justify-between items-center space-x-6">
          <Monster
            primaryColor="#CBDABA"
            secondaryColor="#99B99B"
            tertiaryColor="#88B398"
            name="light-blue"
          />
          <Monster
            primaryColor="#C3ACE7"
            secondaryColor="#9198EE"
            tertiaryColor="#6C72D2"
            name="green"
          />
          <Monster
            primaryColor="#EFC3B5"
            secondaryColor="#F19DD3"
            tertiaryColor="#E875C3"
            name="purple"
          />
        </div>

        {/* Announcement Section */}
        <div className="mt-16 flex justify-center flex-col items-center space-y-4">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Have fun making your own music !{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
