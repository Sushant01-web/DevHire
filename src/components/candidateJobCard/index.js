// /* Here we are creating job card for candidate and this will mount in job/index.js */
// 'use client'

// import { Fragment, useState } from "react"
// import CommonCard from "../common-card"
// import { Button } from "../ui/button"
// import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
// import { CreateJobApplication } from "@/actions"
// import JobIcon from "../jobIcon"
// import { toast } from "sonner"

// export default function CandidateJobCard({ jobItem, profileInfo, jobApplication }) {

//     // Maintaining state for opening drawer
//     const [showDrawer, setShowDrawer] = useState(false)


//     // Writing Function to apply job
//     const handleApplyJob = async () => {
//         try {
//             await CreateJobApplication({
//                 recruiterUserId: jobItem?.recruiterId,
//                 name: profileInfo?.candidateInfo?.name,
//                 email: profileInfo?.email,
//                 candidateUserId: profileInfo?.userId,
//                 status: ['Applied'],
//                 jobId: jobItem?._id,
//                 jobAppliedDate: new Date().toLocaleDateString(),
//             }, '/jobs');

//             setShowDrawer(false);
//             toast.success("Job Applied Successfully 🎉", {
//                 style: {
//                     fontSize: "18px",
//                     padding: "16px 24px",
//                     minWidth: "300px",
//                 },
//             })

//         } catch (error) {
//             console.error(error);

//             alert(error?.message || "Something went wrong");
//         }
//     };

//     // Writing function to close drawer
//     const handleCancel = () => {
//         setShowDrawer(false)
//     }

//     return (
//         <Fragment>
//             <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
//                 <CommonCard
//                     icon={<JobIcon />}
//                     title={jobItem?.title}
//                     desscription={jobItem?.companyName}
//                     experience={jobItem?.experience}
//                     footerContent={
//                         <DrawerTrigger asChild>
//                             <Button className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
//                                 View Details
//                             </Button>
//                         </DrawerTrigger>
//                     }
//                 />
//                 <DrawerContent className="w-full max-w-7xl mx-auto rounded-t-2xl bg-white p-0 max-h-[90vh] overflow-y-auto">

//                     {/* Header */}
//                     <DrawerHeader className="px-4 md:px-6 py-5 border-b bg-gray-50">
//                         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//                             <DrawerTitle className="text-xl md:text-3xl font-bold leading-tight">
//                                 {jobItem?.title}
//                             </DrawerTitle>

//                             <div className="flex flex-wrap gap-3">
//                                 <Button
//                                     onClick={handleApplyJob}
//                                     className="disabled:opacity-65 h-10 px-5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
//                                     disabled={jobApplication.findIndex(item => item.jobId === jobItem?._id) > -1}>
//                                     {
//                                         jobApplication.findIndex(item => item.jobId === jobItem?._id) > -1
//                                             ? 'Applied'
//                                             : 'Apply'
//                                     }
//                                 </Button>

//                                 <Button
//                                     onClick={handleCancel}
//                                     variant="outline"
//                                     className="h-10 px-5 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                                 >
//                                     Cancel
//                                 </Button>
//                             </div>
//                         </div>
//                     </DrawerHeader>

//                     {/* Body */}
//                     <div className="px-4 md:px-6 py-5 space-y-5">
//                         <DrawerDescription className="text-sm md:text-lg text-gray-800 leading-relaxed">
//                             {jobItem?.description}
//                         </DrawerDescription>

//                         <div className="flex flex-wrap items-center gap-4 text-gray-800">

//                             <h3 className="flex items-center gap-1 text-lg md:text-2xl font-semibold wrap-break-word">
//                                 📍 {jobItem?.jobLocation}
//                             </h3>

//                             {jobItem?.companyName && (
//                                 <span className="flex items-center gap-1 text-lg md:text-2xl font-semibold wrap-break-word">
//                                     🏢 {jobItem.companyName}
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 text-gray-800">
//                             {jobItem?.jobType && (
//                                 <span className="flex items-center gap-1 text-base md:text-xl wrap-break-word">
//                                     Job Type - {jobItem.jobType}
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 text-gray-800">
//                             {jobItem?.skills && (
//                                 <span className="flex items-center gap-1 text-base md:text-xl wrap-break-word">
//                                     Skills - {jobItem.skills}
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 text-gray-800">
//                             {jobItem?.experience && (
//                                 <span className="flex items-center gap-1 text-base md:text-xl wrap-break-word">
//                                     Experience - {jobItem.experience}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 </DrawerContent>
//             </Drawer>
//         </Fragment>
//     )
// }


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

    // Checking if already applied
    const isAlreadyApplied = jobApplication.findIndex(item => item.jobId === jobItem?._id) > -1

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
            }, '/jobs')

            setShowDrawer(false)
            toast.success("Job Applied Successfully 🎉", {
                style: {
                    fontSize: "18px",
                    padding: "16px 24px",
                    minWidth: "300px",
                },
            })
        } catch (error) {
            console.error(error)
            alert(error?.message || "Something went wrong")
        }
    }

    // Writing function to close drawer
    const handleCancel = () => {
        setShowDrawer(false)
    }

    return (
        <Fragment>
            <Drawer
                open={showDrawer}
                onOpenChange={setShowDrawer}
            >

                {/* Job Card */}
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    desscription={jobItem?.companyName}
                    experience={jobItem?.experience}
                    footerContent={
                        <DrawerTrigger asChild>
                            <Button className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition w-full sm:w-auto">
                                View Details
                            </Button>
                        </DrawerTrigger>
                    }/>

                {/* Drawer */}
                <DrawerContent className="w-full max-w-6xl mx-auto rounded-t-2xl bg-white p-0 overflow-hidden max-h-[90vh] md:max-h-fit">

                    {/* Scroll only on mobile */}
                    <div className="overflow-y-auto max-h-[90vh] md:max-h-fit md:overflow-visible">

                        {/* Header */}
                        <DrawerHeader className="px-4 md:px-6 py-5 border-b bg-gray-50">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                {/* Title */}
                                <DrawerTitle className="text-xl md:text-3xl font-bold leading-tight break-words">
                                    {jobItem?.title}
                                </DrawerTitle>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <Button
                                        onClick={handleApplyJob}
                                        disabled={isAlreadyApplied}
                                        className="disabled:opacity-65 h-10 px-5 rounded-lg bg-black text-white hover:bg-gray-800 transition w-full sm:w-auto">
                                        {
                                            isAlreadyApplied
                                                ? 'Applied'
                                                : 'Apply'
                                        }
                                    </Button>

                                    <Button
                                        onClick={handleCancel}
                                        variant="outline"
                                        className="h-10 px-5 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </DrawerHeader>

                        {/* Body */}
                        <div className="px-4 md:px-6 py-5 space-y-6">

                            {/* Description */}
                            <DrawerDescription
                                className="text-sm md:text-lg text-gray-800 leading-relaxed break-words">
                                {jobItem?.description}
                            </DrawerDescription>

                            {/* Location + Company */}
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 text-gray-800">
                                <h3 className="flex items-center gap-2 text-lg md:text-2xl font-semibold break-words">
                                    📍 {jobItem?.jobLocation}
                                </h3>
                                {
                                    jobItem?.companyName && (
                                        <span className="flex items-center gap-2 text-lg md:text-2xl font-semibold break-words">
                                            🏢 {jobItem.companyName}
                                        </span>
                                    )
                                }
                            </div>

                            {/* Job Type */}
                            {
                                jobItem?.jobType && (
                                    <div className="border rounded-xl p-4 bg-gray-50">
                                        <p className=" text-sm text-gray-500 mb-1">Job Type</p>

                                        <p className="text-base md:text-lg font-medium text-gray-800 break-words">
                                            {jobItem?.jobType}
                                        </p>
                                    </div>
                                )
                            }

                            {/* Skills */}
                            {
                                jobItem?.skills && (
                                <div className="border rounded-xl p-4 bg-gray-50">
                                        <p className="text-sm text-gray-500 mb-1">
                                            Skills Required
                                        </p>

                                        <p className="text-base md:text-lg font-medium text-gray-800 break-words leading-7">
                                            {jobItem?.skills}
                                        </p>
                                    </div>
                                )
                            }

                            {/* Experience */}
                            {
                                jobItem?.experience && (
                                    <div className="border rounded-xl p-4 bg-gray-50">
                                        <p className="text-sm text-gray-500 mb-1">
                                            Experience
                                        </p>

                                        <p className="text-base md:text-lg font-medium text-gray-800 break-words">
                                            {jobItem?.experience}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}