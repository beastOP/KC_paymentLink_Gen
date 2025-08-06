# Payment Link Generator

A Next.js application that replicates the n8n workflow for generating payment links using Cashfree API and saving data to Google Sheets.

## Features

- ✅ Custom form with validation using React Hook Form and Zod
- ✅ Integration with Cashfree Payment Gateway API
- ✅ Google Sheets integration for data storage
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Form validation and error handling
- ✅ Loading states and success/error messages

## Prerequisites

- Node.js 18+
- npm or yarn
- Cashfree account with API credentials
- Google Cloud Project with Sheets API enabled

## Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo>
   cd payment-link-generator
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root directory:

   ```env
   # Cashfree API Credentials
   CASHFREE_CLIENT_ID=your_cashfree_client_id
   CASHFREE_CLIENT_SECRET=your_cashfree_client_secret

   # Google Sheets API Credentials
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

   # Google Sheets Configuration
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   GOOGLE_SHEET_NAME=Payment sheet
   ```

3. **Google Sheets Setup:**

   - Create a Google Cloud Project
   - Enable Google Sheets API
   - Create a Service Account
   - Download the JSON credentials
   - Share your Google Sheet with the service account email
   - Update the environment variables with your credentials

4. **Cashfree Setup:**
   - Sign up for a Cashfree account
   - Get your API credentials from the dashboard
   - Update the environment variables

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## API Endpoints

### POST /api/generate-payment-link

Generates a payment link using Cashfree API and saves data to Google Sheets.

**Request Body:**

```json
{
  "studentName": "John Doe",
  "studentEmail": "john@example.com",
  "studentPhone": "+919876543210",
  "payableAmount": 899,
  "amountPitched": 5000,
  "referralId": "KC1801"
}
```

**Response:**

```json
{
  "success": true,
  "linkUrl": "https://payments.cashfree.com/order/...",
  "linkId": "unique_link_id",
  "message": "Payment link generated successfully"
}
```

## Form Fields

The application includes the following form fields matching the n8n workflow:

- **Student Name** (required)
- **Student Email ID** (required, email validation)
- **Student Phone Number** (required)
- **Payable Amount (Rs)** (required, number)
- **Amount Pitched (Rs)** (optional, number)
- **Referral ID** (required)

## Workflow

1. User fills out the form
2. Form data is validated using Zod
3. Unique ID is generated
4. Request is sent to Cashfree API
5. Payment link is generated
6. Data is saved to Google Sheets
7. Success response is returned to user

## Error Handling

- Form validation errors are displayed inline
- API errors are shown to the user
- Google Sheets failures don't block payment link generation
- Comprehensive error logging

## Security

- Environment variables for sensitive data
- Input validation and sanitization
- HTTPS enforcement in production
- CORS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Environment Variables

Create a `.env` file or set these in your Vercel dashboard:

```
# Cashfree API
CASHFREE_API_URL=https://api.cashfree.com/pg/links
CASHFREE_API_VERSION=2025-01-01
CASHFREE_CLIENT_ID=your_client_id
CASHFREE_CLIENT_SECRET=your_client_secret

# Google Sheets (Service Account)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_DOCUMENT_ID=your_spreadsheet_id
GOOGLE_SHEETS_SHEET_NAME=your_sheet_name
```

- Do NOT wrap the private key in extra quotes in the Vercel dashboard.
- If using Vercel, set these in Project Settings > Environment Variables.
