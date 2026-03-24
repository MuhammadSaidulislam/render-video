// Simple in-memory store for exports
const exportsStore = new Map();

async function createExportWithId(exportId, userId) {
  exportsStore.set(exportId, {
    exportId,
    userId,
    status: "rendering",
    videoUrl: null,
    progress: 0,  // percentage
    error: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return exportsStore.get(exportId);
}

async function updateExport(exportId, updates) {
  if (!exportsStore.has(exportId)) throw new Error("Export not found: " + exportId);
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

async function getExportStatus(exportId) {
  return exportsStore.get(exportId) || null;
}