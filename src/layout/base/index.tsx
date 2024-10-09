'use client'

import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import type types from './baseLayoutType'

const BaseLayout = ({ children }: types.ConfigProp) => {
  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  )
}

export default BaseLayout
