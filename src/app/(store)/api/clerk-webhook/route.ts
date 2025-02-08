import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { message: "Error: Missing Svix headers" },
      {
        status: 400,
      }
    );
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return NextResponse.json(
      { message: "Error: Verification error" },
      {
        status: 400,
      }
    );
  }

  // Handle the user.created event
  if (evt.type === "user.created") {
    const { id, first_name, last_name, email_addresses } = evt.data;
    const primaryEmail = email_addresses.find(
      (email) => email.id === evt.data.primary_email_address_id
    );

    if (!primaryEmail) {
      console.error("No primary email found for user");
      return NextResponse.json(
        { message: "Error: No primary email found" },
        { status: 400 }
      );
    }

    try {
      // Create a new customer document in Sanity
      await backendClient.create({
        _type: "customer",
        clerkId: id,
        fullName: `${first_name} ${last_name}`,
        email: primaryEmail.email_address,
        isAdmin: false, // Set default value for admin
      });

      console.log(`Created Sanity document for user ${id}`);
      return NextResponse.json(
        { message: "User created in Sanity" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error creating Sanity document:", error);
      return NextResponse.json(
        { message: "Error creating Sanity document" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
