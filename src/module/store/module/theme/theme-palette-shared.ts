import { colordTool } from "@aspen/common"
import type { AnyColor, HsvColor } from "@aspen/common"

import { colorPaletteNumbers, colorPaletteIndexs, darkColorMap, DARK_CLASS } from "./theme-constant"
import { getThemeColorVars } from "./theme-shared"

// 色相步长
const hueStep = 2
// 饱和度步长,浅色部分
const saturationStep = 16
// 饱和度步长,深色部分
const saturationStep2 = 5
// 亮度步长,浅色部分
const brightnessStep1 = 5
// 亮度步长,深色部分
const brightnessStep2 = 15
// 浅色数量,主色向上
const lightColorCount = 5
// 深色数量,主色向下
const darkColorCount = 4

/**
 * 获取色相
 * @description 调整色相,浅色色相降低,深色色相增加,并限制在合理范围内
 * @param hsv - HSV 格式颜色
 * @param i - 与索引 6 的相对距离
 * @param isLight - 是否为浅色
 */
const getHue = (hsv: HsvColor, i: number, isLight: boolean) => {
	let hue: number
	const hsvH = Math.round(hsv.h)
	if (hsvH >= 60 && hsvH <= 240) {
		hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i
	} else {
		hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i
	}
	if (hue < 0) {
		hue += 360
	}
	if (hue >= 360) {
		hue -= 360
	}
	return hue
}

/**
 * 获取饱和度
 * @description 整饱和度,浅色降低饱和度,深色增加饱和度,并限制在合理范围内
 * @param hsv - HSV 格式颜色
 * @param i - 与索引 6 的相对距离
 * @param isLight - 是否为浅色
 */
const getSaturation = (hsv: HsvColor, i: number, isLight: boolean) => {
	if (hsv.h === 0 && hsv.s === 0) {
		return hsv.s
	}
	let saturation: number
	if (isLight) {
		saturation = hsv.s - saturationStep * i
	} else if (i === darkColorCount) {
		saturation = hsv.s + saturationStep
	} else {
		saturation = hsv.s + saturationStep2 * i
	}
	if (saturation > 100) {
		saturation = 100
	}
	if (isLight && i === lightColorCount && saturation > 10) {
		saturation = 10
	}
	if (saturation < 6) {
		saturation = 6
	}
	return saturation
}

/**
 * 获取 HSV 的明度值
 * @description 调整明度,浅色增加明度,深色降低明度,确保不超过 100%
 * @param hsv - HSV 格式颜色
 * @param i - 与索引 6 的相对距离
 * @param isLight - 是否为浅色
 */
const getValue = (hsv: HsvColor, i: number, isLight: boolean) => {
	let value: number
	if (isLight) {
		value = hsv.v + brightnessStep1 * i
	} else {
		value = hsv.v - brightnessStep2 * i
	}
	if (value > 100) {
		value = 100
	}
	return value
}

/**
 * 用于根据指定的索引生成调色板中对应位置的颜色
 * @param color 基础颜色
 * @param index 调色板中的颜色索引
 */
const getAntDPaletteColorByIndex = (color: AnyColor, index: Theme.ThemeColorPaletteIndex): string | null => {
	if (!colordTool.isValidColor(color)) {
		return null
	}
	// 2. 如果索引是6(6代表主色)，直接返回原色
	if (index === 6) {
		return colordTool.getHexColor(color)
	}
	// 3. 判断是浅色还是深色
	// 索引小于6为浅色，大于6为深色
	const isLight = index < 6
	// 转换为HSV颜色空间
	const hsv = colordTool.getHsvColor(color)
	// 4. 计算距离主色的步数
	const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1
	const newHsv: HsvColor = {
		h: getHue(hsv, i, isLight),
		s: getSaturation(hsv, i, isLight),
		v: getValue(hsv, i, isLight),
	}
	return colordTool.getHexColor(newHsv)
}

/**
 * 根据基础颜色生成包含 11 个颜色变体的完整调色板，支持明暗主题切换。
 * @param color 基础颜色
 * @param isDark 是否为暗色主题
 * @param darkThemeMixColor 暗色主题混合颜色
 */
const getAntDColorPalette = (color: AnyColor, isDark = false, MixDarkColor: AnyColor = "#141414"): Array<string> => {
	const patterns = colorPaletteIndexs.map((index) => getAntDPaletteColorByIndex(color, index))
	if (!isDark) {
		return patterns
	}
	// 如果是暗色主题,进行特殊处理
	const darkPatterns = darkColorMap.map(({ index, opacity }) => {
		// 将两种颜色按比例混合生成新颜色
		const darkColor = colordTool.mixColor(MixDarkColor, patterns[index], opacity)
		return darkColor
	})
	return darkPatterns.map((item) => colordTool.getHexColor(item))
}

/**
 * 根据color生成该颜色的调色板
 * @param color 基础颜色
 */
const getColorPalette = (color: AnyColor): Map<Theme.ThemeColorPaletteNumber, string> => {
	const colorMap = new Map<Theme.ThemeColorPaletteNumber, string>()
	const colors = getAntDColorPalette(color)
	colorPaletteNumbers.forEach((number, index) => {
		colorMap.set(number, colors[index])
	})
	return colorMap
}

/**
 * 根据colors生成主题色的调色板
 * @param colors 主题色
 */
const createThemePaletteColors = (colors: Theme.ThemeColor): Theme.ThemePaletteColor => {
	const colorKeys = Object.keys(colors)
	const colorPaletteVar = {} as Theme.ThemePaletteColor
	for (let i = 0; i < colorKeys.length; i++) {
		const element = colorKeys[i]
		const colorMap = getColorPalette(colors[element])
		colorPaletteVar[element] = colorMap.get(500)!
		colorMap.forEach((hex, number) => {
			colorPaletteVar[`${element}-${number}`] = hex
		})
	}
	return colorPaletteVar
}

/**
 * 根据主题设置创建主题token的css变量值
 * @param colors 主题色
 * @param tokens 主题token
 */
const createThemeToken = (colors: Theme.ThemeColor, tokens: Theme.ThemeModeToken) => {
	const paletteColors = createThemePaletteColors(colors)
	const { dark, light } = tokens
	// 亮色主题
	const lightThemeTokens: Theme.ThemeTokenCSSVars = {
		boxShadow: {
			...light.boxShadow,
		},
		colors: {
			...paletteColors,
			nprogress: paletteColors.primary,
			...light.colors,
		},
	}
	// 暗色主题
	const darkThemeTokens: Theme.ThemeTokenCSSVars = {
		boxShadow: {
			...lightThemeTokens.boxShadow,
			...dark?.boxShadow,
		},
		colors: {
			...lightThemeTokens.colors,
			...dark?.colors,
		},
	}
	return {
		lightTokens: lightThemeTokens,
		darkTokens: darkThemeTokens,
	}
}

const getCssVarByTokens = (tokens: Theme.ThemeTokenCSSVars) => {
	const styles: Array<string> = []
	function removeVarPrefix(value: string) {
		return value.replace("var(", "").replace(")", "")
	}
	function removeRgbPrefix(value: string) {
		return value.replace("rgb(", "").replace(")", "")
	}
	// 主题style模版
	const themeColorVars = getThemeColorVars()
	for (const [key, value] of Object.entries(themeColorVars)) {
		for (const [tokenKey, tokenValue] of Object.entries(value)) {
			let cssVarsKey = removeVarPrefix(tokenValue)
			let cssValue = tokens[key][tokenKey]
			if (key === "colors") {
				cssVarsKey = removeRgbPrefix(cssVarsKey)
				const { b, g, r } = colordTool.getRgbColor(cssValue)
				cssValue = `${r} ${g} ${b}`
			}
			styles.push(`${cssVarsKey}: ${cssValue}`)
		}
	}
	return styles.join(";")
}

/**
 * 将主题token的css变量值添加到全局html中
 * @param colors 主题色
 * @param tokens 主题token
 */
export const setupThemeVarsToHtml = (colors: Theme.ThemeColor, tokens: Theme.ThemeModeToken) => {
	const { lightTokens, darkTokens } = createThemeToken(colors, tokens)

	const lightCssVarStr = getCssVarByTokens(lightTokens)
	const darkCssVarStr = getCssVarByTokens(darkTokens)

	const lightCss = `
		:root {
			${lightCssVarStr}
		}
	`
	const darkCss = `
		html.${DARK_CLASS} {
			${darkCssVarStr}
		}
	`

	const styleId = "theme-vars"
	const style = document.querySelector(`#${styleId}`) || document.createElement("style")
	style.id = styleId
	style.textContent = lightCss + darkCss
	document.head.appendChild(style)
}
