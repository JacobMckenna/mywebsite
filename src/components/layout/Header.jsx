import React from "react";
import { NavLink } from "react-router-dom";

function Header() {

  const baseButton =
    "px-4 py-2.5 font-semibold text-sm rounded-xl border transition-all shadow-lg active:translate-y-0.5";

  const inactiveButton =
    "border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 hover:border-slate-600";

  const activeButton =
    "border-blue-500 bg-blue-600/20 text-white shadow-blue-500/20";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-gradient-to-b from-[#0b0c10] to-[#0f1117] border-b border-slate-800/50">

      {/* LEFT — Name / Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-lg sm:text-xl font-bold tracking-tight px-4 py-2 rounded-xl transition-all ${
            isActive
              ? "text-white"
              : "text-slate-200 hover:text-white"
          }`
        }
      >
        Jacob McKenna
      </NavLink>

      {/* RIGHT — Navigation */}
      <nav className="flex items-center gap-3">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseButton} ${isActive ? activeButton : inactiveButton}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${baseButton} ${isActive ? activeButton : inactiveButton}`
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseButton} ${isActive ? activeButton : inactiveButton}`
          }
        >
          About
        </NavLink>

      </nav>
    </header>
  );
}

export default Header;
