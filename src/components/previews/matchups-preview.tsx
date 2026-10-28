"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

export function MatchupsPreview({ labels }: { labels: Dictionary["previews"]["matchups"] }) {
  const matchups = [
    { opponent: "FIZZ", edge: labels.earlyEdge, value: 62, note: labels.notes[0] },
    { opponent: "SYNDRA", edge: labels.skillWindow, value: 48, note: labels.notes[1] },
  ];
  const [index, setIndex] = useState(0);
  const matchup = matchups[index];
  return (
    <div className="matchup-preview" aria-label={labels.label}>
      <div className="matchup-head"><span>{labels.head}</span><button onClick={() => setIndex(index ? 0 : 1)}>{labels.switch}</button></div>
      <div className="champions"><div className="champ akali"><span>AK</span><b>AKALI</b></div><span className="versus">VS</span><div className="champ fizz"><span>{matchup.opponent.slice(0, 2)}</span><b>{matchup.opponent}</b></div></div>
      <div className="advantage"><div><span>{matchup.edge}</span><strong>{matchup.value}%</strong></div><div className="advantage-bar"><motion.i animate={{ width: `${matchup.value}%` }} transition={{ type: "spring", stiffness: 140, damping: 22 }} /></div></div>
      <div className="power-spikes"><span>{labels.powerSpikes}</span><div><b>LVL 3</b><b className="on">LVL 6</b><b>ITEM 1</b></div></div>
      <p className="tactical-note">{labels.tacticalPrefix} {matchup.note}</p>
    </div>
  );
}
