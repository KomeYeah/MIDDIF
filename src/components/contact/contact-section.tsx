import { ArrowUpRight } from "lucide-react";
import { personal } from "@/config/personal";
import { social } from "@/config/social";
import type { Dictionary } from "@/i18n/types";

export function ContactSection({ dictionary }: { dictionary: Dictionary }) {
  const links = [{ label: dictionary.contact.email, href: `mailto:${personal.email}` }, { label: "GitHub", href: social.github }, { label: "LinkedIn", href: social.linkedin }, { label: "Twitch", href: social.twitch }];
  return <section id="contact" className="contact-section section-shell" aria-labelledby="contact-title">
    <div className="section-meta"><span>02 / {dictionary.contact.section}</span><span>{dictionary.contact.availability}</span></div>
    <div className="contact-content"><h2 id="contact-title">{dictionary.contact.title}<br /><em>{dictionary.contact.emphasis}</em></h2><div className="contact-links">{links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"><span>{link.label}</span><ArrowUpRight size={19} /></a>)}</div></div>
    <div className="footer-line"><span>© {new Date().getFullYear()} {personal.name}</span><span>{dictionary.contact.footer}</span></div>
  </section>;
}
