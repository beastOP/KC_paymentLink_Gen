"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  studentEmail: z.string().email("Please enter a valid email"),
  studentPhone: z.string().min(1, "Phone number is required"),
  payableAmount: z.number().min(1, "Payable amount is required"),
  amountPitched: z.number().optional(),
  referralId: z.string().min(1, "Referral ID is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormData(data);
    reset();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Payment Link Form
            </h1>
            <p className="text-gray-600">
              This is a test version without API integration
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                {...register("studentName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter student name"
              />
              {errors.studentName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.studentName.message}
                </p>
              )}
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Email ID *
              </label>
              <input
                type="email"
                {...register("studentEmail")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="abc@gmail.com"
              />
              {errors.studentEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.studentEmail.message}
                </p>
              )}
            </div>

            {/* Student Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Phone Number *
              </label>
              <input
                type="tel"
                {...register("studentPhone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+9234567890"
              />
              {errors.studentPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.studentPhone.message}
                </p>
              )}
            </div>

            {/* Payable Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payable Amount (Rs) *
              </label>
              <input
                type="number"
                {...register("payableAmount", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="899"
              />
              {errors.payableAmount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.payableAmount.message}
                </p>
              )}
            </div>

            {/* Amount Pitched */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Pitched (Rs)
              </label>
              <input
                type="number"
                {...register("amountPitched", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5000"
              />
              {errors.amountPitched && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amountPitched.message}
                </p>
              )}
            </div>

            {/* Referral ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral ID *
              </label>
              <input
                type="text"
                {...register("referralId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="KC1801"
              />
              {errors.referralId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.referralId.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Processing..." : "Submit Form"}
            </button>
          </form>

          {/* Success Message */}
          {formData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 mb-2">
                Form submitted successfully!
              </p>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
