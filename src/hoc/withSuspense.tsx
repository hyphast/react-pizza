import React, { Suspense } from 'react'
import { Loading } from '../components'

export const WithLazyComponent = <T,>(Component: React.ComponentType & any) => {
  return (props: T) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )
}
