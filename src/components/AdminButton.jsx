import Link from "next/link";
import { ShieldUser } from "lucide-react";

export default function AdminButton({ className = "" }) {
  return (
    <Link
      href="/admin"
      aria-label="Admin Dashboard"
      title="Admin Dashboard"
      className={`
        relative inline-flex size-11 items-center justify-center
        rounded-full border border-[#b9dcd9]
        bg-white text-[#0b1b3f]
        transition-all duration-300
        hover:border-[#00bfa5] hover:bg-[#f0fffc]
        ${className}
      `}
    >
      <ShieldUser size={19} strokeWidth={1.6} />
    </Link>
  );
}