import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

// Props for our button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean; // To show a loading spinner
}

// A simple reusable button. It can show a loading state.
export default function Button({ children, isLoading = false, ...props }: ButtonProps) {
  return (
    <button className={styles.button} disabled={isLoading} {...props}>
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
}