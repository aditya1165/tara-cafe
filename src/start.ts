import { createStart, createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const sameOriginMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();

  if (request.method !== "GET" && request.method !== "HEAD") {
    const requestOrigin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");
    const expectedOrigin = new URL(request.url).origin;
    const isCrossSite = fetchSite === "cross-site" || fetchSite === "same-site";

    if (isCrossSite || (requestOrigin && requestOrigin !== expectedOrigin)) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [sameOriginMiddleware, errorMiddleware],
}));
