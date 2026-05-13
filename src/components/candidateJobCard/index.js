/* Here we are creating job card for candidate and this will mount in job/index.js */
'use client'

import { Fragment, useState } from "react"
import CommonCard from "../common-card"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { CreateJobApplication } from "@/actions"
import JobIcon from "../jobIcon"
import { toast } from "sonner"

export default function CandidateJobCard({ jobItem, profileInfo, jobApplication }) {

    // Maintaining state for opening drawer
    const [showDrawer, setShowDrawer] = useState(false)


    // Writing Function to apply job
    const handleApplyJob = async () => {
        try {
            await CreateJobApplication({
                recruiterUserId: jobItem?.recruiterId,
                name: profileInfo?.candidateInfo?.name,
                email: profileInfo?.email,
                candidateUserId: profileInfo?.userId,
                status: ['Applied'],
                jobId: jobItem?._id,
                jobAppliedDate: new Date().toLocaleDateString(),
            }, '/jobs');

            setShowDrawer(false);
            toast.success("Job Applied Successfully 🎉", {
                style: {
                    fontSize: "18px",
                    padding: "16px 24px",
                    minWidth: "300px",
                },
            })

        } catch (error) {
            console.error(error);

            alert(error?.message || "Something went wrong");
        }
    };

    // Writing function to close drawer
    const handleCancel = () => {
        setShowDrawer(false)
    }

    return (
        <Fragment>
            <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    desscription={jobItem?.companyName}
                    experience={jobItem?.experience}
                    footerContent={
                        <DrawerTrigger asChild>
                            <Button className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
                                View Details
                            </Button>
                        </DrawerTrigger>
                    }
                />

                <DrawerContent className="w-full max-w-7xl mx-auto rounded-t-2xl p-0 overflow-hidden bg-white">

                    {/* Header */}
                    <DrawerHeader className="px-6 py-5 border-b bg-gray-50">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            {/* Title */}
                            <DrawerTitle className="text-2xl md:text-3xl font-bold leading-tight">
                                {jobItem?.title}
                            </DrawerTitle>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleApplyJob}
                                    className="disabled:opacity-65 h-10 px-5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                                    disabled={jobApplication.findIndex(item => item.jobId === jobItem?._id) > -1 ? true : false}>
                                    {
                                        jobApplication.findIndex(item => item.jobId === jobItem?._id) > -1 ? 'Applied' : 'Apply'
                                    }
                                </Button>

                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="h-10 px-5 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </DrawerHeader>

                    {/* Body */}
                    <div className="px-6 py-6 space-y-5">

                        {/* Description */}
                        <DrawerDescription className="text-base md:text-lg text-gray-800 leading-relaxed">
                            {jobItem?.description}
                        </DrawerDescription>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">

                            <h3 className="flex items-center gap-1 text-2xl font-semibold">
                                📍 {jobItem?.jobLocation}
                            </h3>

                            {/* Optional extras (add if available) */}
                            {jobItem?.companyName && (
                                <span className="flex items-center gap-1 text-2xl font-semibold">
                                    🏢 {jobItem.companyName}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
                            {jobItem?.jobType && (
                                <span className="flex items-center gap-1 text-xl">
                                    Job Type - {jobItem.jobType}
                                </span>
                            )}

                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
                            {jobItem?.skills && (
                                <span className="flex items-center gap-1 text-xl">
                                    Skills - {jobItem.skills}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
                            {jobItem?.experience && (
                                <span className="flex items-center gap-1 text-xl">
                                    Experience - {jobItem.experience}
                                </span>
                            )}
                        </div>

                    </div>

                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}