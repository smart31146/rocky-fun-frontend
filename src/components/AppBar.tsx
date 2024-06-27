"use client";

import React from "react";

import WalletButton from "@components/WalletButton";

export const AppBar: React.FC = () => (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex h-20 items-center justify-end pr-4 flex-row md:mb-2 shadow-lg bg-[#1b1d28] text-neutral-content border-b border-zinc-600 bg-opacity-66">
        <div className="navbar-end">
          <div className=" md:inline-flex align-items-center justify-items gap-6">
            <WalletButton />
          </div>
        </div>
      </div>
    </div>
  );
