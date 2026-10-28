"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

export function AgentPreview({ labels }: { labels: Dictionary["previews"]["agent"] }) {
  const [running, setRunning] = useState(false);
  return (
    <div className="agent-preview" aria-label={labels.label}>
      <div className="agent-head"><span>{labels.head}</span><button onClick={() => setRunning((value) => !value)}><Play size={11} fill="currentColor" /> {running ? labels.pause : labels.run}</button></div>
      <div className="agent-flow">
        {labels.agents.map((agent, index) => <div className="agent-row" key={agent}><div className={`agent-node ${running && index < 3 ? "is-active" : ""}`}><i /> <span>{agent}</span><b>{running && index < 3 ? labels.working : index === 3 && running ? labels.queued : labels.standby}</b></div>{index < labels.agents.length - 1 && <div className="agent-link"><motion.i animate={running ? { y: [0, 26], opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.2 }} /></div>}</div>)}
      </div>
      <AnimatePresence>{running && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{labels.simulation}</motion.p>}</AnimatePresence>
    </div>
  );
}
