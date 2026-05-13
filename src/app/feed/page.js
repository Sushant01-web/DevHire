/* This is the page for feed */

import { fetchAllFeed, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Feedpage() {

    // Getting Current user
    const user = await currentUser()

    // Getting ProfileInfo
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo){
        redirect('/onboard')
    }


    // Getting All posted feed
    const allPostedFeed = await fetchAllFeed()

    return (
        <Feed 
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
        allPostedFeed={allPostedFeed}
        />
    )
}