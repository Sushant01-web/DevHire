/* Singup Page and consist of Clerk Authentication */

import { SignUp } from "@clerk/nextjs";


export default function SignupPage(){
    return(
        <div>
            <h2>Please Signup</h2>
            <SignUp/>
        </div>
    )
}