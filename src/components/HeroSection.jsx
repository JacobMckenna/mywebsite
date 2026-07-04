import React, { useRef, useState } from "react";
import config from "../config/config.json";
import {
  IoLocationSharp,
  IoSchoolSharp,
  IoLogoGithub,
  IoLogoLinkedin,
  IoSchoolOutline,
  IoDownloadOutline,
} from "react-icons/io5";

export default function HeroSection({ tech }) {
  const [easter, setEaster] = useState(false);
  const holdTimer = useRef(null);
  const holdTriggered = useRef(false);

  const triggerEaster = () => {
    if (holdTriggered.current) {
      holdTriggered.current = false;
      return;
    }

    setEaster(true);
    setTimeout(() => setEaster(false), 500);
  };

  const startHold = () => {
    clearTimeout(holdTimer.current);
    holdTriggered.current = false;

    holdTimer.current = setTimeout(() => {
      holdTriggered.current = true;
      window.location.href = "/dnd/home";
    }, 1500);
  };

  const cancelHold = () => {
    clearTimeout(holdTimer.current);
  };

  return (
    <>
      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start w-full min-w-0 relative">
        {/* Hero Image */}
        <div className="relative group">
          <div
            role="button"
            tabIndex={0}

            onClick={triggerEaster}

            onPointerDown={(e) => {
              e.preventDefault();
              startHold();
            }}

            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            onPointerCancel={cancelHold}

            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}

            className={`
              w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56
              rounded-3xl
              border border-white/10
              shadow-3xl
              cursor-pointer
              transition-all duration-300
              group-hover:scale-105 group-hover:shadow-blue-500/30
              select-none bg-cover bg-center bg-no-repeat
              ${easter ? "animate-[heroWiggle_600ms_ease]" : ""}
            `}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + "/portraits/profile.jpg"})`,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
              touchAction: "manipulation",
              pointerEvents: "auto",
            }}
          />
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="min-w-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent leading-[1.05] tracking-tight mb-3">
              Jacob McKenna
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Software developer specializing in interactive full-stack apps, real-time data systems,
              and geospatial decision tools.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm sm:text-base text-slate-400">
            <p className="flex items-center gap-2">
              <IoSchoolSharp className="text-blue-400 shrink-0" size={18} />
              Bachelor of Computing (Honours) · Computer Science
            </p>

            <p className="flex items-center gap-2">
              <IoSchoolOutline className="text-blue-400 shrink-0" size={18} />
              Minor in Applied Geomatics
            </p>

            <p className="flex items-center gap-2">
              <IoLocationSharp className="text-blue-400 shrink-0" size={18} />
              University of Guelph · Ontario, Canada
            </p>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tech.slice(0, 9).map((t) => (
              <span
                key={t}
                className="text-xs sm:text-sm px-3 py-1 rounded-full border border-slate-700/60 bg-slate-900/25 text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 items-center w-full mt-6">
        <a
          className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-white
                     bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all
                     shadow-lg shadow-blue-500/25 active:scale-[0.98]"
          href="/projects"
        >
          View Projects
        </a>

        <a
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base
                     border border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700/50 transition-all active:scale-[0.98]"
          href={process.env.PUBLIC_URL + config.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <IoDownloadOutline size={20} /> Resume
        </a>

        <a
          className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base
                     border border-slate-700 text-slate-200 hover:bg-slate-800/30 transition-all active:scale-[0.98]"
          href="/about"
        >
          Contact
        </a>

        <a
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-200
                     hover:bg-slate-700/50 transition-all active:scale-[0.98]"
          href={config.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <IoLogoGithub size={20} /> GitHub
        </a>

        <a
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-200
                     hover:bg-slate-700/50 transition-all active:scale-[0.98]"
          href={config.linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          <IoLogoLinkedin size={20} /> LinkedIn
        </a>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes heroWiggle {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
          75% { transform: rotate(-2deg); }
        }

        @keyframes fadeToast {
          0% { opacity: 0; transform: translateY(-8px); }
          10% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}