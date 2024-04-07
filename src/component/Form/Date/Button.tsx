import { FC, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
 
  return(
    <button className={`h-8 flex justify-center items-center hover:bg-slate-300 rounded`} {...props}>
        {children}
    </button>
  );
};

