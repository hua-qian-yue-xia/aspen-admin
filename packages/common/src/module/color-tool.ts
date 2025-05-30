import { colord, extend } from "colord"
import type { AnyColor, HslColor, RgbColor } from "colord"
import labPlugin from "colord/plugins/lab"
import mixPlugin from "colord/plugins/mix"
import namesPlugin from "colord/plugins/names"

// 注册插件
extend([namesPlugin, mixPlugin, labPlugin])

// 判断是否为合法的颜色
const isValidColor = (color: AnyColor) => {
	return colord(color).isValid()
}

// 判断是否为白色
const isWhiteColor = (color: AnyColor) => {
	return colord(color).isEqual("#ffffff")
}

// 获取hex格式的颜色
const getHexColor = (color: AnyColor) => {
	return colord(color).toHex()
}

// 获取rgb格式的颜色
const getRgbColor = (color: AnyColor) => {
	return colord(color).toRgb()
}

// 获取hsl格式的颜色
const getHslColor = (color: AnyColor) => {
	return colord(color).toHsl()
}

// 获取hsv格式的颜色
const getHsvColor = (color: AnyColor) => {
	return colord(color).toHsv()
}

// 颜色差异计
const getDeltaE = (color1: AnyColor, color2: AnyColor) => {
	return colord(color1).delta(color2)
}

// hsl格式转hex格式
const transformHslToHex = (color: HslColor) => {
	return colord(color).toHex()
}

/**
 * 添加颜色透明度
 * @param color 颜色
 * @param alpha 透明度0-1(0:完全透明;0.5:半透明;1:完全不透明;)
 * @returns hex格式的颜色
 */
const addColorAlpha = (color: AnyColor, alpha: number) => {
	return colord(color).alpha(alpha).toHex()
}

/**
 * 将两种颜色按比例混合生成新颜色
 * @param firstColor 基础颜色（第一种颜色）
 * @param secondColor 要混合的颜色（第二种颜色）
 * @param ratio 第二种颜色在混合结果中的占比0-1(0:完全是第一种颜色;0.5:平均混合;1:完全是第二种颜色;)
 * @returns hex格式的颜色
 */
const mixColor = (firstColor: AnyColor, secondColor: AnyColor, ratio: number) => {
	return colord(firstColor).mix(secondColor, ratio).toHex()
}

/**
 * 计算出一个等效的不透明颜色。
 * @param color 原始颜色
 * @param alpha 透明度值0-1(0:完全透明;0.5:半透明;1:完全不透明;)
 * @param bgColor 背景颜色
 * @returns
 */
function transformColorWithOpacity(color: AnyColor, alpha: number, bgColor: AnyColor = "#ffffff") {
	const originColor = addColorAlpha(color, alpha)
	const { b: oB, g: oG, r: oR } = colord(originColor).toRgb()
	const { b: bgB, g: bgG, r: bgR } = colord(bgColor).toRgb()
	function calRgb(or: number, bg: number, al: number) {
		return bg + (or - bg) * al
	}
	const resultRgb: RgbColor = {
		b: calRgb(oB, bgB, alpha),
		g: calRgb(oG, bgG, alpha),
		r: calRgb(oR, bgR, alpha),
	}
	return colord(resultRgb).toHex()
}

export const colordTool = {
	isValidColor,
	isWhiteColor,
	getHexColor,
	getRgbColor,
	getHslColor,
	getHsvColor,
	getDeltaE,
	transformHslToHex,
	addColorAlpha,
	mixColor,
	transformColorWithOpacity,
}
