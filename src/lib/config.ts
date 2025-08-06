export const config = {
  cashfree: {
    clientId: process.env.CASHFREE_CLIENT_ID!,
    clientSecret: process.env.CASHFREE_CLIENT_SECRET!,
    apiVersion: process.env.CASHFREE_API_VERSION!,
    baseUrl: process.env.CASHFREE_API_URL!,
  },
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SHEETS_DOCUMENT_ID!,
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME!,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    privateKey: process.env.GOOGLE_PRIVATE_KEY!,
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
    "CASHFREE_API_URL",
    "CASHFREE_API_VERSION",
    "GOOGLE_SHEETS_DOCUMENT_ID",
    "GOOGLE_SHEETS_SHEET_NAME",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
  ];
  for (const v of requiredVars) {
    if (!process.env[v]) {
      throw new Error(`Missing required environment variable: ${v}`);
    }
  }
}
