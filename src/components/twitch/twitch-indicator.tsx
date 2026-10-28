"use client";

import { ArrowUpRight, Radio } from "lucide-react";
import { social } from "@/config/social";
import type { Dictionary } from "@/i18n/types";

export function TwitchIndicator({ labels }: { labels: Dictionary["twitch"] }) {
  const isLive = social.streamStatus === "LIVE";
  const label = isLive ? labels.live : social.streamStatus === "OFFLINE" ? labels.offline : labels.unknown;
  return (
    <a className={`twitch-indicator ${isLive ? "live" : ""}`} href={social.twitch} target="_blank" rel="noreferrer" aria-label={`${label}: ${labels.ariaVisit}`}>
      <span className="twitch-status"><i />{label}</span>
      <span>{labels.visit} <ArrowUpRight size={14} /></span>
      <Radio size={17} className="twitch-icon" />
    </a>
  );
}
