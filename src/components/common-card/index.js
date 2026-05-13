/* This is a common card of jobs listing which is use in recruiter and candidate section */


import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function CommonCard({ icon, title, desscription, footerContent, experience, jobAppliedAt }) {
    return (
        <Card className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">

            {/* Header */}
            <CardHeader className="p-0 space-y-4">

                {/* Icon */}
                {icon && (
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200 transition">
                        {icon}
                    </div>
                )}

                {/* Title */}
                {title && (
                    <CardTitle className="text-3xl font-semibold text-gray-900 leading-snug line-clamp-2">
                        {title}
                    </CardTitle>
                )}

                {/* Description */}
                {desscription && (
                    <CardDescription className="text-xl font-semibold text-gray-800 line-clamp-2">
                        {desscription}
                    </CardDescription>
                )}


                {experience &&
                    <div className="text-xl text-gray-600 line-clamp-2">
                        {experience}
                    </div>
                }

                {jobAppliedAt &&
                    <div className="text-xl text-gray-600 line-clamp-2">
                       Applied On - {jobAppliedAt}
                    </div>
                }

            </CardHeader>

            {/* Footer */}
            {footerContent && (
                <CardFooter className="bg-transparent border-none">
                    {footerContent}
                </CardFooter>
            )}

        </Card>
    );
}