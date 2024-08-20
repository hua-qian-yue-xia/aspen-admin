import React from "react"

export type Header = {
  headerNode?: React.ReactNode
  headerVisible?: boolean
  headerHeight?: number
}

export type Aside = {
  asideNode?: React.ReactNode
  asideVisible?: boolean
  asideWidth?: number
  asideCollapseWidth?: number
}

export type Main = {
  mainNode?: React.ReactNode
}

export type Footer = {
  footerNode?: React.ReactNode
  footerVisible?: boolean
  footerHeight?: number
}

export type Props = Header & Aside & Main & Footer

export const defaultProps: Props = {
  headerVisible: true,
  headerHeight: 56,
  asideVisible: true,
  asideWidth: 64,
  asideCollapseWidth: 220,
  footerVisible: true,
  footerHeight: 46,
}
