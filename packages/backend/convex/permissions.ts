import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

export const can = async (
  ctx: { db: any; auth: Auth },
  permission: string,
): Promise<boolean> => {
  const userId = await getUserId(ctx);
  if (!userId) return false;
  const existing = await ctx.db
    .query("userPermissions")
    .withIndex("by_user_permission", (q: any) =>
      q.eq("userId", userId).eq("permission", permission),
    )
    .unique();
  return !!existing;
};

export const grantPermission = mutation({
  args: {
    userId: v.string(),
    permission: v.string(),
  },
  handler: async (ctx, { userId, permission }) => {
    await ctx.db.insert("userPermissions", { userId, permission });
  },
});

export const revokePermission = mutation({
  args: {
    userId: v.string(),
    permission: v.string(),
  },
  handler: async (ctx, { userId, permission }) => {
    const existing = await ctx.db
      .query("userPermissions")
      .withIndex("by_user_permission", (q: any) =>
        q.eq("userId", userId).eq("permission", permission),
      )
      .unique();
    if (existing?._id) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const listPermissions = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("userPermissions")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .collect();
  },
});
