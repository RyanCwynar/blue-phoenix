import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }),
  userPermissions: defineTable({
    userId: v.string(),
    permission: v.string(),
  })
    .index("by_user_permission", ["userId", "permission"])
    .index("by_user", ["userId"]),
});
