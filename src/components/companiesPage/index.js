
/* This page will mount to Company Page containing UI */
"use client";

import { useRouter } from "next/navigation";
import JobIcon from "../jobIcon";
import { Button } from "../ui/button";


export default function Companies({ jobList }) {
    const router = useRouter();

    // Creating unique set of company names
    const uniqueSetOfCompanies = [...new Set(jobList.filter((jobItem) =>
                        jobItem?.companyName &&
                        jobItem.companyName.trim() !== ""
                ).map((item) => item.companyName)
        ),
    ];

    // Go To Company Jobs
    function handleGoesToCompanyJob(getCompanyName) {sessionStorage.setItem("filterParams",
            JSON.stringify({companyName: [getCompanyName],})
        );

        router.push("/jobs");
    }

    return (
        <div className="w-full min-h-screen bg-[#f8fafc]">
            {/* TOP SECTION */}
            <div className="pt-20 pb-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-gray-200 pb-8">
                    {/* LEFT */}
                    <div>
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-[3px]">
                            Companies
                        </span>
                        <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
                            Browse Companies
                        </h1>

                        <p className="mt-4 text-gray-600 text-lg max-w-2xl leading-8">
                            Explore companies hiring on DevHire and
                            discover opportunities that match your skills.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-8">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-600">
                                {uniqueSetOfCompanies?.length || 0}+
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Companies
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-indigo-600">
                                {jobList?.length || 0}+
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Jobs Posted
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPANY LIST */}
            <div className="pb-20">
                {
                    uniqueSetOfCompanies &&
                        uniqueSetOfCompanies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                uniqueSetOfCompanies.map((companyName, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">
                                        {/* Top Gradient Line */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"/>

                                        {/* Background Blur */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>

                                        {/* Company Icon */}
                                        <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                            <JobIcon />
                                        </div>

                                        {/* Company Info */}
                                        <div className="relative mt-6">
                                            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-all duration-300">
                                                {companyName}
                                            </h2>
                                            <p className="text-gray-500 mt-2 leading-7">
                                                Explore opportunities and discover
                                                jobs posted by this company on DevHire.
                                            </p>
                                        </div>

                                        {/* Bottom */}
                                        <div className="relative mt-8 flex items-center justify-between">
                                            {/* Small Tag */}
                                            <span className="text-xs font-semibold uppercase tracking-[2px] text-blue-600 bg-blue-50 px-3 py-2 rounded-full">
                                                Hiring Active
                                            </span>

                                            {/* Button */}
                                            <Button
                                                onClick={() =>
                                                    handleGoesToCompanyJob(companyName)
                                                }
                                                className=" h-11 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                                                See Jobs
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    ) : (
                        <div className="flex flex-col items-center justify-center py-24">
                            <img
                                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
                                alt="No Companies"
                                className="w-72 mb-8"
                            />

                            <h2 className="text-3xl font-bold text-gray-900">
                                No Companies Found
                            </h2>

                            <p className="text-gray-500 mt-3 text-center">
                                Companies will appear here once recruiters start posting jobs.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}