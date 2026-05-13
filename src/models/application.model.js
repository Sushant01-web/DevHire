/* Schemas and validation for applicants of jobs */

import mongoose from "mongoose";

const ApplicationShcema = new mongoose.Schema({
    recruiterUserId : String, // Who has created this job
    name : String, // Candidate Name
    email : String,
    candidateUserId : String,
    status : Array,
    jobId : String,
    jobAppliedDate : String,
}, {timestamps : true})

const Application = mongoose.models.Application || mongoose.model('Application', ApplicationShcema)
export default Application;