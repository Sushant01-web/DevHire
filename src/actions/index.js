/* This code will run on server like API do */
'use server'

import connectDB from "@/database"
import { revalidatePath } from "next/cache"
import Profile from '@/models/profile.model'
import Job from "@/models/job.model"
import cloudinary from "@/lib/cloudinary"
import Application from "@/models/application.model"
import { MEMBERSHIP_LIMITS } from "@/utils";
import Feed from "@/models/feed.model"



// Creating action for create profile
export async function createProfileAction(formData, pathToRevalidate) {
  // Connecting DB
  await connectDB()
  await Profile.create(formData)
  revalidatePath(pathToRevalidate)
}



// Creating action for fetching profile details
export async function fetchProfileAction(id) {
  // Connecting DB
  await connectDB()

  const result = await Profile.findOne({ userId: id })
  return JSON.parse(JSON.stringify(result))
}



// Create action for Posting job
export async function postNewJobAction(formData, pathToRevalidate) {
  await connectDB();

  const { recruiterId } = formData;

  // 🔍 Get recruiter profile
  const profile = await Profile.findOne({ userId: recruiterId });

  if (!profile) {
    throw new Error("Profile not found");
  }

  // 🔍 Determine limit
  const plan = profile.memberShipType;

  let limit;

  if (!plan) {
    // ✅ No membership → default limit
    limit = 10;
  } else {
    // ✅ With membership → use config
    limit = MEMBERSHIP_LIMITS.recruiter?.[plan] ?? 10;
  }

  // 🔍 Count existing jobs
  const currentJobCount = await Job.countDocuments({ recruiterId });

  // 🚫 Restrict
  if (currentJobCount >= limit) {
    throw new Error(
      plan
        ? "Job posting limit reached. Please upgrade your plan."
        : "Free limit reached (10 jobs). Upgrade your membership."
    );
  }

  // ✅ Create job
  const result = await Job.create(formData);

  revalidatePath(pathToRevalidate);

  return JSON.parse(JSON.stringify(result));
}



// Creating server action to delete created job
export async function deleteJob(jobId, recruiterId, pathToRevalidate) {
  try {
    await connectDB()

    // Finding job based on jobId and recruiterId
    const job = await Job.findOne({
      _id : jobId,
      recruiterId : recruiterId
    })

    // If no jobs found for that recruiter
    if(!job){
      return {
        success : false,
        message : "No jobs found or Unauthorized"
      }
    }

    await Job.findByIdAndDelete(jobId)

    revalidatePath(pathToRevalidate)

    return {
      success : true,
      message : "Job Deleted"
    }


  } catch (error) {
    console.log(error)
    return{
      success : false,
      message : "Something went wrong"
    }
  }
}


/*--->>  Create action for fetching job
 This has condition -->> Fetch job for candidate is diff and for recruiter is diff */

// Fetching for Recruiter
export async function fetchJobForRecruiter(id) {
  await connectDB()

  const result = await Job.find({ recruiterId: id })
  return JSON.parse(JSON.stringify(result))
}

// Candidate including filters
export async function fetchJobForCandidate(filterParams = {}) {
  await connectDB();

  let updatedParams = {};

  Object.keys(filterParams).forEach(filterKey => {
    const value = filterParams[filterKey];

    updatedParams[filterKey] = {
      $in: Array.isArray(value) ? value : value.split(',')
    };
  });

  console.log("updatedParams", updatedParams);

  const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});

  return JSON.parse(JSON.stringify(result));
}



// Uploading File to Cloudinary
export async function uploadResumeAction(file) {

    try {

        const arrayBuffer = await file.arrayBuffer()

        const buffer = Buffer.from(arrayBuffer)

        const result = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream(

                {
                    resource_type: "raw",
                    folder: "job-portal-resumes"
                },

                (error, result) => {

                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }

            ).end(buffer)

        })

        return {
            success: true,
            resumeURL: result.secure_url
        }

    } catch (error) {

        console.log(error)

        return {
            success: false
        }
    }
}


// Uploading Feed Image to Cloudinary
export async function uploadFeedImageAction(file) {

  try {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = file.name.split(".")[0];

    const result = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "feed-image",
          resource_type: "image",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        },

        (error, result) => {

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    return {
      success: true,
      imageURL: result.secure_url,
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Image upload failed",
    };
  }
}


// Create Job Application
export async function CreateJobApplication(data, pathToRevalidate) {
  await connectDB();

  const { candidateUserId } = data;

  // 🔍 Get candidate profile
  const profile = await Profile.findOne({ userId: candidateUserId });

  if (!profile) {
    throw new Error("Profile not found");
  }

  // 🔍 Determine limit
  const plan = profile.memberShipType;

  let limit;

  if (!plan) {
    // ✅ No membership → free limit
    limit = 10;
  } else {
    // ✅ With membership
    limit = MEMBERSHIP_LIMITS.candidate?.[plan] ?? 10;
  }

  // 🔍 Count applied jobs
  const currentApplicationCount = await Application.countDocuments({
    candidateUserId
  });

  // 🚫 Restrict
  if (currentApplicationCount >= limit) {
    throw new Error(
      plan
        ? "Job application limit reached. Upgrade your plan."
        : "Free limit reached (10 applications). Upgrade membership."
    );
  }

  // ✅ Prevent duplicate apply (IMPORTANT)
  const alreadyApplied = await Application.findOne({
    candidateUserId,
    jobId: data.jobId
  });

  if (alreadyApplied) {
    throw new Error("You have already applied for this job");
  }

  // ✅ Create application
  await Application.create(data);

  revalidatePath(pathToRevalidate);
}



// Fetch Job Application -- For Candidate 
export async function fetchJobApplicationsForCandidate(candidateId) {
  await connectDB()

  const result = await Application.find({ candidateUserId: candidateId })
  return JSON.parse(JSON.stringify(result))
}



// Fetch Job Application -- For Recruiter
export async function fetchJobApplicationsForRecruiter(recruiterId) {
  await connectDB()

  const result = await Application.find({ recruiterUserId: recruiterId })
  return JSON.parse(JSON.stringify(result))
}



// Update Job Application when recruiter select any candidate
export async function updateJobApplication(data, pathToRevalidate) {
  await connectDB()

  const { recruiterUserId, name, email, candidateUserId, status, jobId, jobAppliedDate, _id } = data

  await Application.findOneAndUpdate({ _id: _id }, { recruiterUserId, name, email, candidateUserId, status, jobId, jobAppliedDate }, { new: true })
  revalidatePath(pathToRevalidate)
}


// Fetching Candidate Details by Candidate Id to render in Dialog after recruiter click on View profile
export async function fetchCandidateDetails(currentCandidateId) {
  await connectDB()

  const result = await Profile.findOne({ userId: currentCandidateId })
  return JSON.parse(JSON.stringify(result))
}



// Creating Filter Categoris
export async function createFilterCategory() {
  await connectDB()

  const result = await Job.find({})
  return JSON.parse(JSON.stringify(result))
}



// Creating action for updating account info
export async function updateProfile(data, pathToRevalidate) {

    await connectDB()

    const {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        recruiterInfo,
        candidateInfo,
        _id
    } = data

    await Profile.findOneAndUpdate(

        {
            _id: _id
        },

        {
            userId,
            role,
            email,
            isPremiumUser,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            recruiterInfo,
            candidateInfo
        },

        {
            new: true
        }
    )

    revalidatePath(pathToRevalidate)
}


// Creating Action for strip price id based on their membership selection
const stripe = require("stripe")(
  process.env.STRIPE_URL
)

export async function createPrice(data) {
  // Creating payment session
  const session = await stripe.prices.create({
    currency: 'inr',
    unit_amount: data?.amount * 100,
    recurring: {
      interval: 'year'
    },
    product_data: {
      name: 'Premium Plan'
    }
  })
  return {
    success: true,
    id: session?.id
  }
}


// Creating Payment Logic
export async function createStripePayment(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: data?.lineItems,
    mode: 'subscription',
    success_url: `${process.env.URL}/membership?status=success`,
    cancel_url: `${process.env.URL}/membership?status=cancel`,
  })

  return {
    success: true,
    id: session.id,
    url: session.url   // ✅ THIS IS REQUIRED
  }
}


// Creating action for create feed
export async function createFeed(data, pathToRevalidate) {
  await connectDB()
  await Feed.create(data)
  revalidatePath(pathToRevalidate)
}


// Creating action for fetch all posted feed
export async function fetchAllFeed() {

  await connectDB();

  const result = await Feed.find({})
    .sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(result));
}


// Like / Unlike Feed
export async function likeFeedAction(
  feedId,
  userId,
  userName,
  pathToRevalidate
) {

  await connectDB();

  const feed = await Feed.findById(feedId);

  if (!feed) {
    return {
      success: false,
    };
  }

  // IMPORTANT FIX
  if (!feed.likes) {
    feed.likes = [];
  }

  const alreadyLiked = feed.likes.find(
    (item) => item.reactorUserId === userId
  );

  // Unlike
  if (alreadyLiked) {

    feed.likes = feed.likes.filter(
      (item) => item.reactorUserId !== userId
    );

  }

  // Like
  else {

    feed.likes.push({
      reactorUserId: userId,
      reactorUserName: userName,
    });

  }

  await feed.save();

  revalidatePath(pathToRevalidate);

  return {
    success: true,
  };
}


  // Add Comment
export async function addCommentAction(
  feedId,
  commentData,
  pathToRevalidate
) {

  await connectDB();

  const feed = await Feed.findById(feedId);

  if (!feed) {

    return {
      success: false,
    };

  }

  // IMPORTANT FIX
  if (!feed.comments) {
    feed.comments = [];
  }

  feed.comments.push(commentData);

  await feed.save();

  revalidatePath(pathToRevalidate);

  return {
    success: true,
  };
}