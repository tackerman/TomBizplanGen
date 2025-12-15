# Quick Start Guide

## Fastest Way to Get Started (5 minutes)

### 1. Install Dependencies
```bash
cd business-plan-generator
npm install
```

### 2. Get an API Key
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy your API key

### 3. Set Up Environment
```bash
# Create .env.local file
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local
```

Replace `your_key_here` with your actual API key.

### 4. Run the App
```bash
npm run dev
```

Open http://localhost:3000

### 5. Test with Example Data

Use this sample company data to test:

**Company Name:** TechFlow Solutions

**Industry:** SaaS - Project Management Software

**Company Stage:** Growth Stage

**Strategic Goals:**
```
Increase market share by 25% in the next 12 months
Launch enterprise tier with advanced features
Expand to European markets
Achieve profitability by Q4
```

**Strengths:**
```
Strong product-market fit with SMB customers
High customer retention rate (92%)
Experienced founding team
Solid technology infrastructure
```

**Weaknesses:**
```
Limited enterprise sales experience
Small marketing budget
No European presence yet
Customer support team needs scaling
```

**Opportunities:**
```
Growing demand for remote work tools
Competitors facing quality issues
Enterprise market largely untapped
Strategic partnership opportunities
```

**Threats:**
```
Well-funded competitors entering market
Economic uncertainty affecting B2B spending
Rapid technology changes
Potential data privacy regulations
```

Click "Generate Business Plan" and wait 15-30 seconds for your comprehensive plan!

## What You'll Get

Your business plan will include:

✅ Executive Summary (3-4 paragraphs)
✅ Strategic Priorities (3-5 priorities with SWOT alignment)
✅ Action Plans (detailed initiatives with timelines, resources, metrics)
✅ Implementation Roadmap (phased over 12+ months)
✅ Risk Mitigation Strategies

## Next Steps

- Try your own company data
- Modify the schema in `lib/schema.ts` to add custom fields
- Customize the UI in `app/page.tsx`
- Deploy to Vercel for free hosting

## Troubleshooting

**Error: "Missing required fields"**
→ Fill out all fields marked with * in the form

**Error: "Failed to generate business plan"**
→ Check that your API key is correct in `.env.local`
→ Restart the dev server: Ctrl+C then `npm run dev`

**Slow generation**
→ Normal! Complex plans take 15-30 seconds
→ Consider adding a loading indicator with progress updates

## Cost

Each business plan costs approximately $0.10 in API credits.
Very affordable for development and low-volume use!
