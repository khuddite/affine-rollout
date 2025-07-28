import { twMerge } from "tailwind-merge";

interface TypographyProps extends React.PropsWithChildren {
  className?: string;
}

export const Typography = {
  ParagraphHafferSmall: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-haffer text-sm", className)}>{children}</p>
  ),
  ParagraphHaffer: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-haffer text-base", className)}>{children}</p>
  ),
  ParagraphHafferLarge: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-haffer text-lg", className)}>{children}</p>
  ),
  Heading1: ({ className, children }: TypographyProps) => (
    <h1 className={twMerge("font-haffer text-4xl font-bold", className)}>
      {children}
    </h1>
  ),
  Heading2: ({ className, children }: TypographyProps) => (
    <h2 className={twMerge("font-haffer text-3xl", className)}>{children}</h2>
  ),
  Heading3: ({ className, children }: TypographyProps) => (
    <h3 className={twMerge("font-haffer text-2xl", className)}>{children}</h3>
  ),
  Heading4: ({ className, children }: TypographyProps) => (
    <h4 className={twMerge("font-haffer text-xl", className)}>{children}</h4>
  ),
  DMMonoSmall: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-dmMono text-xs", className)}>{children}</p>
  ),
  DMMonoHeading1: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-dmMono text-4xl", className)}>{children}</p>
  ),
  DMMonoHeading2: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-dmMono text-3xl", className)}>{children}</p>
  ),
  DMMonoHeading3: ({ className, children }: TypographyProps) => (
    <p className={twMerge("font-dmMono text-2xl", className)}>{children}</p>
  ),
};
