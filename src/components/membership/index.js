
/* This is the component of membership page and will mount to membership page */
"use client";

import { membershipPlan } from "@/utils";
import { Button } from "../ui/button";
import { createPrice, createStripePayment, updateProfile,} from "@/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";

export default function Membership({ profileInfo }) {

  // Creating function to handle payement
  async function handlePayment(getCurrentPlan) {
    const extractPriceId = await createPrice({
      amount: Number(getCurrentPlan?.price),
    });

    if (!extractPriceId) return;
    sessionStorage.setItem("currentPlan",
      JSON.stringify(getCurrentPlan)
    );

    const result = await createStripePayment({
      lineItems: [
        {
          price: extractPriceId?.id,
          quantity: 1,
        },
      ],
    });

    if (result?.url) {
      window.location.href = result.url;
    }
  }

  // Payment Success
  const pathName = useSearchParams();
  const status = pathName.get("status");

  // Creating function to update profile after payment
  async function updateProfileAfterPayment() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(sessionStorage.getItem("currentPlan"));

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);

    await updateProfile(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,

        memberShipStartDate: startDate.toString(),

        memberShipEndDate: endDate.toString(),
      },
      "/membership"
    );

    toast.success("Welcome To Member Club 🎉", {
      style: {
        fontSize: "18px",
        padding: "16px 24px",
        minWidth: "300px",
      },
    });
  }

  useEffect(() => {
    if (status === "success") {
      updateProfileAfterPayment();
    }
  }, [status]);

  // Current Plan Level
  const currentPlanLevel = membershipPlan.find((p) => p.type === profileInfo?.memberShipType)?.level || 0;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <div className="pt-24 pb-10 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          {/* LEFT */}
          <div>
            <span className="text-sm font-medium uppercase tracking-[3px] text-blue-600">
              Membership
            </span>

            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              {
                profileInfo?.isPremiumUser
                  ? "You Are A Premium Member"
                  : "Choose Your Membership"
              }
            </h1>

            <p className="mt-4 text-gray-600 text-lg max-w-2xl leading-8">
              Unlock premium features, apply faster,
              and get more visibility in the DevHire community.
            </p>
          </div>

          {/* RIGHT */}
          {
            profileInfo?.isPremiumUser ? (
              <div className="px-5 py-3 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-gray-500">
                  Current Plan
                </p>

                <h2 className="text-lg font-semibold text-blue-700">
                  {
                    membershipPlan.find(
                      (item) =>
                        item.type === profileInfo?.memberShipType
                    )?.header
                  }
                </h2>
              </div>
            ) : null
          }
        </div>
      </div>

      {/* Membership Plans */}
      <div className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            membershipPlan.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white border rounded-3xl p-8 transition-all duration-300 hover:shadow-lg
                  ${plan.level === currentPlanLevel ? "border-blue-500" : "border-gray-200"}`}>

                {/* Plan Badge */}
                {
                  plan.level === currentPlanLevel ? (
                    <div className="absolute top-5 right-5 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Active
                    </div>
                  ) : null
                }

                {/* Top */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {plan.header}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {plan.type}
                  </p>

                  <div className="mt-6 flex items-end gap-1">

                    <h1 className="text-5xl font-bold text-gray-900">
                      ₹{plan.price}
                    </h1>

                    <span className="text-gray-500 mb-1">
                      / year
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">
                      Premium Profile Visibility
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">
                      Faster Job Applications
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">
                      Access to Premium Jobs
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">
                      Priority Support
                    </p>
                  </div>
                </div>

                {/* Button */}
                <Button
                  disabled={plan.level <= currentPlanLevel}
                  onClick={() => handlePayment(plan)}
                  className="mt-10 w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {
                    plan.level <= currentPlanLevel
                      ? "Current Plan"
                      : "Get Membership"
                  }
                </Button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}