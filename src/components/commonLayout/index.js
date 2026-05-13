

import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

export default async function Commonlayout({ children }) {

    // Getting Current user from clerk - hook
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    return (
            <div className="p-6 lg:px-8">
                {/* Header */}
                <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />
                {/* Header */}

                {/* Main Content */}
                <main>{children}</main>
                {/* Main Content */}

            </div>
    )
}