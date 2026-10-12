# Tara Cafe Website Context

Last updated: October 1, 2026

## Project Summary

Tara Cafe is an upcoming Los Angeles catering business. The website is currently a polished visual prototype for the future catering service rather than a launch-ready production site.

The site should remain a single-page experience with its existing warm editorial theme. Its primary business goals are:

1. Generate catering inquiries.
2. Encourage prospective customers to call.
3. Eventually support online ordering.

At launch, the business will offer catering only. Delivery is planned for a later phase.

## Confirmed Business Direction

- **Business name:** Tara Cafe is confirmed.
- **Business stage:** Upcoming business.
- **Primary offering:** Burmese catering.
- **Primary market:** Los Angeles.
- **Service priorities:** Weddings and galas, corporate and social events, and private suppers should receive equal emphasis.
- **Brand direction:** Keep the existing visual theme.
- **Site structure:** Keep the website as one page.
- **Food positioning:** Homemade food based on authentic Burmese recipes.
- **Online ordering:** Do not launch ordering yet. Position it as "coming soon" while catering inquiries and phone calls remain the immediate conversion paths.
- **Delivery:** Not currently available. Delivery will be rolled out later.
- **Burmese language:** Keep the existing Burmese text for now and review its accuracy later.
- **Public contact details:** Do not display a phone number, email address, website address, or social handles. Collect customer information through the inquiry form and have Tara Cafe follow up privately.
- **Full menu:** Provide the catering menu as a linked PDF from a "View Menu" button at the end of the menu section.

## Placeholder Content

All current operational details should be treated as placeholders until verified, including:

- Phone number
- Email address
- Website domain
- Instagram handle
- Facebook link
- Service area
- Booking lead times
- Minimum order requirements
- Event capacity
- Customer testimonials
- Business history and origin story
- Photographs
- Menu descriptions where not yet verified
- Claims about preparation methods or ingredients

These details must be reviewed before the website is published.

## Content Integrity Notes

- The previous testimonials were generated and were not statements from real customers. They have been removed from the page.
- The family photograph is not a real Tara Cafe family photograph. It remains a temporary visual asset, but its alt text no longer presents it as an authentic historical image.
- All food, event, and gallery images are placeholders.
- The previous story about starting from a folding table in an Echo Park kitchen was fictional and has been removed.
- The replacement story focuses on homemade food, authentic recipes, patience, generosity, and shared meals without inventing a specific business history.
- Real testimonials should only be added after customers have provided them and approved their use.
- Real founder, family, team, food, and event photography should eventually replace the current placeholder assets.

## Current Page Structure

The homepage currently contains:

1. Sticky navigation
2. Hero and primary call to action
3. Scrolling Burmese food marquee
4. Brand and food story
5. Catering services
6. Featured dishes
7. Image gallery
8. "Why Tara Cafe" value proposition
9. Frequently asked questions
10. Catering inquiry section and form
11. Footer and social links

## Current Messaging

The current positioning centers on:

- Homemade Burmese food
- Authentic recipes
- Warm, generous hospitality
- Menus tailored to each gathering
- Small-batch preparation
- Weddings, corporate events, and private suppers

The former testimonial section has been replaced with three value cards:

- Homemade at Heart
- Authentic Recipes
- Made for Your Table

The main hero action now says **Plan Your Event** and links to the inquiry section. The contact area includes an **Online ordering coming soon** notice.

## Menu Requirements for a Later Phase

The site will need a more complete catering menu in a future iteration. Planned requirements include:

- Full dish list
- Catering packages or service formats
- Pricing or starting prices
- Minimum spends or minimum quantities
- Dietary labels beside individual dishes
- Dietary restriction information
- Allergen information
- Vegan, vegetarian, and gluten-free indicators where accurate
- Potential downloadable menu or PDF
- Clear distinction between catering and future delivery offerings

No menu expansion should be treated as final until the dishes, ingredients, pricing, portions, and dietary claims are verified.

## Inquiry and Ordering Strategy

The intended conversion paths are catering inquiries, calls, and eventual online ordering.

For the current phase:

- Catering inquiries are the primary website action.
- Direct phone and email contact details are intentionally not public; Tara Cafe will follow up from submitted inquiries.
- Online ordering is marked as coming soon.
- The meaning of online ordering still needs to be finalized. Possibilities include catering package checkout, catering deposits, or future individual meal delivery.
- The inquiry form is wired to a validated TanStack server function that stores submissions in a private Supabase table once the project URL, server secret, and database migration are configured.
- The public page intentionally does not expose direct contact details; the inquiry workflow will be the contact channel.

Remaining form infrastructure work includes:

- Email notifications
- Automatic customer confirmation
- Production rate limiting and CAPTCHA/Turnstile protection
- Data-retention and deletion policies
- CRM or mailing-list integration

## Deferred Business Decisions

The following topics are intentionally deferred:

- Whether the website should say "now accepting bookings" or "launching soon"
- Final phone number, email, domain, and social profiles
- Physical location, pickup point, kitchen information, and business hours
- Google Business Profile and map integration
- Exact Los Angeles service area
- Final booking lead times
- Guest-count limits
- Minimum order or minimum-spend rules
- Final menu and prices
- Delivery launch plan
- Online-ordering platform and workflow
- Real founder or family story
- Final photography
- Social media strategy
- Analytics and advertising configuration
- Privacy, terms, allergen, cancellation, deposit, service-charge, and accessibility information
- Hosting, production domain, and deployment workflow
- Burmese-language review or bilingual support

## Technical Architecture

- **Framework:** TanStack Start
- **UI runtime:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Build tool:** Vite
- **Routing:** TanStack Router with file-based routes
- **Data/query layer:** TanStack Query is configured, but the homepage currently has no remote data queries.
- **Runtime/deployment configuration:** Lovable's TanStack/Vite configuration with a custom server entry and Cloudflare-oriented build defaults.
- **Component library:** A standard shadcn/Radix UI component collection exists under `src/components/ui`, but the homepage currently uses custom markup instead of those components.
- **Package manager lockfile:** Bun

## Routes

- `/` — Main one-page Tara Cafe website
- `/sitemap.xml` — Server-generated sitemap

The generated TanStack route tree should not be edited manually.

## Design System

The existing design direction should be preserved:

- Warm cream background
- Cocoa-colored text
- Crimson primary color
- Cormorant Garamond display type
- Inter body type
- JetBrains Mono for small labels and metadata
- Editorial layouts
- Light paper texture
- Restrained borders and shadows
- Burmese script as a cultural visual accent
- Warm, intimate food and gathering photography
- Subtle fade and marquee animation

Dark-mode variables exist in the stylesheet, but there is currently no visible theme switcher.

## SEO and Metadata

The site currently includes:

- Page title and description
- Open Graph title and description
- Open Graph image
- Twitter summary-card metadata
- `robots.txt`
- A sitemap route

Outstanding SEO work includes:

- Set the production base URL in the sitemap. It is currently blank.
- Add the final canonical domain.
- Verify the Open Graph image behavior in production.
- Add Local Business or Food Establishment structured data when real business information is available.
- Add a favicon and complete social-sharing assets.
- Review all metadata after the final service area, menu, and launch positioning are known.

## Functional and Technical Gaps

- Supabase storage is implemented in code but will not accept real submissions until a Supabase project, database migration, and production environment secrets are configured.
- The phone number, email, domain, and social handle are placeholders.
- There is no online-ordering system.
- There is no CMS or editable content source.
- There is no email or CRM integration.
- There is no analytics or advertising tracking.
- There is no cookie or privacy-consent workflow.
- There is no structured local-business data.
- There is no menu download.
- Mobile navigation hides the section links and retains only the inquiry button.
- The project snapshot does not currently include installed dependencies.
- The workspace was not recognized as a Git checkout during review, so branch and commit history were unavailable.

## Analytics Requirements for a Later Phase

The owner wants analytics for all major conversions. A later discussion should cover tracking for:

- Page visits
- Catering inquiry starts
- Successful inquiry submissions
- Phone-number clicks
- Email clicks
- Menu views and downloads
- Online-ordering clicks and purchases
- Social-link clicks
- Advertising pixels and campaign attribution

The analytics platform has not yet been selected.

## Changes Already Made

The following changes were applied to `src/routes/index.tsx` during the initial review:

- Replaced the fictional testimonials with a "Why Tara Cafe" section.
- Added three non-testimonial value cards.
- Rewrote the story to focus on homemade food and authentic recipes.
- Removed the fictional Echo Park origin story.
- Changed the family image's alt text so it does not claim the image is a real vintage family photograph.
- Changed the hero action from "View Catering Menu" to "Plan Your Event."
- Linked the main hero action to the inquiry section.
- Added an "Online ordering coming soon" notice.
- Replaced the static hero image with an automatically rotating, manually controllable image carousel using placeholder food photography.
- Made the Tara Cafe name a prominent part of the hero above the Burmese translation.
- Expanded the inquiry form to collect customer contact preferences, event logistics, budget, service style, dietary needs, event details, and contact consent.
- Connected the inquiry form to a server-validated Supabase storage path with private database permissions, submission status feedback, and a honeypot field.
- Removed the delivery claim from the footer.
- Removed the delivery minimum from the FAQ.
- Rewrote the minimum-order answer so it does not claim an unverified threshold.

## Recommended Next Steps

When work resumes, the most useful order is:

1. Decide whether the public-facing site is accepting bookings or is in pre-launch mode.
2. Define the real founder and food story.
3. Build and verify the full menu, packages, prices, and dietary labels.
4. Confirm real contact details and service area.
5. Decide how catering inquiries should be delivered and processed.
6. Define what online ordering means for Tara Cafe.
7. Replace placeholder photography with approved real assets.
8. Configure analytics and conversion tracking.
9. Add the necessary legal, privacy, allergen, and policy content.
10. Finalize production hosting, domain, sitemap, and SEO details.

## Product TODOs

- Add a **Use my location** action beside the inquiry form's event-location field.
- Request browser location permission only after the customer explicitly clicks the action.
- Keep manual location entry available when permission is denied or geolocation is unavailable.
- Add venue and address autocomplete suggestions, biased toward Tara Cafe's final service area.
- Select and configure a location provider such as Google Places before enabling autocomplete.
- Store the selected venue name, formatted address, provider place ID, latitude, and longitude with the inquiry.
- Add the required provider attribution, privacy disclosure, and production API-key restrictions.
- Offer an optional 15-minute consultation scheduling step after a catering inquiry is successfully saved.
