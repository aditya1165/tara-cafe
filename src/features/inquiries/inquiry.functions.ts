import { createServerFn } from "@tanstack/react-start";

import { inquirySchema } from "./inquiry.schema";
import { saveInquiry } from "./inquiry.server";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator(inquirySchema)
  .handler(async ({ data }) => {
    // Silently accept bot submissions caught by the honeypot without storing them.
    if (data.website) return { success: true };

    await saveInquiry(data);
    return { success: true };
  });
