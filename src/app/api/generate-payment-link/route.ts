import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendToGoogleSheets } from "@/lib/google-sheets";
import { config, validateConfig } from "@/lib/config";

const requestSchema = z.object({
  studentName: z.string().min(1),
  studentEmail: z.string().email(),
  studentPhone: z.string().min(1),
  payableAmount: z.number().min(1),
  amountPitched: z.number().optional(),
  referralId: z.string().min(1),
});

// Generate a unique ID similar to the n8n workflow
function generateUniqueId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let uuid = "";
  for (let i = 0; i < 50; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
}

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    validateConfig();

    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    // Generate unique ID
    const linkId = generateUniqueId();

    // Prepare the request payload for Cashfree API
    const cashfreePayload = {
      customer_details: {
        customer_email: validatedData.studentEmail,
        customer_name: validatedData.studentName,
        customer_phone: validatedData.studentPhone,
      },
      link_amount: validatedData.payableAmount,
      link_currency: "INR",
      link_id: linkId,
      link_minimum_partial_amount: 20,
      link_notes: {
        referral_id: validatedData.referralId,
      },
      link_notify: {
        send_email: true,
        send_sms: false,
      },
      link_partial_payments: false,
      link_purpose: "Course",
    };

    // Make request to Cashfree API
    const response = await fetch(config.cashfree.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": config.cashfree.apiVersion,
        "x-client-id": config.cashfree.clientId,
        "x-client-secret": config.cashfree.clientSecret,
      },
      body: JSON.stringify(cashfreePayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cashfree API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate payment link from Cashfree" },
        { status: 500 },
      );
    }

    const cashfreeResponse = await response.json();

    // Prepare data for Google Sheets
    const sheetData = {
      linkId: cashfreeResponse.link_id,
      studentName: validatedData.studentName,
      emailId: validatedData.studentEmail,
      phoneNumber: validatedData.studentPhone,
      payableAmount: validatedData.payableAmount,
      amountPitched: validatedData.amountPitched,
      referralId: validatedData.referralId,
      paymentLink: cashfreeResponse.link_url,
      emailSent: cashfreeResponse.link_notify?.send_email || false,
    };

    // Save to Google Sheets
    try {
      await appendToGoogleSheets(sheetData);
    } catch (sheetsError) {
      console.error("Failed to save to Google Sheets:", sheetsError);
      // Continue with the response even if Google Sheets fails
    }

    return NextResponse.json({
      success: true,
      linkUrl: cashfreeResponse.link_url,
      linkId: cashfreeResponse.link_id,
      message: "Payment link generated successfully",
    });
  } catch (error) {
    console.error("Error generating payment link:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
