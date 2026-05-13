import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    companyName: String,
    title: String,
    vacancies: String,
    jobLocation: String,
    jobType: String,
    description: String,
    skills: String,
    experience: String,
    recruiterId: String,
    applicant: [
        {
            name: String,
            email: String,
            userId: String,
            status: String,
        }
    ]
})

// 🔥 FORCE NEW MODEL
delete mongoose.models.Job;

const Job = mongoose.model("Job", JobSchema);

export default Job;