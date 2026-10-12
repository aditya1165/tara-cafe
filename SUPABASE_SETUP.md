# Supabase Inquiry Storage Setup

## 1. Create a Supabase project

Create a project in the Supabase dashboard and wait for its database to finish provisioning.

## 2. Create the inquiry table

Open the Supabase SQL Editor and run the contents of:

`supabase/migrations/20261004000000_create_catering_inquiries.sql`

The migration creates the `catering_inquiries` table, enables Row Level Security, removes browser-role access, and grants access only to the server role.

## 3. Configure local environment variables

Copy `.env.example` to `.env.local`, then obtain the values from the Supabase project's **Connect** dialog:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=sb_secret_replace_me
```

Use a current Supabase secret key. A legacy `SUPABASE_SERVICE_ROLE_KEY` is also supported by the server integration, but the current secret-key format is preferred.

Never commit `.env.local` or put the secret key in a `VITE_`-prefixed variable. The secret bypasses Row Level Security and must remain server-only.

## 4. Run and verify

Start the site, submit a valid inquiry, and confirm that a new row appears in **Table Editor → catering_inquiries**.

The website never reads inquiry rows. Staff should review and update their statuses from the authenticated Supabase dashboard.

## Remaining production work

- Add rate limiting and CAPTCHA/Turnstile protection.
- Add staff email notifications without including unnecessary sensitive information.
- Define a data-retention and deletion policy.
- Test the deployed environment with its production secrets.
