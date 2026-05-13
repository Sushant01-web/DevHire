/* This is component of Onboard page */
'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import Commonform from "../common-form";
import { candidateOnBoardFromControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils";
import { createProfileAction, saveCandidateProfile, uploadResumeAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";


export default function OnboardComponent() {

    // Creating state to check with selected tabs
    const [currentTab, setCurrentTab] = useState('candidate')
    function handleTabChange(value) {
        setCurrentTab(value)
    }

    // Maintenaning states of Candidate and Recruiter's Formdata
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)


    // Maintenaing a state while uploading candidate resume to cloudinary
    const [file, setFile] = useState(null)
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    // Function to Check Recruiter details are empty, if yes then disabled button from submitting
    const isRecruiterFormInvalid =
        !recruiterFormData?.name?.trim() ||
        !recruiterFormData?.companyName?.trim() ||
        !recruiterFormData?.companyRole?.trim()


    // Function to check candidate details are empty, If yes disabled button from submmitng
    const isCandidateFromValid = useMemo(() => {
        return Object.keys(candidateFormData).every(
            (key) => candidateFormData[key].trim() !== ""
        );
    }, [candidateFormData]);


    // Getting current authenticated user from clerk using hooks
    const currentAuthenticatedUser = useUser()
    const { user } = currentAuthenticatedUser


    // Creating functio to create Profile
    async function createProfile() {
        try {
            let resumeUrl = "";

            // 👇 Upload file if exists
            if (file) {
                const uploaded = await uploadResumeAction(file);
                resumeUrl = uploaded.secure_url; // Cloudinary URL
            }


            const data =
                currentTab === "candidate"
                    ? {
                        candidateInfo: {
                            ...candidateFormData,
                            resume: resumeUrl, // ✅ attach here
                        },
                        role: "candidate",
                        isPremiumUser: false,
                        userId: user?.id,
                        email: user?.primaryEmailAddress?.emailAddress,
                    }
                    : {
                        recruiterInfo: recruiterFormData,
                        role: "recruiter",
                        isPremiumUser: false,
                        userId: user?.id,
                        email: user?.primaryEmailAddress?.emailAddress,
                    };

            await createProfileAction(data, "/onboard");

            toast.success("Onboarding successful 🎉", {
                style: {
                    fontSize: "18px",
                    padding: "16px 24px",
                    minWidth: "300px",
                },
            });
        } catch (error) {
            console.error(error);

            // ❌ SHOW ERROR TOAST
            toast.error("Something went wrong while onboarding");
        }
    }

    console.log('Candidate', candidateFormData)


    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800">Welcome To Onboarding</h1>
                        <TabsList className='p-2'>
                            <TabsTrigger className="px-6 py-3 text-lg font-semibold" value='candidate'>Candidate</TabsTrigger>
                            <TabsTrigger className="px-6 py-3 text-lg font-semibold" value='recruiter'>Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                {/* Content of Candidate */}
                <TabsContent value='candidate'>
                    <Commonform
                        formControls={candidateOnBoardFromControls}
                        buttonText={'Onboard As Candidate'}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        handleFileChange={handleFileChange}
                        isBtnDisabled={isCandidateFromValid}
                        action={createProfile}                 // ✅ custom submit
                    />
                </TabsContent>


                {/* Content of Recruiter */}
                <TabsContent value='recruiter'>
                    <Commonform
                        formControls={recruiterOnBoardFormControls}
                        buttonText={'Onboard As Recruiter'}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        isBtnDisabled={isRecruiterFormInvalid}
                        action={createProfile}

                    />

                </TabsContent>
            </Tabs>
        </div>
    )
}