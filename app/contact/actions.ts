"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim().slice(0, 2000);
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (field(formData, "company_website")) {
    return { status: "success", message: "Thanks! We'll be in touch soon." };
  }

  const data = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    organization: field(formData, "organization"),
    course: field(formData, "course"),
    groupSize: field(formData, "groupSize"),
    location: field(formData, "location"),
    message: field(formData, "message"),
  };

  const errors: ContactState["errors"] = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.message) errors.message = "Please tell us a little about what you need.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Organization: ${data.organization || "-"}`,
    `Course: ${data.course || "-"}`,
    `Group size: ${data.groupSize || "-"}`,
    `Location: ${data.location || "-"}`,
    "",
    data.message,
  ].join("\n");

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] Resend not configured. Submission:\n" + text);
      return {
        status: "success",
        message: "Thanks! (Dev mode: email not sent — logged to the server console.)",
      };
    }
    console.error("[contact] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return {
      status: "error",
      message: "Sorry, our form is temporarily unavailable. Please reach us on Facebook.",
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: data.email,
      subject: `New training inquiry from ${data.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return {
      status: "error",
      message: "Sorry, something went wrong sending your message. Please try again.",
    };
  }

  return { status: "success", message: "Thanks! We'll be in touch soon." };
}
