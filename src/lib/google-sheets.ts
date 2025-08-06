import { google } from "googleapis";
import { config } from "./config";

interface PaymentData {
  linkId: string;
  studentName: string;
  emailId: string;
  phoneNumber: string;
  payableAmount: number;
  amountPitched?: number;
  referralId: string;
  paymentLink: string;
  emailSent: boolean;
}

// Initialize Google Sheets API
function getGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendToGoogleSheets(data: PaymentData) {
  try {
    const sheets = getGoogleSheets();

    const values = [
      [
        data.linkId,
        data.studentName,
        data.emailId,
        data.phoneNumber,
        data.payableAmount,
        data.amountPitched || "",
        data.referralId,
        data.paymentLink,
        data.emailSent ? "Yes" : "No",
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.sheetName}!A:I`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log("Data appended to Google Sheets:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    throw error;
  }
}
