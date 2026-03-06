import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const holdTimer = useRef(null);
  const holdTriggered = useRef(false);

  const baseButton =
    "flex-1 text-center px-2 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-xl border transition-all shadow-lg active:translate-y-0.5 whitespace-nowrap";

  const inactiveButton =
    "border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 hover:border-slate-600";

  const activeButton =
    "border-blue-500 bg-blue-600/20 text-white shadow-blue-500/20";

  const startHold = () => {
    clearTimeout(holdTimer.current);
    holdTriggered.current = false;

    holdTimer.current = setTimeout(() => {
      holdTriggered.current = true;
      navigate("/dnd");
    }, 1500);
  };

  const cancelHold = () => {
    clearTimeout(holdTimer.current);
  };

  const handleNameClick = (e) => {
    if (holdTriggered.current) {
      e.preventDefault();
      holdTriggered.current = false;
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-gradient-to-b from-[#0b0c10] to-[#0f1117] border-b border-slate-800/50">
      {/* LEFT — Name / Home */}
      <NavLink
        to="/"
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        onTouchCancel={cancelHold}
        onClick={handleNameClick}
        className={({ isActive }) =>
          `text-lg sm:text-xl font-bold tracking-tight px-4 py-2 rounded-xl transition-all ${
            isActive ? "text-white" : "text-slate-200 hover:text-white"
          }`
        }
      >
        Jacob McKenna
      </NavLink>

      {/* RIGHT — Navigation */}
      <nav className="flex gap-2 px-2 w-full max-w-md">
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