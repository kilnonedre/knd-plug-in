'use client'

import React, { type CSSProperties } from 'react'
import type types from './iconFontType.d'
import styles from './iconFontStyle.module.scss'

const IconFont = (prop: types.ConfigProp) => {
  return (
    <div
      className={styles['icon']}
      style={
        {
          fontSize: prop.size ?? '16px',
          color: prop.color,
          cursor: prop.cursor,
          fontWeight: prop.bold,
          '--hover-color': prop.hoverColor ?? prop.color,
        } as CSSProperties
      }
    >
      {prop.icon}
    </div>
  )
}

export default IconFont
