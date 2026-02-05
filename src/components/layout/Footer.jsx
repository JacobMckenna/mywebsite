import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";

function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-gradient-to-b from-[#0b0c10] to-[#0f1117] px-6 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3">

        {/* Email */}
        <div className="relative group">
          <a
            href="mailto:jrjmckenna@outlook.com"
            aria-label="Email"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 p-2.5 text-slate-200 shadow-lg transition-all hover:border-slate-600 hover:bg-slate-700/80 active:translate-y-0.5"
          >
            <MdEmail size={20} />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
            Email Me
          </span>
        </div>

        {/* LinkedIn */}
        <div className="relative group">
          <a
            href="https://www.linkedin.com/in/jrjmckenna/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 p-2.5 text-slate-200 shadow-lg transition-all hover:border-slate-600 hover:bg-slate-700/80 active:translate-y-0.5"
          >
            <FaLinkedinIn size={20} />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
            View LinkedIn
          </span>
        </div>

        {/* GitHub */}
        <div className="relative group">
          <a
            href="https://github.com/JacobMckenna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 p-2.5 text-slate-200 shadow-lg transition-all hover:border-slate-600 hover:bg-slate-700/80 active:translate-y-0.5"
          >
            <TbBrandGithubFilled size={20} />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
            View GitHub
          </span>
        </div>

      </div>

      <div className="mt-4 text-center text-xs text-slate-500">
        Jacob McKenna • {new Date().getFullYear()} 
      </div>
    </footer>
  );
}

export default Footer;
