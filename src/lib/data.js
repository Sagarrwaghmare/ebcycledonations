// lib/data.ts
import { db } from "@/lib/db";

// --- DONOR FUNCTIONS ---

export async function getDonors() {
  try {
    // Fetch all users and include the count of their donation
    const donors = await db.user.findMany({
      include: {
        _count: {
          select: { donation: true },
        },
      },
      orderBy: { createdAt: 'desc' }
    });
    return donors;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch donors");
  }
}

export async function getDonorById(id) {
  try {
    const donor = await db.user.findUnique({
      where: { id: id },
      include: {
        // Also fetch the actual donation for this user
        donation: true, 
      },
    });
    return donor;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

// --- DONATION FUNCTIONS ---

export async function getAlldonation() {
  // Useful for the "Mountain View"
  return await db.donation.findMany({
    include: { user: true }, // Include who donated it
  });
}

// --- CONFIG FUNCTION (For your security check) ---

export async function getConfig() {
  // We assume row ID 1 is the main config
  return await db.config.findUnique({
    where: { id: 1 }
  });
}