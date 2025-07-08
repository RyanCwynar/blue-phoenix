import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getUserId } from "./notes";
import { can } from "./permissions";

const isDoctorOfPatient = async (
  ctx: any,
  doctorId: string,
  patientId: string,
) => {
  const existing = await ctx.db
    .query("doctorPatients")
    .withIndex("by_patient_doctor", (q: any) =>
      q.eq("patientId", patientId).eq("doctorId", doctorId),
    )
    .unique();
  return !!existing;
};

export const addDoctorForPatient = mutation({
  args: { patientId: v.string(), doctorId: v.string() },
  handler: async (ctx, { patientId, doctorId }) => {
    const userId = await getUserId(ctx);
    if (userId !== patientId) throw new Error("Unauthorized");
    await ctx.db.insert("doctorPatients", { patientId, doctorId });
  },
});

export const createAnalysis = mutation({
  args: { patientId: v.string(), content: v.string() },
  handler: async (ctx, { patientId, content }) => {
    const doctorId = await getUserId(ctx);
    if (!doctorId) throw new Error("User not authenticated");
    if (!(await can(ctx, "doctor"))) throw new Error("Not authorized");
    if (!(await isDoctorOfPatient(ctx, doctorId, patientId))) {
      throw new Error("Doctor not associated with patient");
    }
    return await ctx.db.insert("analysis", { patientId, doctorId, content });
  },
});

export const getPatientAnalysis = query({
  args: { patientId: v.optional(v.string()) },
  handler: async (ctx, { patientId }) => {
    const userId = patientId ?? (await getUserId(ctx));
    if (!userId) return null;
    const analyses = await ctx.db
      .query("analysis")
      .withIndex("by_patient", (q: any) => q.eq("patientId", userId))
      .collect();
    analyses.sort((a: any, b: any) => b._creationTime - a._creationTime);
    return analyses;
  },
});
