import type { Dictionary } from "@/i18n/types";

export function NepsitPreview({ labels }: { labels: Dictionary["previews"]["nepsit"] }) {
  return (
    <div className="nepsit-preview" aria-label={labels.label}>
      <div className="nepsit-header"><span>NEPSIT</span><span>001—∞</span></div>
      <div className="nepsit-orbit"><i /><i /><i /><b>N</b></div>
      <div className="nepsit-footer"><span>{labels.formation}</span><span>◌</span></div>
    </div>
  );
}
