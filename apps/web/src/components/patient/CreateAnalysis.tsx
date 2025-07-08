"use client";

import { useState } from "react";
import { api } from "@packages/backend/convex/_generated/api";
import { useMutation } from "convex/react";

interface Props {
  patientId: string;
}

export default function CreateAnalysis({ patientId }: Props) {
  const [content, setContent] = useState("");
  const create = useMutation(api.analysis.createAnalysis);

  const submit = async () => {
    await create({ patientId, content });
    setContent("");
  };

  return (
    <div className="my-4 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write analysis"
        className="w-full border p-2"
      />
      <button onClick={submit} className="button px-4 py-2 text-white">
        Submit Analysis
      </button>
    </div>
  );
}
