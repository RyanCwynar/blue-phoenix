"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import CreateAnalysis from "./CreateAnalysis";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();
  const patientId = user?.id ?? "";

  const tests = useQuery(api.tests.getRecentTests);
  const analyses = useQuery(api.analysis.getPatientAnalysis, { patientId });

  return (
    <div className="container p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Recent Tests</h2>
      <ul className="space-y-2">
        {tests?.map((t) => (
          <li key={t._id} className="border p-2">
            <strong>{t.testName}</strong>: {t.result}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Doctor Analysis</h2>
      <ul className="space-y-2">
        {analyses?.map((a) => (
          <li key={a._id} className="border p-2">
            {a.content}
          </li>
        ))}
      </ul>

      {/* Allow doctors to submit analysis */}
      {user && <CreateAnalysis patientId={patientId} />}
    </div>
  );
}
