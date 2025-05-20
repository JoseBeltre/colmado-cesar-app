export function Button ({ children, className = '', ...rest }) {
  return (
    <button className={`flex gap-1 justify-center items-center flex-1 bg-primary p-2  rounded-md font-medium text-sm cursor-pointer leading-3 ${className}`} {...rest}>
      {children}
    </button>
  )
}
