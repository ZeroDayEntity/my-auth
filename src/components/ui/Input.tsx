import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Optional error message
}

// NOTE: Using forwardRef so we can pass the ref from react-hook-form
// to the underlying input element. This is crucial for the library to work correctly.
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, name, ...props }, ref) => {
    // A simple way to combine class names
    const inputClasses = `${styles.inputField} ${error ? styles.error : ''}`;

    return (
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} ref={ref} {...props} className={inputClasses} />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;