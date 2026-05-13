/* Creating Membership Page */

import { fetchProfileAction } from "@/actions";
import Membership from "@/components/membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MembershipPage(){

    // Getting Current user and ProfileInfo
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo) redirect('/onboard')

    return(
        <Membership profileInfo={profileInfo}/>
    )
}