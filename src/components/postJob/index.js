/* This is a component of posting new job and 
We will mount this component into job component */
'use client'

import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import Commonform from "../common-form"
import { getUserLimit, initialNewJobFormData, postNewJobFormControls } from "@/utils"
import { postNewJobAction } from "@/actions"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import Link from "next/link"

export default function PostNewJob({ profileInfo, jobList }) {

    const { user } = useUser();

    // Creating state to manage Dialog Box
    const [showJobDialog, setShowJobDialog] = useState(false)


    // Creating Formdata state
    const [jobFromData, setJobFormData] = useState(initialNewJobFormData)


    // Function for Adding new job and checking if all inputs are filled
    const isPostNewJobValid = useMemo(() => {
        return Object.keys(jobFromData).every(
            (key) => jobFromData[key].trim() !== ""
        );
    }, [jobFromData]);

    // Creating function to handle create job action
    async function createNewJob() {
        try {
            await postNewJobAction({
                ...jobFromData,
                recruiterId: user?.id,
                applicant: []
            }, '/jobs');

            setJobFormData(initialNewJobFormData);
            setShowJobDialog(false);
            toast.success("Job Posted Successfully 🎉", {
                style: {
                    fontSize: "18px",
                    padding: "16px 24px",
                    minWidth: "300px",
                },
                action : <Link href={'/membership'}>Choose Membership</Link>
            });
        } catch (error) {
            console.error(error); // 👈 shows limit error

            // ✅ Show alert when limit exceeded
            alert(error?.message || "Something went wrong");
        }
    }


    // Shows Remaining Jobs Limit
    const limit = profileInfo?.memberShipType
        ? getUserLimit(profileInfo)
        : 10; // ✅ free user limit

    const remaining =
        limit === Infinity
            ? "Unlimited"
            : Math.max(limit - jobList.length, 0); // ✅ no negative

    return (
        <div>
            <Button onClick={() => setShowJobDialog(true)} className='disabled:opacity-60 flex h-11 items-center justify-center px-5'>
                Post A Job
            </Button>
            <p className="text-sm text-gray-500">
                Remaining Job Posts: {remaining}
            </p>
            <Dialog
                open={showJobDialog}
                onOpenChange={(open) => {
                    setShowJobDialog(open);

                    if (!open) {
                        setJobFormData(initialNewJobFormData);
                    }
                }}
            >
                <DialogContent className="max-w-lg w-full rounded-2xl p-0 overflow-auto">

                    <DialogHeader className="px-6 py-4 border-b bg-gray-50">
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            Post New Job
                        </DialogTitle>
                    </DialogHeader>

                    {/* Scrollable area */}
                    <div className="max-h-[70vh] overflow-y-auto px-6 py-6 custom-scroll">
                        <Commonform
                            buttonText={"Add"}
                            formControls={postNewJobFormControls}
                            formData={jobFromData}
                            setFormData={setJobFormData}
                            isBtnDisabled={!isPostNewJobValid}
                            action={createNewJob}
                        />
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}