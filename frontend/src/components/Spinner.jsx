export function Spinner ({ size = 'md', color }) {
  const sizes = {
    sm: 'w-4 h-4 border-3',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-6'
  }

  return (
    <div className='flex items-center justify-center'>
      <div className={`${sizes[size]} animate-spin rounded-full border-primary`} style={{ borderColor: color, borderTopColor: 'transparent' }} />
    </div>
  )
}
