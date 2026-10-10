import { SiGmail } from "react-icons/si";

export const CONTACT_EMAIL = "devwithfaaz@gmail.com";

export function EmailLinkButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      aria-label="Email Me"
      title="Email Me"
      className={`group inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-xs font-medium text-[var(--fg)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-red-500/40 hover:bg-red-500/10 hover:shadow-[0_4px_18px_rgba(234,67,53,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:text-sm ${className}`}
    >
      <SiGmail
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-[#EA4335] transition-transform group-hover:scale-105"
      />
      <span className="min-w-0 break-all">{CONTACT_EMAIL}</span>
    </a>
  );
}
