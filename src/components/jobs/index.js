
/* This is component of jobs page for Candidate */
"use client";

import { filterMenuData, formURLQuery } from "@/utils";

import CandidateJobCard from "../candidateJobCard";
import PostNewJob from "../postJob";
import RecruiterJobCard from "../recruiterJobCard";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger,} from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, BriefcaseBusiness, Building2, Users,} from "lucide-react";

export default function JobComponent({ profileInfo, jobList, jobApplication, fetchFilterCategories,}) {

  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();

  // Using for Rediret
  const router = useRouter();

  // Handle Filters
  function handleFilter(getSectionId, getCurrentOption) {
    let copyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(copyFilterParams).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {

      copyFilterParams = {
        ...copyFilterParams,
        [getSectionId]: [getCurrentOption],
      };

    } else {
      const indexOfCurrentOption = copyFilterParams[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        copyFilterParams[getSectionId].push(getCurrentOption);
      } else {
        copyFilterParams[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilterParams(copyFilterParams);
    // Setting filters to session storage
    sessionStorage.setItem(
      "filterParams",
      JSON.stringify(copyFilterParams)
    );
  }

  // Filter Menus
  const filterMenu = filterMenuData.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(fetchFilterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  // Restore Filters
  useEffect(() => {
    const stored = sessionStorage.getItem("filterParams");
    if (stored) {
      setFilterParams(JSON.parse(stored));
    }
  }, []);

  // Push Filters to URL
  useEffect(() => {
    if (!filterParams || Object.keys(filterParams).length === 0) return;
    const url = formURLQuery({
      params: searchParams.toString(),
      dataToAdd: filterParams,
    });

    if (url !== window.location.search) {
      router.push(url, { scroll: false });
    }
  }, [filterParams]);

  return (
    <div className="w-full">

      {/* TOP SECTION */}
      <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-[32px] p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />

              <span className="text-sm font-medium text-blue-700">
                Find Opportunities Faster
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {
                profileInfo?.role === "candidate"
                  ? "Explore All Jobs"
                  : "Manage Your Jobs Dashboard"
              }
            </h1>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-lg max-w-2xl leading-relaxed">
              {
                profileInfo?.role === "candidate"
                  ? "Discover premium opportunities from top companies and apply with ease."
                  : "Track job postings, applications, and hiring activities from one place."
              }
            </p>

            {/* PoST JOB */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
              {
                profileInfo?.role !== "candidate" && (
                  <PostNewJob
                    profileInfo={profileInfo}
                    jobList={jobList}
                  />
                )
              }
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
              <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
                <BriefcaseBusiness className="text-blue-600 mb-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  {jobList?.length || 0}+
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Available Jobs
                </p>
              </div>

              <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
                <Building2 className="text-indigo-600 mb-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  10+
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Companies
                </p>
              </div>

              <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
                <Users className="text-pink-600 mb-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  200+
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Candidates
                </p>
              </div>

              <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
                <Sparkles className="text-yellow-500 mb-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  98%
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full lg:w-[420px] flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/job-hunt-concept-illustration_114360-427.jpg"
              alt="Jobs"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-5 left-5 bg-white shadow-2xl rounded-2xl p-4 hidden lg:flex items-center gap-4 border border-gray-100">

              <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <BriefcaseBusiness />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  New Opportunities
                </h3>

                <p className="text-sm text-gray-500">
                  Updated daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      {
        profileInfo?.role === "candidate" && (
          <div className="mt-8 bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-5">
            <div className="flex flex-wrap items-center gap-4">
              {
                filterMenu.map((filterItem) => (
                  <Menubar
                    key={filterItem.id}
                    className="border-none bg-transparent p-0"
                  >
                    <MenubarMenu>
                      <MenubarTrigger className="bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none rounded-xl px-5 py-3 hover:scale-105 transition shadow-lg cursor-pointer">
                        {filterItem.name}
                      </MenubarTrigger>
                      <MenubarContent className="rounded-2xl shadow-2xl border border-gray-100 p-3">
                        {
                          filterItem.options.map((option, optionIndx) => (
                            <MenubarItem
                              key={optionIndx}
                              className="flex items-center py-3 rounded-xl hover:bg-blue-50 cursor-pointer transition"
                              onClick={() =>
                                handleFilter(filterItem.id, option)
                              }
                            >
                              <div
                                className={`h-5 w-5 rounded-md border-2 border-blue-600
                                ${
                                  filterParams &&
                                  Object.keys(filterParams).length > 0 &&
                                  filterParams[filterItem.id] &&
                                  filterParams[filterItem.id].indexOf(option) > -1
                                    ? "bg-blue-600"
                                    : "bg-white"
                                }`}
                              />
                              <Label className="ml-3 cursor-pointer text-sm font-medium text-gray-700">
                                {option}
                              </Label>
                            </MenubarItem>
                          ))
                        }
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ))
              }
            </div>
          </div>
        )
      }

      {/* JOB LIST */}
      <div className="mt-10">
        {
          jobList && jobList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {
                jobList.map((jobItem) =>
                  profileInfo?.role === "candidate" ? (
                    <div
                      key={jobItem._id}
                      className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    >
                      {/* Top Gradient */}
                      <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                      <div className="p-1">
                        <CandidateJobCard
                          jobApplication={jobApplication}
                          jobItem={jobItem}
                          profileInfo={profileInfo}
                        />
                      </div>
                    </div>

                  ) : (

                    <div
                      key={jobItem._id}
                      className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    >

                      <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                      <div className="p-1">
                        <RecruiterJobCard
                          jobApplication={jobApplication}
                          jobItem={jobItem}
                          profileInfo={profileInfo}
                        />
                      </div>
                    </div>
                  )
                )
              }
            </div>

          ) : (

            <div className="flex flex-col items-center justify-center py-24">

              <img
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
                alt="No Jobs"
                className="w-80 mb-8"
              />

              <h2 className="text-3xl font-bold text-gray-900">
                No Jobs Found
              </h2>

              <p className="text-gray-500 mt-3 text-center max-w-md">
                Try changing filters or search terms to discover more opportunities.
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}