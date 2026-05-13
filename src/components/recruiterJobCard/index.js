/* This is a card of recruiter's job which will render in job/index.js */
'use client'

import { useState } from "react";
import CommonCard from "../common-card"
import { Button } from "../ui/button";
import JobApplicants from "../jobApplicants";
import JobIcon from "../jobIcon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { deleteJob } from "@/actions";
import { toast } from "sonner";

export default function RecruiterJobCard({ jobItem, jobApplication }) {


  // Creating state to manage Drawer opening after clicking on Applicants button
  const [showDrawer, setShowDrawer] = useState(false)
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null)
  const [showCurrentCandidateModel, setShowCurrentCandidateModel] = useState(false)
  const [showCurrentJobDetails, setShowCurrentJobDetails] = useState(false)

  // Function to open Drawer
  const handleDrawer = () => {
    setShowDrawer(true)
  }


  // Function to see job details
  const handleViewJobDetails = () => {
    setShowCurrentJobDetails(true)
  }


  // Function to delete job
  const handleDeleteJob = async() =>{
    const response = await deleteJob(
      jobItem?._id,
      jobItem?.recruiterId,
      '/jobs'
    )

    if(response?.success){
      toast.success(response?.message)
    }else{
      toast.error(response?.message)
    }
  }

  return (
    <div>
      <CommonCard
        icon={
          <JobIcon />
        }
        title={jobItem?.title}
        desscription={jobItem?.companyName}
        footerContent={
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              onClick={handleDrawer} className='disabled:opacity-60 flex h-11 items-center justify-center px-5 cursor-pointer'
              disabled={jobApplication.filter(item => item.jobId === jobItem?._id).length === 0}>
              {
                jobApplication.filter(item => item.jobId === jobItem?._id).length
              }{" "}Applicants
            </Button>

            <Button
              onClick={handleViewJobDetails}
              className='flex h-11 items-center justify-center px-5 cursor-pointer'>
              View Details
            </Button>

            <Button 
              onClick={handleDeleteJob}
              className='flex h-11 items-center justify-center px-5 cursor-pointer' 
              variant="destructive">
              Delete
            </Button>
          </div>

        }
      />

      {/* Rendering the description of job after recruiter clicks on view details */}
      <Dialog
        open={showCurrentJobDetails}
        onOpenChange={setShowCurrentJobDetails}
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
                {jobItem?.title}
              </h2>

              <p className="text-lg text-indigo-600 font-medium mt-1">
                {jobItem?.companyName}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="font-semibold text-lg">
                  {jobItem?.jobLocation || "N/A"}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Experience
                </p>

                <p className="font-semibold text-lg">
                  {jobItem?.experience || "N/A"}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Salary
                </p>

                <p className="font-semibold text-lg">
                  {jobItem?.salary || "N/A"}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Applicants
                </p>

                <p className="font-semibold text-lg">
                  {
                    jobApplication.filter(
                      item => item.jobId === jobItem?._id
                    ).length
                  }
                </p>
              </div>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">
                Skills Required
              </p>

              <p className="font-medium text-gray-800 leading-7">
                {jobItem?.skills || "N/A"}
              </p>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500 mb-2">
                Job Description
              </p>

              <p className="text-gray-700 leading-7">
                {jobItem?.description || "No description available"}
              </p>

            </div>

          </div>

        </DialogContent>

      </Dialog>

      <JobApplicants
        jobItem={jobItem}
        jobApplication={jobApplication.filter(item => item.jobId === jobItem?._id)}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateModel={showCurrentCandidateModel}
        setShowCurrentCandidateModel={setShowCurrentCandidateModel}
      />
    </div>
  );
}