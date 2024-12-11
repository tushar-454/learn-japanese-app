import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

export const TypographyH1: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      {...props}
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {children}
    </h1>
  );
};

export const TypographyH2: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const TypographyH3: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 {...props} className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
};

export const TypographyH4: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h4 {...props} className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  );
};

export const TypographyP: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p {...props} className={cn('leading-7', className)}>
      {children}
    </p>
  );
};

export const TypographyBlockquote: FC<HTMLAttributes<HTMLQuoteElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <blockquote {...props} className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
};

export const TypographyLarge: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn('text-lg font-semibold', className)}>
      {children}
    </div>
  );
};

export const TypographySmall: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <small {...props} className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  );
};

export const TypographyMuted: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p {...props} className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};
