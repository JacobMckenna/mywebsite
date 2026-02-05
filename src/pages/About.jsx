// src/pages/About.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DotBackground from "../components/layout/DotBackground";
import { MdOutlineEmail, MdPhoneEnabled } from "react-icons/md";
import { FaLinkedinIn, FaGithub  } from "react-icons/fa6";


export default function About() {
  return (
    <DotBackground>
      <Header />

      <main className="w-full max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <section className="flex flex-col gap-12">

          {/* ---------- INTRO ---------- */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8 sm:pr-[320px]">

            <img
              src={process.env.PUBLIC_URL + "/about-figure.png"}
              alt="Jacob illustration"
              className="pointer-events-none select-none absolute bottom-0 right-0 w-[250px] lg:w-[280px]"
            />

            <div className="mt-5 space-y-4 max-w-2xl">

              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                About Me
              </p>

              <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                  Hello there! I'm Jacob.
                </span>
              </h1>

              {/* Paragraphs */}
              <div className="mt-5 space-y-4 max-w-3xl">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-4 border-l border-slate-700/50">
                I build full-stack applications with a strong focus on UI polish and reliability. 
                I enjoy collaborating on features and taking ownership of them from planning through deployment 
                while keeping code clear and maintainable.

                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-4 border-l border-slate-700/50">
                Outside of coding, I spend time climbing, hanging out with my girlfriend and friends, and occasionally playing video games. 
                Some of my other hobbies include baseball, D&D, and video creation.
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-4 border-l border-slate-700/50">
                  At the end of the day, I care about building things that feel genuinely enjoyable to use. 
                  Seeing people interact with something I created is incredibly rewarding.
                </p>
              </div>
            </div>
          </div>



          {/* ---------- INTERESTS GRID ---------- */}
          <div className="mt-2 sm:mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-5 sm:mb-6">
              Outside of code<span className="text-slate-500">…</span>
            </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">

              {/* Cats Section */}
              <div className="rounded-2xl border border-slate-700/40 bg-slate-900/25 p-5 shadow-lg">

              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Scoot */}
                <div className="group relative overflow-hidden rounded-xl">
                  <img
                    src={process.env.PUBLIC_URL + "/cats1.jpg"}
                    alt="Scoot"
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      Scoot
                    </span>
                  </div>
                </div>

                {/* Ms Clara */}
                <div className="group relative overflow-hidden rounded-xl">
                  <img
                    src={process.env.PUBLIC_URL + "/cats2.jpg"}
                    alt="Ms Clara"
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      Ms. Clara
                    </span>
                  </div>
                </div>

              </div>

              <h3 className="font-semibold text-white mt-5">My cats</h3>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Scoot and Ms. Clara are such adorable cats. 
                Their unique personalities always keep my day entertaining and comforting.
              </p>

              </div>


              {/* Star Wars */}
              <div className="rounded-2xl border border-slate-700/40 bg-slate-900/25 overflow-hidden shadow-lg">

              <div className="group relative overflow-hidden">
                <img
                  src={process.env.PUBLIC_URL + "/starwars.jpg"}
                  alt="Star Wars"
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4 text-center">
                  <span className="text-white font-semibold text-lg tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    Darth Maul's Lightsaber in Lego!
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-white">Star Wars fan</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  I grew up watching Star Wars with my family, and it's easily my favourite series. 
                  Episode III: Revenge of the Sith is still my top pick.
                </p>
              </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">

              {/* Climbing */}
              <div className="rounded-2xl border border-slate-700/40 bg-slate-900/25 overflow-hidden shadow-lg">

              <div className="group relative overflow-hidden">
                <img
                  src={process.env.PUBLIC_URL + "/climbing.jpg"}
                  alt="Climbing"
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4 text-center">
                  <span className="text-white font-semibold text-lg tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    This move is called a "Knee Bar"
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-white">Climbing</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Climbing is my favourite way to unplug from screens. 
                  It feels like solving a puzzle with my whole body, and it keeps me thinking, experimenting, and pushing through challenges.
                </p>
              </div>
              </div>


              {/* Reflection Card */}
              <div className="rounded-2xl border border-slate-700/40 bg-slate-900/25 p-5">
                <h3 className="font-semibold text-white">Why hobbies matter to my work</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                I enjoy activities that reward persistence and creativity. 
                This mindset carries into my software development, where I like experimenting, 
                refining ideas, and rethinking solutions when they do not feel right.
                </p>
              </div>

            </div>
          </div>
          </div>

          {/* ---------- CONTACT ---------- */}
          <div className="rounded-3xl border border-slate-700/40 bg-slate-900/25 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
  
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">

              {/* LEFT SIDE TEXT */}
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Let's talk</h2>

                <p className="text-muted-foreground max-w-lg leading-relaxed">
                  If you want to talk about internships, projects, or anything related to development or GIS, feel free to reach out. I'd love to chat.
                </p>
              </div>

              {/* RIGHT SIDE CONTACT STACK */}
              <div className="flex flex-col gap-3 min-w-[260px] pl-6 border-l border-slate-700/50">

                {/* Email */}
                <a
                  href="mailto:jrjmckenna@outlook.com"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold
                            bg-gradient-to-r from-blue-600 to-blue-500 text-white
                            hover:from-blue-500 hover:to-blue-600
                            shadow-lg shadow-blue-500/25 transition-all"
                >
                  <MdOutlineEmail size={24} /> jrjmckenna@outlook.com
                </a>

                {/* Phone */}
                <a
                  href="tel:+15192223891"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl
                            border border-slate-700 bg-slate-800/40 text-slate-200
                            hover:bg-slate-700/60 transition-all"
                >
                  <MdPhoneEnabled size={24} className="text-red-500"/> +1 (519) 222-3891
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jrjmckenna/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl
                            border border-slate-700 bg-slate-800/40 text-slate-200
                            hover:bg-slate-700/60 transition-all"
                >
                  <FaLinkedinIn size={24} className="text-blue-400"/> LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/JacobMckenna"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl
                            border border-slate-700 bg-slate-800/40 text-slate-200
                            hover:bg-slate-700/60 transition-all"
                >
                  <FaGithub size={24}/> GitHub
                </a>

              </div>
            </div>
          </div>



        </section>
      </main>

      <Footer />
    </DotBackground>
  );
}
