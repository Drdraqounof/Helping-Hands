// Approximation of the Helping Hands Solutions mark (red heart outline cradled by an orange hand).
// Swap for the real logo file (e.g. public/logo.png with next/image) when available.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 90"
      className={className}
      role="img"
      aria-label="Helping Hands Solutions logo"
    >
      <path
        d="M50 82 C20 60 6 44 6 26 C6 12 17 4 29 4 C39 4 46 10 50 18 C54 10 61 4 71 4 C83 4 94 12 94 26 C94 44 80 60 50 82 Z"
        fill="none"
        stroke="var(--brand-red)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M14 62 C26 74 44 80 58 76 C70 73 82 64 92 50 C86 52 80 56 72 58 C64 60 56 60 48 58 L40 56 C46 62 54 64 62 64 C52 70 34 68 14 62 Z"
        fill="#f39c33"
      />
      <text
        x="50"
        y="33"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="#111"
      >
        Helping Hands
      </text>
      <text
        x="50"
        y="44"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="#111"
      >
        Solutions
      </text>
    </svg>
  );
}
