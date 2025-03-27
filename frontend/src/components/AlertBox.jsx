import { CircleCheckBig, CircleX, TriangleAlert } from 'lucide-react'
import { BackgroundModal } from './BackgroundModal'

export function AlertBox ({ type = 'success', closeModal, children }) {
  const ALERT_STYLES = {
    success: {
      color: '#4C979A',
      icon: <CircleCheckBig size={60} strokeWidth={1.5} color='#4C979A' />,
      outline: 'outline-success'
    },
    error: {
      color: '#D85454',
      icon: <CircleX size={60} strokeWidth={1.5} color='#D85454' />,
      outline: 'outline-error'
    },
    warning: {
      color: '#FFD200',
      icon: <TriangleAlert size={60} strokeWidth={1.5} color='#FFD200' />,
      outline: 'outline-warning'
    }
  }

  const alertStyle = ALERT_STYLES[type] || ALERT_STYLES.success

  return (
    <BackgroundModal closeModal={closeModal}>
      <div className={`flex items-center gap-2 leading-4 bg-white dark:bg-[#1E1E1E] rounded-2xl outline-3 ${alertStyle.outline} text-black/70 dark:text-white/70 dark:font-extralight text-sm p-5`}>
        <div>
          {alertStyle.icon}
        </div>
        <p>{children}</p>
      </div>
    </BackgroundModal>
  )
}
