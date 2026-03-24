// exportsStore.js
// Simple in-memory store for video exports (good for testing)
const exportsStore = new Map();

/**
 * Create a new export record
 * @param {string} exportId
 * @param {string} userId
 */
export async function createExportWithId(exportId, userId) {
  exportsStore.set(exportId, {
    exportId,
    userId,
    status: "rendering",
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return exportsStore.get(exportId);
}

/**
 * Update an existing export record
 * @param {string} exportId
 * @param {object} updates
 */
export async function updateExport(exportId, updates) {
  if (!exportsStore.has(exportId)) {
    throw new Error("Export not found: " + exportId);
  }
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

/**
 * Get export status by ID
 * @param {string} exportId
 */
export async function getExportStatus(exportId) {
  return exportsStore.get(exportId) || null;
}