# Setup Guide with Clerk Authentication

This guide will walk you through setting up the Business Plan Generator with full authentication, navigation header, and footer.

## What's Included

✅ **Custom Clerk Sign-up** with terms acceptance checkbox  
✅ **Navigation Header** with auth buttons and logo  
✅ **Footer** with links to legal pages  
✅ **Protected Routes** (optional - currently public)  
✅ **Additional Pages**: About, Privacy, Terms, Contact, Pricing  

## Quick Setup (10 minutes)

### 1. Install Dependencies

```bash
cd business-plan-generator
npm install
npm install @clerk/nextjs
```

### 2. Get Your API Keys

#### Anthropic API Key
1. Go to https://console.anthropic.com/
2. Sign in or create an account
3. Navigate to "API Keys"
4. Create a new key
5. Copy the key

#### Clerk API Keys
1. Go to https://dashboard.clerk.com/
2. Sign up or log in
3. Create a new application
4. Name it "Business Plan Generator"
5. Go to "API Keys" in the sidebar
6. Copy both keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
   - `CLERK_SECRET_KEY` (starts with `sk_`)

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

**Important:** Never commit `.env.local` to git!

### 4. Configure Clerk Application

In your Clerk Dashboard:

1. **Set URLs:**
   - Go to "Paths" in the sidebar
   - Set sign-in path: `/sign-in`
   - Set sign-up path: `/sign-up`
   - Set after sign-in URL: `/`
   - Set after sign-up URL: `/`

2. **Enable Email/Password:**
   - Go to "User & Authentication" → "Email, Phone, Username"
   - Enable "Email address"
   - Enable "Password"

3. **Configure Sessions (Optional):**
   - Go to "Sessions"
   - Adjust session timeout if needed

### 5. Run the Application

```bash
npm run dev
```

Open http://localhost:3000

## Testing Authentication

### Test Sign-up Flow
1. Click "Get Started" in the header
2. Check the "I agree to the Terms..." checkbox
3. Enter email and password
4. Complete sign-up
5. You should be redirected to the home page

### Test Sign-in Flow
1. Click "Sign In" in the header
2. Enter your credentials
3. Sign in

### Test Protected Features
Currently, all features work without authentication. See below to add protection.

## Project Structure

```
business-plan-generator/
├── app/
│   ├── about/page.tsx              # About page
│   ├── api/generate-plan/route.ts  # API endpoint
│   ├── contact/page.tsx            # Contact form
│   ├── pricing/page.tsx            # Pricing plans
│   ├── privacy/page.tsx            # Privacy policy
│   ├── sign-in/[[...sign-in]]/     # Custom sign-in
│   ├── sign-up/[[...sign-up]]/     # Custom sign-up with terms
│   ├── terms/page.tsx              # Terms of service
│   ├── layout.tsx                  # Root layout with header/footer
│   ├── page.tsx                    # Main business plan generator
│   └── globals.css                 # Global styles
├── components/
│   ├── Header.tsx                  # Navigation header
│   └── Footer.tsx                  # Footer with links
├── lib/
│   ├── promptBuilder.ts            # AI prompt builder
│   └── schema.ts                   # JSON schema
├── types/
│   └── businessPlan.ts             # TypeScript types
├── middleware.ts                   # Clerk middleware
└── .env.local                      # Your environment variables
```

## Making Features Require Authentication

### Option 1: Protect the Entire App
In `middleware.ts`, remove `/` from public routes:

```typescript
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/pricing',
  '/privacy',
  '/terms',
  '/contact',
]);
```

Now users must sign in to access the home page.

### Option 2: Protect Just the Generator
In `app/page.tsx`, wrap the form:

```typescript
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

// Inside your component:
<SignedIn>
  <form onSubmit={handleSubmit}>
    {/* form content */}
  </form>
</SignedIn>
<SignedOut>
  <div className="text-center p-8">
    <p className="text-gray-600 mb-4">Sign in to generate business plans</p>
    <SignInButton mode="modal">
      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
        Sign In to Continue
      </button>
    </SignInButton>
  </div>
</SignedOut>
```

### Option 3: Protect the API Route
In `app/api/generate-plan/route.ts`, add authentication check:

```typescript
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // ... rest of your code
}
```

## Customization

### Change App Colors
Edit `components/Header.tsx` and `components/Footer.tsx`:
- Replace `indigo-600` with your brand color
- Update the logo (`BP`) to your own

### Customize Sign-up Terms
Edit `app/sign-up/[[...sign-up]]/page.tsx`:
- Modify the terms text
- Change link destinations
- Add custom validation

### Add User Profile
Clerk provides a built-in profile component. Add a new route:

```typescript
// app/profile/page.tsx
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex justify-center py-12">
      <UserProfile />
    </div>
  );
}
```

## Troubleshooting

### "Clerk: Clock skew detected"
This was a common issue in your isoModeler project. To prevent it:

1. **System Clock:** Ensure your system clock is accurate
2. **Docker:** If using Docker, sync the container clock:
   ```bash
   docker run --privileged --rm alpine date -s "$(date -u '+%Y-%m-%d %H:%M:%S')"
   ```
3. **Development:** Restart your dev server if you see this error

### "Sign-up not working"
- Check that you accepted the terms checkbox
- Verify Clerk keys in `.env.local`
- Check Clerk Dashboard → Paths are configured correctly

### "API calls failing"
- Verify `ANTHROPIC_API_KEY` is correct
- Check you have API credits at https://console.anthropic.com/
- Look at browser console for detailed errors

### "Styling looks broken"
- Run `npm install` to ensure Tailwind is installed
- Restart dev server: Ctrl+C, then `npm run dev`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Deploy!

### Production Clerk Keys
For production, create a production instance in Clerk Dashboard and use those keys instead of test keys.

## Next Steps

- [ ] Customize the design to match your brand
- [ ] Add database to save business plans
- [ ] Implement plan history for users
- [ ] Add PDF export functionality
- [ ] Set up analytics
- [ ] Configure email notifications
- [ ] Add team collaboration features

## Support

If you run into issues:
1. Check the troubleshooting section above
2. Review Clerk documentation: https://clerk.com/docs
3. Check Anthropic API docs: https://docs.anthropic.com/

## Differences from isoModeler

This project improves on isoModeler's auth setup:
- ✅ Cleaner middleware configuration
- ✅ Better clock skew handling
- ✅ Simpler custom sign-up flow
- ✅ More consistent styling
- ✅ Better TypeScript types

Enjoy building! 🚀
