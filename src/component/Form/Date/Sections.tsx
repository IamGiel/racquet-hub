import { FC, ReactNode } from 'react';

interface SectionProps {
    className?: string;
    children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ className, children }) => {
    return (
        <section className={`'w-56`}>{children}</section>
    )
}