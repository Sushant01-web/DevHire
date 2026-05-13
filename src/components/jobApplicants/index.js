/* These will show all apllicant component */
'use client'
import CandidateList from "../candidateList";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({jobItem, jobApplication, showDrawer, setShowDrawer, currentCandidateDetails, setCurrentCandidateDetails, showCurrentCandidateModel, setShowCurrentCandidateModel}){

    return (
        <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
            <DrawerContent className='max-h-[50vh]'>
                <ScrollArea className='h-auto overflow-y-auto'>
                    <CandidateList
                    currentCandidateDetails={currentCandidateDetails}
                    setCurrentCandidateDetails={setCurrentCandidateDetails}
                    showCurrentCandidateModel={showCurrentCandidateModel}
                    setShowCurrentCandidateModel={setShowCurrentCandidateModel}
                    jobApplication={jobApplication}/>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}