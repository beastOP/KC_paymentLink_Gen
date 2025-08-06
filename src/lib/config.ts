export const config = {
  cashfree: {
    clientId: process.env.CASHFREE_CLIENT_ID!,
    clientSecret: process.env.CASHFREE_CLIENT_SECRET!,
    apiVersion: "2025-01-01",
    baseUrl: "https://api.cashfree.com/pg",
  },
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SHEETS_DOCUMENT_ID ||
      "1EaxTqjbwf0ZrCx6WNY6ZIc3sTAVFC5hbGSuMKRYhOtI",
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || "gid=0",
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
  },
  app: {
    name: "Payment Link Generator",
    description: "Generate payment links using Cashfree API",
  },
} as const;

// Validate required environment variables
export function validateConfig() {
  const requiredVars = [
    "CASHFREE_CLIENT_ID",
    "CASHFREE_CLIENT_SECRET",
  ];

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  // Check if at least one Google Sheets authentication method is available
  const hasGoogleAuth = config.googleSheets.serviceAccountEmail &&
    config.googleSheets.privateKey;

  if (!hasGoogleAuth) {
    console.warn(
      "Warning: No Google Sheets authentication configured. Data will not be saved to sheets.",
    );
  }
}
