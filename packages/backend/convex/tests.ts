import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getUserId } from "./notes";

export const getRecentTests = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;
    const tests = await ctx.db
      .query("tests")
      .withIndex("by_patient", (q: any) => q.eq("patientId", userId))
      .collect();
    tests.sort((a: any, b: any) => b._creationTime - a._creationTime);
    return tests;
  },
});

export const addTest = mutation({
  args: {
    testName: v.string(),
    result: v.string(),
  },
  handler: async (ctx, { testName, result }) => {
    const patientId = await getUserId(ctx);
    if (!patientId) throw new Error("User not found");
    return await ctx.db.insert("tests", { patientId, testName, result });
  },
});
