
/* This is the component of account page and will mount in that */
'use client'

import { candidateOnBoardFromControls, getUserLimit, initialCandidateAccountFormData, initialRecruiterFormData, recruiterOnBoardFormControls} from "@/utils"

import { useEffect, useState } from "react"
import Commonform from "../common-form"
import { updateProfile, uploadResumeAction } from "@/actions"
import { toast } from "sonner"

export default function AccountInfo({ profileInfo, jobApplications }) {

    // Maintaining state of Initial formdata of Candidate and Recruiter
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateAccountFormData)
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)

    const [resumeLoading, setResumeLoading] = useState(false)

    useEffect(() => {
        if (profileInfo?.role === 'recruiter') {
            setRecruiterFormData(profileInfo?.recruiterInfo)
        }
        if (profileInfo?.role === 'candidate') {
            setCandidateFormData(profileInfo?.candidateInfo)
        }
    }, [profileInfo])


    // Upload Resume
    async function handleResumeUpload(event) {
        const file = event.target.files?.[0]
        if (!file) return
        try {
            setResumeLoading(true)
            const response = await uploadResumeAction(file)
            if (response?.success) {
                setCandidateFormData({
                    ...candidateFormData,
                    resume: response?.resumeURL
                })

                toast.success("Resume uploaded successfully 🎉", {
                    style: {
                        fontSize: "18px",
                        padding: "16px 24px",
                        minWidth: "300px",
                    },
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to upload resume")
        } finally {
            setResumeLoading(false)
        }
    }


    // Updating Account
    async function handleUpdateAccount() {
        await updateProfile(
            profileInfo?.role === 'candidate'
                ? {
                    _id: profileInfo?._id,
                    userId: profileInfo?.userId,
                    role: profileInfo?.role,
                    email: profileInfo?.email,
                    isPremiumUser: profileInfo?.isPremiumUser,
                    memberShipType: profileInfo?.memberShipType,
                    memberShipStartDate: profileInfo?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.memberShipEndDate,

                    candidateInfo: {
                        ...candidateFormData,
                        resume: candidateFormData?.resume
                    }
                }
                : {
                    _id: profileInfo?._id,
                    userId: profileInfo?.userId,
                    role: profileInfo?.role,
                    email: profileInfo?.email,
                    isPremiumUser: profileInfo?.isPremiumUser,
                    memberShipType: profileInfo?.memberShipType,
                    memberShipStartDate: profileInfo?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.memberShipEndDate,

                    recruiterInfo: {
                        ...recruiterFormData,
                    }
                },

            '/account'
        )

        toast.success("Changes Saved Successfully 👍", {
            style: {
                fontSize: "18px",
                padding: "16px 24px",
                minWidth: "300px",
            },
        })
    }


    // User Limit Logic
    const limit = profileInfo?.memberShipType
        ? getUserLimit(profileInfo)
        : 10

    const remaining = limit === Infinity ? "Unlimited" : Math.max(limit - jobApplications.length, 0)


    return (
        <div className="mx-auto min-h-screen bg-[#f8fafc]">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Account Details
                </h1>

                {
                    profileInfo?.role === 'candidate' && (
                        <p className="text-gray-600 mt-2">
                            Remaining Free Limit:
                            <span className="ml-1 font-semibold text-indigo-600">
                                {remaining}
                            </span>
                        </p>
                    )
                }
            </div>

            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    {
                        profileInfo?.role === 'candidate' && (
                            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Resume
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            View or update your uploaded resume
                                        </p>
                                    </div>

                                    {
                                        candidateFormData?.resume && (
                                            <a
                                                href={candidateFormData?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition">
                                                View Resume
                                            </a>
                                        )
                                    }
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="cursor-pointer px-4 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 transition">
                                        {
                                            resumeLoading
                                                ? "Uploading..."
                                                : "Upload New Resume"
                                        }
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={handleResumeUpload}
                                        />
                                    </label>
                                </div>
                            </div>
                        )
                    }

                    <Commonform
                        action={handleUpdateAccount}
                        formControls={
                            profileInfo?.role === 'candidate'
                                ? candidateOnBoardFromControls.filter(
                                    formControl => formControl.name !== "resume"
                                )
                                : recruiterOnBoardFormControls
                        }

                        formData={
                            profileInfo?.role === 'candidate'
                                ? candidateFormData
                                : recruiterFormData
                        }

                        setFormData={
                            profileInfo?.role === 'candidate'
                                ? setCandidateFormData
                                : setRecruiterFormData
                        }
                        buttonText='Update Profile'
                    />
                </div>
            </div>
        </div>
    )
}