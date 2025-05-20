import React from "react"

export class CurdSlot<T = any> {
	/**
	 * 组件的key
	 */
	public key = ""
	/**
	 * 组件的props
	 */
	protected props: T = {} as T

	constructor() {
		const tProps = this.transformProps()
		if (tProps) {
			this.props = tProps
		}
	}

	/**
	 * 设置props
	 */
	set slotProps(props: T) {
		this.props = props
	}
	/**
	 * 合并props
	 */
	transformProps(): T {
		return this.props
	}
	/**
	 * 渲染组件
	 */
	render(): React.ReactNode {
		return <div>{this.key}组件为实现</div>
	}

	protected info(...args: any[]) {
		console.log(`组件key|${this.key}|`, args)
	}
}
