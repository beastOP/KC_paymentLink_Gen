# Setup Guide - Payment Link Generator

This guide will help you set up the Payment Link Generator application step by step.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- Cashfree account (for payment processing)
- Google Cloud account (for Google Sheets integration)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd payment-link-generator

# Install dependencies
npm install
```

## Step 2: Cashfree Setup

1. **Create Cashfree Account:**

   - Go to [Cashfree](https://www.cashfree.com/)
   - Sign up for a merchant account
   - Complete KYC verification

2. **Get API Credentials:**
   - Login to Cashfree Dashboard
   - Go to Settings → API Keys
   - Copy your Client ID and Client Secret
   - Note: Use test credentials for development

## Step 3: Google Sheets Setup

1. **Create Google Cloud Project:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sheets API

2. **Create Service Account:**

   - Go to IAM & Admin → Service Accounts
   - Click "Create Service Account"
   - Give it a name like "payment-link-generator"
   - Grant "Editor" role
   - Create and download JSON key file

3. **Setup Google Sheet:**
   - Create a new Google Sheet
   - Share it with your service account email (found in JSON file)
   - Note the Spreadsheet ID from the URL
   - Create a sheet named "Payment sheet"

## Step 4: Environment Variables

Create a `.env.local` file in the root directory:

```env
# Cashfree API Credentials
CASHFREE_CLIENT_ID=your_cashfree_client_id_here
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret_here

# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from JSON file\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEET_NAME=Payment sheet
```

## Step 5: Test the Application

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
# Test the form at http://localhost:3000/test
```

## Step 6: Deploy to Vercel

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   # Login to Vercel
   vercel login

   # Deploy to production
   npm run deploy
   ```

3. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from your `.env.local` file

## Step 7: Verify Deployment

1. Test the form on your deployed URL
2. Check that payment links are generated
3. Verify data is saved to Google Sheets
4. Test error handling with invalid data

## Troubleshooting

### Common Issues

1. **Cashfree API Errors:**

   - Verify credentials are correct
   - Check if you're using test/production credentials
   - Ensure account is activated

2. **Google Sheets Errors:**

   - Verify service account has access to the sheet
   - Check private key format (should include \n)
   - Ensure Google Sheets API is enabled

3. **Build Errors:**
   - Run `npm run type-check` to check TypeScript errors
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

### Environment Variable Issues

- Make sure `.env.local` is in the root directory
- Restart development server after changing environment variables
- Check for typos in variable names
- Ensure no spaces around `=` in `.env.local`

### Deployment Issues

- Verify all environment variables are set in Vercel
- Check build logs for errors
- Ensure repository is connected to Vercel
- Verify domain settings if using custom domain

## Security Considerations

1. **Never commit `.env.local` to version control**
2. **Use environment variables for all sensitive data**
3. **Regularly rotate API keys**
4. **Monitor API usage and logs**
5. **Use HTTPS in production**

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the application logs
3. Verify all setup steps are completed
4. Check API documentation for Cashfree and Google Sheets
5. Create an issue in the repository

## Next Steps

After successful setup:

1. Customize the form styling
2. Add additional validation rules
3. Implement webhook notifications
4. Add analytics and monitoring
5. Set up automated testing
