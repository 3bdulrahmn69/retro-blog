import { clsx } from 'clsx';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title = ({ children, className }: TitleProps) => {
  return (
    <h2
      className={clsx(
        'text-3xl font-bold text-amber-800 mb-8 text-center',
        className
      )}
    >
      {children}
    </h2>
  );
};

export const Subtitle = ({ children, className }: TitleProps) => {
  return (
    <span
      className={clsx(
        'text-2xl font-semibold text-amber-700 mb-4 text-center',
        className
      )}
    >
      {children}
    </span>
  );
};

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const Section = ({ id, children, className }: SectionProps) => {
  return (
    <section id={id} className={clsx('py-16 relative', className)}>
      {children}
    </section>
  );
};

export default Section;
