"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

type ZindiLabels = Dictionary["previews"]["zindi"];

export function ZindiPreview({ labels }: { labels: ZindiLabels }) {
  const screens = [labels.tabs.today, labels.tabs.routine, labels.tabs.match] as const;
  const [screen, setScreen] = useState<(typeof screens)[number]>(screens[0]);

  return (
    <div className="zindi-phone" aria-label={labels.label}>
      <div className="phone-speaker" />
      <div className="phone-content">
        <div className="zindi-topline"><span>ZINDI</span><Sparkles size={13} /></div>
        <div className="zindi-tabs" role="tablist" aria-label="Zindi preview screens">
          {screens.map((item) => <button key={item} onClick={() => setScreen(item)} className={screen === item ? "active" : ""}>{item}</button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {screen === labels.tabs.today && <div className="zindi-screen"><p className="zindi-kicker">{labels.greeting}</p><h4>{labels.heading}</h4><div className="zindi-score"><span>{labels.compatibility}</span><strong>86<em>/100</em></strong><i /></div><div className="zindi-product"><div className="zindi-product-bottle" /><div><b>{labels.product}</b><small>{labels.productNote}</small></div></div></div>}
            {screen === labels.tabs.routine && <div className="zindi-screen"><p className="zindi-kicker">{labels.routineKicker}</p><h4>{labels.routineHeading}</h4>{labels.steps.map((step, index) => <div className="zindi-step" key={step}><span>0{index + 1}</span><b>{step}</b><small>{index === 1 ? labels.product : labels.ready}</small></div>)}</div>}
            {screen === labels.tabs.match && <div className="zindi-screen"><p className="zindi-kicker">{labels.matchKicker}</p><h4>{labels.matchHeading}</h4><div className="zindi-orbit"><span>Niacinamide</span><i>+</i><span>Ceramide</span></div><p className="zindi-note">{labels.matchNote}</p></div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
