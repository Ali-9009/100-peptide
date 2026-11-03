export const runtime = "nodejs";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Integrate your trusted backend using this server-side route.
// TRACKING_API_URL must be an operator-controlled HTTPS API that verifies BOTH order number and customer email.
export async function POST(request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 3000) return Response.json({ error: "Invalid request." }, { status: 413 });
    const body = await request.json();
    const orderNumber = String(body.orderNumber || "").trim();
    const email = String(body.email || "").trim();
    if (!orderNumber || orderNumber.length > 80 || !EMAIL_RE.test(email) || email.length > 180) return Response.json({ error: "Enter a valid order number and email." }, { status: 400 });
    if (!process.env.TRACKING_API_URL) return Response.json({ error: "Live order tracking is not connected yet. Use ‘See animated demo’ to preview the tracking experience." }, { status: 503 });
    const apiUrl = new URL(process.env.TRACKING_API_URL);
    if (apiUrl.protocol !== "https:") return Response.json({ error: "Tracking integration requires HTTPS." }, { status: 503 });
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 9000);
    let upstream;
    try {
      upstream = await fetch(apiUrl, { method:"POST", cache:"no-store", signal:abort.signal, headers:{ "Content-Type":"application/json", ...(process.env.TRACKING_API_TOKEN ? {Authorization:`Bearer ${process.env.TRACKING_API_TOKEN}`} : {}) }, body:JSON.stringify({orderNumber,email}) });
    } finally { clearTimeout(timeout); }
    if (upstream.status === 404 || upstream.status === 403) return Response.json({ error: "No matching order found. Check your reference and email." }, { status: 404 });
    if (!upstream.ok) return Response.json({ error: "Tracking is temporarily unavailable. Please try again later." }, { status: 502 });
    const result = await upstream.json();
    // Return only allowlisted non-sensitive fields. The trusted upstream must authorize order lookup.
    const order = result.order || result;
    if (!order || typeof order !== "object") return Response.json({ error: "Tracking details are not available yet." }, { status: 502 });
    const text = (value) => String(value || "").slice(0,160);
    const stage = Number.isInteger(order.stage) && order.stage >= 0 && order.stage <= 3 ? order.stage : null;
    return Response.json({ order: { stage, status:text(order.status || "Status available"), carrier:text(order.carrier), trackingNumber:text(order.trackingNumber), origin:text(order.origin), eta:text(order.eta), updatedAt:text(order.updatedAt) } }, { headers: {"Cache-Control":"no-store"} });
  } catch (error) { if (error instanceof SyntaxError) return Response.json({ error:"Invalid request." }, { status:400 }); console.error("Tracking proxy error",error?.name || "unknown");return Response.json({ error:"Tracking is temporarily unavailable." }, { status:502 }); }
}
