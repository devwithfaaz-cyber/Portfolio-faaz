import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

type SocialPlatform = "github" | "linkedin" | "instagram" | "whatsapp";

const SOCIAL_PLATFORMS = {
  github: {
    label: "GitHub",
    Icon: FaGithub,
    className:
      "hover:border-[#24292f] hover:bg-[#24292f] hover:text-white hover:shadow-[0_4px_18px_rgba(36,41,47,0.2)]",
    iconClassName: "text-[var(--fg)] group-hover:text-white",
  },
  linkedin: {
    label: "LinkedIn",
    Icon: FaLinkedin,
    className:
      "hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-[0_4px_18px_rgba(10,102,194,0.2)]",
    iconClassName: "text-[#0A66C2] group-hover:text-white",
  },
  instagram: {
    label: "Instagram",
    Icon: FaInstagram,
    className:
      "hover:border-transparent hover:bg-[linear-gradient(135deg,#833AB4_0%,#E1306C_35%,#F77737_70%,#FCAF45_100%)] hover:text-white hover:shadow-[0_4px_18px_rgba(225,48,108,0.24)]",
    iconClassName: "text-[#E1306C] group-hover:text-white",
  },
  whatsapp: {
    label: "WhatsApp",
    Icon: FaWhatsapp,
    className:
      "hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_4px_18px_rgba(37,211,102,0.22)]",
    iconClassName: "text-[#25D366] group-hover:text-white",
  },
} satisfies Record<
  SocialPlatform,
  {
    label: string;
    Icon: typeof FaGithub | typeof FaWhatsapp;
    className: string;
    iconClassName: string;
  }
>;

export function SocialLinkButton({
  platform,
  href,
}: {
  platform: SocialPlatform;
  href: string;
}) {
  const { label, Icon, className, iconClassName } = SOCIAL_PLATFORMS[platform];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform === "whatsapp" ? "Open WhatsApp chat" : `Visit ${label} profile`}
      title={platform === "whatsapp" ? "Open WhatsApp chat" : `Visit ${label} profile`}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--fg-muted)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${className}`}
    >
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 transition-colors ${iconClassName}`}
      />
      <span>{label}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
