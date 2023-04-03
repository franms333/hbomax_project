
import LoadingSpinner from './LoadingSpinner'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
 
export default function MyLoader({ active, children }) {
  return (
    <LoadingOverlayWrapper
      active={active}
      spinner={<LoadingSpinner />}
    >
      {children}
    </LoadingOverlayWrapper>
  )
}