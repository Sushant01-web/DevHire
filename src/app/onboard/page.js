/* Here User will get to choose whether is he is candidate or recruiter */

import { fetchProfileAction } from "@/actions";
import OnboardComponent from "@/components/onboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function OnboardPage() {

    const authenticatedUser = await currentUser()

    if (!authenticatedUser) {
        redirect('/sign-in') // optional safety
    }

    const profileInfo = await fetchProfileAction(authenticatedUser.id)

    if (profileInfo?._id) {
        if (profileInfo.role === 'recruiter' && !profileInfo.isPremiumUser) {
            redirect('/membership')
        } else {
            redirect('/')
        }
    }

    return <OnboardComponent />
}