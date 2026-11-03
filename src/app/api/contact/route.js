export const runtime = "nodejs";
const MAX_BODY = 12000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TOPICS = new Set(["General question", "Product information", "Order support", "Shipping & tracking", "Documentation / COA", "Other"]);
export async function POST(request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return Response.json({ error: "Message too large." }, { status: 413 });
    const raw = await request.text();
    if (raw.length > MAX_BODY) return Response.json({ error: "Message too large." }, { status: 413 });
    const body = JSON.parse(raw);
    if (body.website) return Response.json({ success: true }); // Bot honeypot
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const topic = String(body.topic || "").trim();
    const orderNumber = String(body.orderNumber || "").trim();
    const message = String(body.message || "").trim();
    if (!name || name.length > 100 || !EMAIL_RE.test(email) || email.length > 180 || !ALLOWED_TOPICS.has(topic) || message.length < 10 || message.length > 4000 || orderNumber.length > 64) {
      return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
    }
    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      return Response.json({ error: "Contact form delivery is not configured yet. Please connect the email service before launch." }, { status: 503 });
    }
    const safe = (value) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    const html = `<div style="font-family:Arial,sans-serif;color:#0b1b3f;line-height:1.7"><h2>New site contact request</h2><p><b>Name:</b> ${safe(name)}</p><p><b>Email:</b> ${safe(email)}</p><p><b>Topic:</b> ${safe(topic)}</p><p><b>Order:</b> ${safe(orderNumber || "None")}</p><p><b>Message:</b></p><p style="white-space:pre-wrap">${safe(message)}</p></div>`;
    const send = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], reply_to: email, subject: `Contact request: ${topic}`, html }), cache: "no-store" });
    if (!send.ok) {
      console.error("Contact delivery service returned", send.status);
      return Response.json({ error: "We could not deliver your message. Please try again later." }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof SyntaxError) return Response.json({ error: "Invalid request." }, { status: 400 });
    console.error("Contact route error", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
