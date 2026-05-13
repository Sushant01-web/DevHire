/* Here All Activity of Canidate will display
i.e. How Many jobs you have applied and how many get rejected */

import { fetchJobApplicationsForCandidate, fetchJobForCandidate } from "@/actions"
import CandidateActivities from "@/components/canidateActivity"
import { currentUser } from "@clerk/nextjs/server"

export default async function ActivityPage(){

    // Getting Current user
    const user = await currentUser()


    // Fetching JobList
    const jobListOfCandidate = await fetchJobForCandidate()


    // Fetching jobApplication
    const jobApplication = await fetchJobApplicationsForCandidate(user?.id)

    return(
        <CandidateActivities
        jobListOfCandidate={jobListOfCandidate}
        jobApplication={jobApplication}/>
    )
}