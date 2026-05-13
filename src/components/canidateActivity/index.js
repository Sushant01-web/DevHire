/* This is a component where activities of candidate will diaplay and will mount to acitivities page */
'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../jobIcon"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

export default function CandidateActivities({ jobListOfCandidate, jobApplication }) {

    console.log('jobListOfCandidate', jobListOfCandidate)
    console.log('jobApplication', jobApplication)

    // Creating a state to manage view details of jobs
    const [openJobDetailsDialog, setOpenJobDetailsDialog] = useState(false)
    const [selectedJobDetails, setSelectedJobDetails] = useState(null)


    // Getting Status Of application
    const uniqueStatusArray = [...new Set(jobApplication?.map(jobApplicationItem => jobApplicationItem.status).flat(1))]


    // Creating a function to open job details
    const handleOpenJobDetails = (jobListOfCandidate) => {

        setSelectedJobDetails(jobListOfCandidate)

        setOpenJobDetailsDialog(true)
    }


    return (
        <div className="mx-auto min-h-screen bg-[#f8fafc]">
            <Tabs defaultValue="Applied" className='w-full'>
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">My Activites</h1>
                    <TabsList className='flex gap-5'>
                        {
                            uniqueStatusArray.map(status => <TabsTrigger key={status} value={status}>{status}</TabsTrigger>)
                        }
                    </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">

                            {/* Listing Jobs as per Applied, Selected and Rejected as per respective tabs , in Easy words
                            “त्या jobs ला select कर ज्यांचं:
                            application आहे
                            आणि त्या application चा status current tab सारखा आहे” */}
                            {uniqueStatusArray.map((status) => (
                                <TabsContent value={status} className='flex flex-col gap-10'>
                                    {
                                        jobListOfCandidate.filter((jobItem) => jobApplication.filter(
                                            (jobApplicants) => jobApplicants.status.indexOf(status) > -1
                                        ).findIndex(
                                            (filteredItemByStatus) =>
                                                jobItem._id === filteredItemByStatus.jobId
                                        ) > -1
                                        ).map(finalFiltereditem => <CommonCard
                                            icon={<JobIcon />}
                                            title={finalFiltereditem?.title}
                                            desscription={finalFiltereditem?.companyName}
                                            jobAppliedAt={new Date().toLocaleDateString()}
                                            footerContent={
                                                <Button
                                                    onClick={() => handleOpenJobDetails(finalFiltereditem)}
                                                    className='flex h-11 items-center justify-center px-5 cursor-pointer'
                                                >
                                                    View Details
                                                </Button>
                                            } />
                                        )
                                    }
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </div>
            </Tabs>

            {/* Dialog Box for showing job details */}
            <Dialog
                open={openJobDetailsDialog}
                onOpenChange={setOpenJobDetailsDialog}
            >

                <DialogContent className="sm:max-w-[700px] rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Job Details
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-2">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {selectedJobDetails?.title}
                            </h2>
                            <p className="text-lg text-indigo-600 font-medium mt-1">
                                {selectedJobDetails?.companyName}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="border rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Location
                                </p>
                                <p className="font-semibold text-lg">
                                    {selectedJobDetails?.jobLocation || "N/A"}
                                </p>
                            </div>

                            <div className="border rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Experience
                                </p>

                                <p className="font-semibold text-lg">
                                    {selectedJobDetails?.experience || "N/A"}
                                </p>
                            </div>

                            <div className="border rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Salary
                                </p>

                                <p className="font-semibold text-lg">
                                    {selectedJobDetails?.salary || "N/A"}
                                </p>
                            </div>

                            <div className="border rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Job Type
                                </p>

                                <p className="font-semibold text-lg">
                                    {selectedJobDetails?.type || "Full Time"}
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-xl p-5">
                            <p className="text-sm text-gray-500 mb-2">
                                Skills Required
                            </p>

                            <p className="font-medium text-gray-800 leading-7">
                                {selectedJobDetails?.skills || "N/A"}
                            </p>
                        </div>

                        <div className="border rounded-xl p-5">
                            <p className="text-sm text-gray-500 mb-2">
                                Job Description
                            </p>
                            <p className="text-gray-700 leading-7">
                                {
                                    selectedJobDetails?.description
                                    || "No description available"
                                }
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


