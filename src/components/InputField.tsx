import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;

  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  error?: FieldError;
  [key: string]: any;
}

const InputField = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  required,
  type = 'text',
  ...props
}: InputFieldProps) => {
  const validationRules = required
    ? { required: 'This field is required' }
    : {};

  return (
    <div className="w-full">
      <label className="mb-0.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        defaultValue={defaultValue}
        className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        {...props}
      />
    </div>
  );
};

export default InputField;
