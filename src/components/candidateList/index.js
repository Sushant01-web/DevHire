/* Here we get all apllicants means candidate for applies job... this component will mount in job applicant component */
'use client'

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { fetchCandidateDetails, updateJobApplication } from "@/actions";

export default function CandidateList({ currentCandidateDetails, setCurrentCandidateDetails, jobApplication, showCurrentCandidateModel, setShowCurrentCandidateModel }) {

    // Function to opening current candidate profile model
    const handleCurrentCandidateProfile = async (candidateUserId) => {
        const data = await fetchCandidateDetails(candidateUserId)
        console.log(data)

        if (data) {
            setCurrentCandidateDetails(data)
            setShowCurrentCandidateModel(true)
        }
    }


    // Function to preview candidate's resume in different tab
    const handlePreviewResume = () => {
        const resumeUrl = currentCandidateDetails?.candidateInfo?.resume;

        console.log(resumeUrl)

        const a = document.createElement('a')
        a.href = resumeUrl;
        a.setAttribute('target', '_blank')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    };


    // Creating function to select Candidate
    async function handleUpdateJobStatus(getCurrentStatus) {
        let copyJobApplication = [...jobApplication]
        const indexOfCurrentJobApplication = copyJobApplication.findIndex((item) => item.candidateUserId === currentCandidateDetails?.userId)

        const jobApplicationToUpdate = {
            ...copyJobApplication[indexOfCurrentJobApplication], status: copyJobApplication[indexOfCurrentJobApplication].status.concat(getCurrentStatus)
        }
        console.log("jobApplicationToUpdate", jobApplicationToUpdate)
        await updateJobApplication(jobApplicationToUpdate, '/jobs')
    }


    return <Fragment>
        <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
            {
                jobApplication && jobApplication.length > 0 ?
                    jobApplication.map(jobItem => <div key={jobItem._id} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                        <div className="px-4 my-6 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{jobItem?.name}</h3>
                            <Button onClick={() => handleCurrentCandidateProfile(jobItem.candidateUserId)} className='flex h-11 items-center justify-center px-5'>View Profile</Button>
                        </div>
                    </div>)
                    : null
            }

            {/* Creating a Dialog to show candidate details   */}
            <Dialog
                open={showCurrentCandidateModel}
                onOpenChange={() => {
                    setCurrentCandidateDetails(null);
                    setShowCurrentCandidateModel(false);
                }}
            >
                <DialogContent className="max-w-3xl w-full h-[70vh] rounded-2xl p-0 overflow-hidden shadow-2xl">
                    <div className="bg-white h-full flex flex-col">
                        {/* Header */}
                        <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white p-6">
                            <h1 className="text-2xl font-semibold">{currentCandidateDetails?.candidateInfo?.name}</h1>
                            <p className="text-lg opacity-90">{currentCandidateDetails?.candidateInfo?.currentJobLocation}</p>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5 overflow-y-auto flex-1">
                            {/* Email */}
                            <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-800 text-xl">{currentCandidateDetails?.email}</p>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-6 text-lg">
                                <div>
                                    <p className="text-gray-500">Company</p>
                                    <p className="font-medium">{currentCandidateDetails?.candidateInfo?.currentCompany}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Experience</p>
                                    <p className="font-medium">{currentCandidateDetails?.candidateInfo?.totalExperience}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Salary</p>
                                    <p className="font-medium">₹ {currentCandidateDetails?.candidateInfo?.currentSalary} LPA</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Notice Period</p>
                                    <p className="font-medium">{currentCandidateDetails?.candidateInfo?.noticePeriod} Days</p>
                                </div>

                            </div>

                            {/* Skills */}
                            <div className="text-lg">
                                <p className="text-gray-500 mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {currentCandidateDetails?.candidateInfo?.skills
                                        ?.split(',')
                                        ?.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
                            <Button
                                onClick={handlePreviewResume}
                                className="h-10 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition">
                                Resume
                            </Button>

                            <Button
                                onClick={() => handleUpdateJobStatus("Selected")}
                                className="disabled:opacity-60 h-10 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                                disabled={
                                    jobApplication
                                        .find(
                                            (item) =>
                                                item.candidateUserId === currentCandidateDetails?.userId
                                        )
                                        ?.status?.includes("Selected") ||
                                        jobApplication
                                            .find(
                                                (item) =>
                                                    item.candidateUserId === currentCandidateDetails?.userId
                                            )
                                            ?.status?.includes("Rejected")
                                        ? true
                                        : false
                                }>
                                {
                                    jobApplication.find((item) => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes('Selected') ? "Selected" : "Select"
                                }
                            </Button>

                            <Button
                                onClick={() => handleUpdateJobStatus('Rejected')}
                                className="h-10 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                                disabled={
                                    jobApplication
                                        .find(
                                            (item) =>
                                                item.candidateUserId === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes("Selected") ||
                                        jobApplication
                                            .find(
                                                (item) =>
                                                    item.candidateUserId === currentCandidateDetails?.userId
                                            )
                                            ?.status?.includes("Rejected")
                                        ? true
                                        : false
                                }>
                                {jobApplication
                                    .find(
                                        (item) =>
                                            item.candidateUserId === currentCandidateDetails?.userId
                                    )
                                    ?.status?.includes("Rejected")
                                    ? "Rejected"
                                    : "Reject"}
                            </Button>

                        </div>

                    </div>

                </DialogContent>
            </Dialog>
        </div>
    </Fragment>
}