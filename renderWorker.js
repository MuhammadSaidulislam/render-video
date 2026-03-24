import { renderSkeletonExport } from "./render.js";

process.on("message", async ({ payload, exportId }) => {
  try {
    const result = await renderSkeletonExport(payload, exportId);
    process.send({ status: "done", url: result.url });
    process.exit(0);
  } catch (err) {
    process.send({ status: "error", error: err.message });
    process.exit(1);
  }
});