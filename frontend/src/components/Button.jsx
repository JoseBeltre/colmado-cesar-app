export function Button ({ children, className = '', ...rest }) {
  return (
    <button className={`flex gap-1 justify-center items-center flex-1 bg-primary p-2 px-3 rounded-md font-medium text-sm cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  )
}
