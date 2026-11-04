import { NextResponse } from "next/server";

const COOKIE_NAME = "research_entry_confirmed";

export async function POST(request) {
  const formData = await request.formData();

  const ageConfirmed = formData.get("ageConfirmed") === "yes";
  const researchConfirmed =
    formData.get("researchConfirmed") === "yes";

  // Both confirmations are required.
  if (!ageConfirmed || !researchConfirmed) {
    return NextResponse.redirect(
      new URL("/entry?error=confirmation-required", request.url),
      303,
    );
  }

  const requestedPath = formData.get("next");

  let destination = "/";

  if (typeof requestedPath === "string") {
    const path = requestedPath.trim();

    if (
      path.startsWith("/") &&
      !path.startsWith("//") &&
      !path.includes("\\") &&
      !path.startsWith("/entry")
    ) {
      destination = path;
    }
  }

  const response = NextResponse.redirect(
    new URL(destination, request.url),
    303,
  );

  response.cookies.set({
    name: COOKIE_NAME,
    value: "yes",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}