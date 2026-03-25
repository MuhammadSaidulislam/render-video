// ─── PATCH for /app/api/skeleton/export/route.ts ─────────────────────────────
// Replace your existing Railway fetch call with this version.
// Add RENDER_SECRET to your Vercel environment variables (same value as Railway).

const workerRes = await fetch("https://render-video-production-7856.up.railway.app/render", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Secret shared between Vercel and Railway — set in both env configs
    "x-render-secret": process.env.RENDER_SECRET ?? "",
  },
  body: JSON.stringify(payload),
});
