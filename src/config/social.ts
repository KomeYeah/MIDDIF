export type StreamStatus = "LIVE" | "OFFLINE" | "UNKNOWN";

export const social = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/yea-m-boya-8674242a6/",
  twitch: "https://www.twitch.tv/its_kome",
  streamStatus: "UNKNOWN" as StreamStatus,
} as const;
