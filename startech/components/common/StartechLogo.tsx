import React from "react";
import Link from "next/link";

interface StartechLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  linkHref?: string;
}

export const StartechLogo: React.FC<StartechLogoProps> = ({
  className = "",
  size = "md",
  linkHref = "/",
}) => {
  const iconSize = size === "sm" ? 22 : size === "lg" ? 36 : 28;
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  const content = (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      {/* Insignia Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:rotate-45"
        >
          {/* Orbital rings */}
          <circle
            cx="20"
            cy="20"
            r="17"
            stroke="#55E6FF"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="opacity-70"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="18"
            ry="7"
            transform="rotate(-30 20 20)"
            stroke="#4776FF"
            strokeWidth="1.2"
            className="opacity-90"
          />
          {/* Central Moon body */}
          <circle cx="20" cy="20" r="8" fill="#0D1422" stroke="#55E6FF" strokeWidth="1.8" />
          {/* Micro lunar crater detail */}
          <circle cx="18" cy="19" r="2.2" fill="#55E6FF" className="opacity-90" />
          <circle cx="23" cy="22" r="1.4" fill="#55E6FF" className="opacity-60" />
          {/* Reticle point */}
          <line x1="20" y1="1" x2="20" y2="6" stroke="#55E6FF" strokeWidth="1.5" />
          <line x1="20" y1="34" x2="20" y2="39" stroke="#55E6FF" strokeWidth="1.5" />
          <line x1="1" y1="20" x2="6" y2="20" stroke="#55E6FF" strokeWidth="1.5" />
          <line x1="34" y1="20" x2="39" y2="20" stroke="#55E6FF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono font-bold tracking-wider text-foreground ${textSize} group-hover:text-cyan transition-colors`}
          >
            STARTECH
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/30">
            SIH 26166
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
          Lunar Correspondence Platform
        </span>
      </div>
    </div>
  );

  if (linkHref) {
    return <Link href={linkHref}>{content}</Link>;
  }

  return content;
};
