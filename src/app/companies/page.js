/* This page is for the company listing on click on particular company will go to that company's posted jobs */

import { fetchJobForCandidate, fetchProfileAction } from "@/actions";
import Companies from "@/components/companiesPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Companypage() {

    // Getting current user
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo) redirect('/onboard')

    const jobList = await fetchJobForCandidate({})

    return(
        // Importing Company Page/ index.js
        <Companies jobList = {jobList}/>
    )
}