/* This is Feed component and will mount to Feed page */

"use client";

import { useState } from "react";

import { addCommentAction, createFeed, likeFeedAction, uploadFeedImageAction,} from "@/actions";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Heart, MessageCircle, Share2, ImageIcon,} from "lucide-react";

export default function Feed({ user, profileInfo, allPostedFeed,}) {

    // States
    const [message, setMessage] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [openFeedDialog, setOpenFeedDialog] = useState(false);
    const [commentMessage, setCommentMessage] = useState({});

    // Upload Image
    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        setImageLoading(true);
        const response = await uploadFeedImageAction(file);
        if (response?.success) {
            setImageURL(response.imageURL);
        }
        setImageLoading(false);
    }

    // Create Feed
    async function handleCreatePost() {
        if (!message.trim()) return;
        setPostLoading(true);
        const payload = {
            userId: user?.id,
            userName:
                profileInfo?.candidateInfo?.name ||
                profileInfo?.recruiterInfo?.name,

            message,
            image: imageURL,
            likes: [],
        };
        await createFeed(payload, "/feed");

        // Reset States
        setMessage("");
        setImageURL("");
        setPostLoading(false);
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100">
            {/* TOP HERO SECTION */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-10">
                {/* OPEN HERO SECTION */}
                <section className="relative overflow-hidden pt-10 lg:pt-16 pb-20">
                    {/* BACKGROUND EFFECTS */}
                    <div className="absolute top-[-120px] left-[-100px] w-100 h-100 bg-blue-200/30 blur-3xl rounded-full"></div>

                    <div className="absolute bottom-[-120px] right-[-100px] w-112.5 h-112.5 bg-indigo-200/30 blur-3xl rounded-full"></div>

                    <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50"></div>

                    {/* CONTENT */}
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT SIDE */}
                        <div>
                            {/* TOP SMALL TEXT */}
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-[2px] bg-linear-to-r from-blue-600 to-indigo-600"></div>
                                <span className="uppercase tracking-[4px] text-sm font-semibold text-blue-700">
                                    DevHire Community
                                </span>
                            </div>

                            {/* BIG HEADING */}
                            <h1 className="mt-7 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-gray-900">
                                Build Your
                                <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Professional
                                </span>
                                Network Here.
                            </h1>

                            {/* DESCRIPTION */}
                            <p className="mt-8 text-lg leading-8 text-gray-600 max-w-2xl">
                                Share achievements, hiring updates, career journeys,
                                and connect with developers, recruiters, and professionals
                                from around the world.
                            </p>

                            {/* STATS */}
                            <div className="flex flex-wrap items-center gap-10 mt-12">
                                <div>
                                    <h2 className="text-5xl font-extrabold text-blue-600">
                                        {allPostedFeed?.length || 0}+
                                    </h2>
                                    <p className="mt-2 text-gray-500 font-medium">
                                        Community Posts
                                    </p>
                                </div>

                                <div className="w-[1px] h-16 bg-gray-200 hidden md:block"></div>
                                <div>
                                    <h2 className="text-5xl font-extrabold text-indigo-600">
                                        20K+
                                    </h2>
                                    <p className="mt-2 text-gray-500 font-medium">
                                        Active Members
                                    </p>
                                </div>

                                <div className="w-[1px] h-16 bg-gray-200 hidden md:block"></div>
                                <div>
                                    <h2 className="text-5xl font-extrabold text-purple-600">
                                        99%
                                    </h2>
                                    <p className="mt-2 text-gray-500 font-medium">
                                        Positive Engagement
                                    </p>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap gap-5 mt-12">
                                <button
                                    onClick={() => setOpenFeedDialog(true)}
                                    className="bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-full shadow-2xl font-semibold text-lg"
                                >
                                    Create Feed 🚀
                                </button>
                                <button
                                    className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-lg bg-white/60 backdrop-blur-xl"
                                >
                                    Explore Community
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* MAIN IMAGE */}
                            <img
                                src="https://img.freepik.com/free-vector/social-media-marketing-mobile-phone-concept_23-2148431743.jpg"
                                alt="Community"
                                className="w-full max-w-2xl object-contain"
                            />
                            {/* FLOATING ELEMENT */}
                            <div className="absolute top-10 right-5 animate-bounce hidden lg:flex">
                                <div className="bg-white/90 backdrop-blur-xl px-6 py-4 rounded-full shadow-2xl border border-white flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    <span className="font-semibold text-gray-800">
                                        2.5K users online
                                    </span>
                                </div>
                            </div>

                            {/* FLOATING ELEMENT */}
                            <div className="absolute bottom-8 left-0 hidden lg:block">
                                <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-3xl shadow-2xl">
                                    <h3 className="text-2xl font-bold">
                                        Share Ideas
                                    </h3>
                                    <p className="text-sm text-blue-100 mt-1">
                                        Inspire developers globally
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CREATE POST SECTION */}
                <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-xl p-6">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                            {
                                (
                                    profileInfo?.candidateInfo?.name ||
                                    profileInfo?.recruiterInfo?.name
                                )
                                    ?.charAt(0)
                                    ?.toUpperCase()
                            }
                        </div>
                        {/* Input */}
                        <Dialog
                            open={openFeedDialog}
                            onOpenChange={setOpenFeedDialog}
                        >
                            <DialogTrigger asChild>
                                <button
                                    className="flex-1 text-left bg-gray-100 hover:bg-gray-200 transition rounded-2xl px-6 py-4 text-gray-500 font-medium">
                                    What's on your mind?
                                </button>
                            </DialogTrigger>

                            {/* DIALOG */}
                            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-[32px] border-none shadow-2xl">
                                {/* Header */}
                                <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6 text-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-3xl font-bold">
                                            Create Feed
                                        </DialogTitle>
                                        <p className="text-sm text-blue-100 mt-1">
                                            Share updates with your professional community 🚀
                                        </p>
                                    </DialogHeader>
                                </div>

                                {/* Body */}
                                <div className="bg-white p-8 space-y-6">

                                    {/* User */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                                            {
                                                (
                                                    profileInfo?.candidateInfo?.name ||
                                                    profileInfo?.recruiterInfo?.name
                                                )
                                                    ?.charAt(0)
                                                    ?.toUpperCase()
                                            }
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {
                                                    profileInfo?.candidateInfo?.name ||
                                                    profileInfo?.recruiterInfo?.name
                                                }
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Posting publicly
                                            </p>
                                        </div>
                                    </div>

                                    {/* Textarea */}
                                    <Textarea
                                        placeholder="Share your thoughts..."
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        className="min-h-[180px] border-none focus-visible:ring-0 shadow-none resize-none text-lg"
                                    />

                                    {/* Upload */}
                                    <div className="border-2 border-dashed border-blue-100 hover:border-blue-400 transition-all rounded-3xl p-6 bg-blue-50/40">
                                        <div className="flex items-center gap-3 mb-4">
                                            <ImageIcon className="text-blue-600 w-5 h-5" />
                                            <span className="font-medium text-gray-700">
                                                Upload Image
                                            </span>
                                        </div>

                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="cursor-pointer"
                                        />
                                        {
                                            imageLoading && (
                                                <div className="flex items-center gap-2 mt-4 text-blue-600 text-sm">
                                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                    Uploading image...
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* Preview */}
                                    {
                                        imageURL && (
                                            <div className="relative">
                                                <img
                                                    src={imageURL}
                                                    alt="feed-preview"
                                                    className="w-full rounded-3xl max-h-[450px] object-cover shadow-xl"
                                                />
                                                <button
                                                    onClick={() => setImageURL("")}
                                                    className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )
                                    }

                                    {/* Footer */}
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={async () => {
                                                await handleCreatePost();
                                                setOpenFeedDialog(false);
                                            }}
                                            disabled={postLoading}
                                            className="h-12 px-8 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-lg"
                                        >
                                            {
                                                postLoading
                                                    ? "Posting..."
                                                    : "Post Feed 🚀"
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* POSTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">
                    {
                        allPostedFeed?.length === 0 ? (
                            <div className="col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-16 text-center">
                                <img
                                    src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
                                    alt="No Posts"
                                    className="w-72 mx-auto mb-8"
                                />

                                <h2 className="text-3xl font-bold text-gray-900">
                                    No Posts Yet
                                </h2>
                                <p className="text-gray-500 mt-3">
                                    Start sharing your thoughts with the community.
                                </p>
                            </div>

                        ) : (
                            allPostedFeed.map((feedItem) => (
                                <div
                                    key={feedItem?._id}
                                    className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top Gradient */}
                                    <div className="h-2 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                                    {/* Header */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-14 h-14 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                                                {
                                                    feedItem?.userName
                                                        ?.charAt(0)
                                                        ?.toUpperCase()
                                                }
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg text-gray-900">{feedItem?.userName}</h2>
                                                <p className="text-sm text-gray-500">Community Feed</p>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                                            {feedItem?.message}
                                        </p>
                                    </div>

                                    {/* Image */}
                                    {
                                        feedItem?.image && (
                                            <img
                                                src={feedItem?.image}
                                                alt="feed-post"
                                                className="w-full h-[380px] object-cover"
                                            />
                                        )
                                    }

                                    {/* Actions */}
                                    <div className="p-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-6">
                                            {/* Like */}
                                            <button
                                                onClick={async () => {
                                                    await likeFeedAction(
                                                        feedItem?._id,
                                                        user?.id,
                                                        profileInfo?.candidateInfo?.name ||
                                                        profileInfo?.recruiterInfo?.name,

                                                        "/feed"
                                                    );
                                                }}
                                                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition font-medium">
                                                <Heart className="w-5 h-5" />
                                                {feedItem?.likes?.length}
                                            </button>

                                            {/* Comment */}
                                            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium">
                                                <MessageCircle className="w-5 h-5" />
                                                {feedItem?.comments?.length || 0}
                                            </button>

                                            {/* Share */}
                                            <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium">
                                                <Share2 className="w-5 h-5" />
                                                Share
                                            </button>
                                        </div>

                                        {/* Add Comment */}
                                        <div className="flex gap-3 mb-6">
                                            <Input
                                                placeholder="Write a comment..."
                                                value={
                                                    commentMessage[feedItem?._id] || ""
                                                }
                                                onChange={(e) =>
                                                    setCommentMessage({
                                                        ...commentMessage,

                                                        [feedItem?._id]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="h-12 rounded-xl"
                                            />

                                            <Button
                                                onClick={async () => {
                                                    if (
                                                        !commentMessage[feedItem?._id]
                                                    ) return;

                                                    await addCommentAction(
                                                        feedItem?._id,
                                                        {
                                                            commentUserId: user?.id,

                                                            commentUserName:
                                                                profileInfo?.candidateInfo?.name ||
                                                                profileInfo?.recruiterInfo?.name,

                                                            commentText:
                                                                commentMessage[
                                                                feedItem?._id
                                                                ],
                                                        },

                                                        "/feed"
                                                    );

                                                    setCommentMessage({
                                                        ...commentMessage,

                                                        [feedItem?._id]: "",
                                                    });

                                                }}
                                                className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600">
                                                Post
                                            </Button>
                                        </div>

                                        {/* Comments */}
                                        <div className="space-y-4">
                                            {
                                                feedItem?.comments
                                                    ?.slice()
                                                    ?.reverse()
                                                    ?.map((commentItem, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                                            <h3 className="font-semibold text-sm text-gray-900 mb-1">
                                                                {
                                                                    commentItem?.commentUserName
                                                                }
                                                            </h3>
                                                            <p className="text-gray-700 text-sm leading-6">
                                                                {
                                                                    commentItem?.commentText
                                                                }
                                                            </p>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}