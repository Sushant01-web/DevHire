/* Here All Jobs will list */

import { createFilterCategory, fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobForCandidate, fetchJobForRecruiter, fetchProfileAction } from "@/actions";
import JobComponent from "@/components/jobs";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage({searchParams}){

    // Converting searchParams with await
    const params = await searchParams;

    /* Getting user so according to this we can list job --> Recruiter will get to see their jobs only
    But Candidate will get to see all jobs which is posted by all recruiter */
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    // Listing Job Here
    const jobList = profileInfo?.role === 'candidate' ?
    await fetchJobForCandidate(params) :
    await fetchJobForRecruiter(user?.id)


    // Getting Job Application List
    const jobApplicationList = profileInfo?.role === 'candidate' ?
    await fetchJobApplicationsForCandidate(user?.id) :
    await fetchJobApplicationsForRecruiter(user?.id)


    // Getting Filter Category
    const fetchFilterCategories = await createFilterCategory()


    return <JobComponent
    user={JSON.parse(JSON.stringify(user))} // Convert user object into json
    profileInfo={profileInfo}
    jobList = {jobList}
    jobApplication = {jobApplicationList}
    fetchFilterCategories={fetchFilterCategories}
    />
}