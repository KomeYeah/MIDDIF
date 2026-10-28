import { TwitchIndicator } from "@/components/twitch/twitch-indicator";
import type { Dictionary } from "@/i18n/types";

export function AboutSection({ dictionary }: { dictionary: Dictionary }) {
  const { about } = dictionary;
  const disciplines: Array<[string, string[]]> = [[about.finance, about.skills.finance], [about.technology, about.skills.technology], [about.entrepreneurship, about.skills.entrepreneurship]];
  return (
    <section id="about" className="about-section section-shell" aria-labelledby="about-title">
      <div className="section-meta"><span>01 / {about.profile}</span><span>{about.location}</span></div>
      <h2 id="about-title"><span>{about.finance}</span><span>{about.technology}</span><span>{about.entrepreneurship}</span></h2>
      <div className="about-grid">
        <div><p className="about-copy">{about.copy}</p><TwitchIndicator labels={dictionary.twitch} /></div>
        <div className="discipline-list">
          {disciplines.map(([area, skills], index) => <article key={area}><span>0{index + 1}</span><div><h3>{area}</h3>{skills.map((skill) => <p key={skill}>{skill}</p>)}</div></article>)}
        </div>
      </div>
    </section>
  );
}
