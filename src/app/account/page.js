/* This page conatins logged In user account information */

import { fetchJobApplicationsForCandidate, fetchJobForCandidate, fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/accountInfo";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export default async function AccountPage() {

    // Getting Current User and profile Info
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if (!profileInfo) redirect('/onboard')

    // Fetching job Application of candidate
    const jobApplications = await fetchJobApplicationsForCandidate(user?.id)
    
    return (
        <AccountInfo profileInfo={profileInfo} jobApplications={jobApplications}/>
    )
}