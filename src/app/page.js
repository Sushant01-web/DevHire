
/* As in this project we are using Clerk -->> There are several hooks
through which we can deal with our user
User ---> Whether user is authenticated or not
User profile ---> Whether user is candidate or recruiter
*/

import { fetchProfileAction } from "@/actions";
import HomepageButtonControls from "@/components/homepageButtonControls";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-100 pb-20">

        {/* Background Blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pt-10">

          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">

            {/* LEFT SIDE */}
            <section className="w-full lg:w-1/2">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

                <span className="text-sm font-medium text-gray-700">
                  10,000+ Jobs Available
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-4xl lg:text-7xl font-extrabold leading-tight text-gray-900">
                Find Your
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}Dream Job
                </span>
                <br />
                Build Your Future
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Connect with top recruiters, discover premium opportunities,
                and grow your professional career with DevHire.
                Your next opportunity starts here.
              </p>

              {/* Buttons */}
              {user && (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <HomepageButtonControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">

                <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-5 border border-white hover:scale-105 transition">
                  <h2 className="text-3xl font-bold text-blue-600">15K+</h2>

                  <p className="text-gray-600 mt-1 text-sm">
                    Active Jobs
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-5 border border-white hover:scale-105 transition">
                  <h2 className="text-3xl font-bold text-indigo-600">8K+</h2>

                  <p className="text-gray-600 mt-1 text-sm">
                    Companies
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-5 border border-white hover:scale-105 transition">
                  <h2 className="text-3xl font-bold text-pink-600">20K+</h2>

                  <p className="text-gray-600 mt-1 text-sm">
                    Candidates
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT SIDE */}
            <section className="relative w-full lg:w-1/2 flex justify-center items-center">

              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
                  alt="Interview"
                  className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
                />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute top-0 left-0 bg-white shadow-2xl rounded-2xl p-4 w-52 animate-bounce border border-gray-100 hidden lg:block">

                <img
                  src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
                  alt="Team"
                  className="rounded-xl mb-3"
                />

                <h3 className="font-semibold text-gray-800">
                  Team Collaboration
                </h3>

                <p className="text-sm text-gray-500">
                  Work with innovative companies
                </p>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-0 right-0 bg-white shadow-2xl rounded-2xl p-4 w-56 border border-gray-100 hidden lg:block">

                <img
                  src="https://img.freepik.com/free-vector/hiring-concept-illustration_114360-2787.jpg"
                  alt="Hiring"
                  className="rounded-xl mb-3"
                />

                <h3 className="font-semibold text-gray-800">
                  Hiring Made Easy
                </h3>

                <p className="text-sm text-gray-500">
                  Recruiters meet talented developers
                </p>
              </div>
            </section>
          </div>

          {/* TRUSTED COMPANIES */}
          <div className="mt-24">

            <p className="text-center text-gray-500 uppercase tracking-widest text-sm mb-8">
              Trusted by top companies
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">

              <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center hover:scale-105 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
                  alt="Discord"
                  className="h-12 object-contain"
                />
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center hover:scale-105 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
                  alt="Microsoft"
                  className="h-12 object-contain"
                />
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center hover:scale-105 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5969/5969204.png"
                  alt="Amazon"
                  className="h-12 object-contain"
                />
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center hover:scale-105 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                  alt="Google"
                  className="h-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-linear-to-r from-slate-900 via-gray-900 to-black text-white py-14 px-6 lg:px-16 border-t border-gray-800">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              DevHire
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed text-sm">
              Your all-in-one career platform to connect candidates and recruiters.
              Discover opportunities, build connections, and grow your professional journey.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 transition flex items-center justify-center"
              >
                <FaInstagram className="text-white text-lg" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 transition flex items-center justify-center"
              >
                <FaTwitter className="text-white text-lg" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 transition flex items-center justify-center"
              >
                <FaLinkedinIn className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/jobs" className="hover:text-white transition">
                  Find Jobs
                </a>
              </li>

              <li>
                <a href="/feed" className="hover:text-white transition">
                  Community Feed
                </a>
              </li>

              <li>
                <a href="/membership" className="hover:text-white transition">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Candidate Section */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              For Candidates
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white transition cursor-pointer">
                Browse Jobs
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Upload Resume
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Career Tips
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Interview Preparation
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              Get the latest job opportunities and hiring updates directly in your inbox.
            </p>

            <div className="flex flex-col gap-3">

              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500 text-sm"
              />

              <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition py-3 rounded-lg font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>
            © 2026 DevHire. All rights reserved
          </p>

          <p className="hover:text-white transition">
            Developed and Maintained by Sushant Gaikwad
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}