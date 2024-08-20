import * as React from "react"

import { defaultProps, Props } from "./props.ts"

const Layout: React.FC<Props> = props => {
  const { headerNode, asideNode, mainNode, footerNode } = Object.assign(
    defaultProps,
    props,
  )
  return (
    <div>
      {headerNode && <header>{headerNode}</header>}
      {asideNode && <aside>{asideNode}</aside>}
      {mainNode && <main>{mainNode}</main>}
      {footerNode && <footer>{footerNode}</footer>}
    </div>
  )
}

export default Layout
