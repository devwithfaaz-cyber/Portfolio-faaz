import Image from "next/image";

interface CartoonProfileProps {
  className?: string;
}

export function CartoonProfile({ className = "" }: CartoonProfileProps) {
  return (
    <figure
      className={`cartoon-profile group relative isolate mx-auto aspect-[200/210] shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 200 210"
        className="cartoon-profile__mascot absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="198" rx="35" ry="5" fill="var(--border)" opacity="0.55" />
        <path d="M72 45 62 21l24 15M128 45l10-24-24 15" fill="var(--accent)" stroke="#35694a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M62 62C43 47 30 56 33 75c2 11 13 17 28 16M138 62c19-15 32-6 29 13-2 11-13 17-28 16" fill="#83c89e" stroke="#35694a" strokeWidth="3" />
        <path d="M82 158c-5 9-5 18-1 24m37-24c5 9 5 18 1 24" fill="none" stroke="#35694a" strokeWidth="10" strokeLinecap="round" />
        <path d="M65 179c-5 0-9 4-9 9 0 4 4 7 10 7h20c4 0 7-3 7-7 0-5-4-9-9-9m30 0c-5 0-9 4-9 9 0 4 4 7 10 7h20c4 0 7-3 7-7 0-5-4-9-9-9" fill="#83c89e" stroke="#35694a" strokeWidth="3" />
        <path d="M65 111c-13 3-19 11-18 20 1 7 7 10 16 9m72-29c13 3 19 11 18 20-1 7-7 10-16 9" fill="none" stroke="#35694a" strokeWidth="12" strokeLinecap="round" />
        <path d="M66 111c-9 7-12 23-8 39 4 17 19 24 42 24s38-7 42-24c4-16 1-32-8-39" fill="#83c89e" stroke="#35694a" strokeWidth="3" />
        <path d="M76 145c8-5 40-5 48 0l-3 19c-10 7-32 7-42 0z" fill="var(--accent)" opacity="0.92" />
        <path d="M61 48c8-13 22-20 39-20s31 7 39 20c9 14 10 32 3 47-6 12-20 18-42 18s-36-6-42-18c-7-15-6-33 3-47Z" fill="#a2dcb4" stroke="#35694a" strokeWidth="3" />
        <path d="M76 68c4-4 10-4 14 0m20 0c4-4 10-4 14 0" fill="none" stroke="#35694a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="83" cy="76" rx="4" ry="5" fill="#18251d" />
        <ellipse cx="117" cy="76" rx="4" ry="5" fill="#18251d" />
        <circle cx="84" cy="74" r="1.3" fill="white" />
        <circle cx="118" cy="74" r="1.3" fill="white" />
      </svg>

      <Image
        src="/faaz-mirza.jpg"
        alt="Faaz Mirza"
        width={256}
        height={256}
        sizes="(max-width: 640px) 50px, (max-width: 1024px) 56px, 78px"
        className="absolute left-1/2 top-[37%] z-10 aspect-square w-[44%] -translate-x-1/2 rounded-full border-[3px] border-[var(--surface)] object-cover object-[center_25%] shadow-[0_2px_12px_var(--accent-border)] transition-shadow duration-300 group-hover:shadow-[0_4px_18px_var(--accent-border)]"
      />

      <svg
        viewBox="0 0 200 210"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-hidden="true"
      >
        <path d="M61 111c-8 3-13 0-15-5-2-5 1-10 6-11 5-1 10 2 12 7l3 7m72 2c8 3 13 0 15-5 2-5-1-10-6-11-5-1-10 2-12 7l-3 7" fill="#83c89e" stroke="#35694a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m51 101 4 3m91-3-4 3" fill="none" stroke="#35694a" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <figcaption className="sr-only">
        A playful cartoon enemy holding Faaz Mirza&apos;s circular profile picture.
      </figcaption>
    </figure>
  );
}