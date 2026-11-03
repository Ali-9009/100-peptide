import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  showIcon = true,
}) {
  const isPrimary = variant === "primary";

  const baseStyles = `
    group relative inline-flex w-fit
    items-center justify-center gap-3
    overflow-hidden rounded-full
    px-[26px] py-4
    font-sans text-[14px] font-semibold
    transition-all duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      isPrimary
        ? "bg-primary text-white hover:shadow-[0_14px_30px_-10px_rgba(11,27,63,0.4)]"
        : "bg-transparent text-primary shadow-[inset_0_0_0_1.5px_#0b1b3f] hover:text-white"
    }
    ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
    ${className}
  `;

  const content = (
    <>
      {/* Animated background */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-y-full rounded-t-[50%] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:rounded-none ${isPrimary ? "bg-[#2a5cff]" : "bg-primary"} `}
      />

      {/* Button text */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {/* Arrow icon - primary only */}
      {showIcon && isPrimary && (
        <span className="text-primary relative z-10 grid size-[26px] shrink-0 place-items-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45">
          <ArrowRight size={15} strokeWidth={2.5} />
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {content}
    </button>
  );
}

//  <Button href="#shop" variant="primary">
//         Shop the Catalog
//       </Button>

//       <Button href="#how" variant="secondary">
//         How Ordering Works
//       </Button>

// <Button href="/shop">
//   Explore Collection
// </Button>

// <Button href="/about" variant="secondary">
//   Learn More
// </Button>

// // without icon
// <Button href="/shop" showIcon={false}>
//   Shop Now
// </Button>

// <Button onClick={() => console.log("Clicked")}>
//   Add to Cart
// </Button>
