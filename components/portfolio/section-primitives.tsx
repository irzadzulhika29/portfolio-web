import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center"
      )}
    >
      <h2
        className={cn(
          "text-3xl text-center font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>
    
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("section-shell", className)}>
      {children}
    </section>
  );
}
