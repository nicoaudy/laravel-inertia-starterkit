export default function SelectInput({
  name,
  className,
  required,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col items-start">
      <select
        name={name}
        {...props}
        className={
          `form-select border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
        required={required}
      >
        {children}
      </select>
    </div>
  );
}
