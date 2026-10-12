import type { InquiryInput } from "./inquiry.schema";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = (
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
  )?.trim();

  if (!url || !secretKey) {
    throw new Error("Supabase is not configured for inquiry submissions.");
  }

  return { url: url.replace(/\/$/, ""), secretKey };
}

export async function saveInquiry(inquiry: InquiryInput) {
  const { url, secretKey } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/catering_inquiries`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      authorization: `Bearer ${secretKey}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      preferred_contact: inquiry.preferredContact,
      event_date: inquiry.eventDate,
      event_type: inquiry.eventType,
      event_location: inquiry.eventLocation,
      guest_count: inquiry.guestCount,
      budget_range: inquiry.budgetRange ?? null,
      service_style: inquiry.serviceStyle ?? null,
      dietary_needs: inquiry.dietaryNeeds || null,
      event_details: inquiry.eventDetails,
      contact_consent: inquiry.contactConsent,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase inquiry insert failed", response.status, details);
    throw new Error("We couldn't save the inquiry. Please try again.");
  }
}
