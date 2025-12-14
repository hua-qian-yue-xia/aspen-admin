import dagre from "dagre"
import { Position } from "@xyflow/react"
import type { Node, Edge } from "@xyflow/react"

const nodeWidth = 172
const nodeHeight = 70

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = "TB") => {
	// 创建新的 dagre graph 实例，确保每次计算都是独立的
	const dagreGraph = new dagre.graphlib.Graph()
	dagreGraph.setDefaultEdgeLabel(() => ({}))

	const isHorizontal = direction === "LR"
	dagreGraph.setGraph({ rankdir: direction })

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
	})

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target)
	})

	dagre.layout(dagreGraph)

	const newNodes = nodes.map((node) => {
		const nodeWithPosition = dagreGraph.node(node.id)
		const newNode = {
			...node,
			targetPosition: isHorizontal ? Position.Left : Position.Top,
			sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
			// 我们将 dagre 节点位置(锚点=中心)移动到左上角
			// 以便与 React Flow 节点锚点(左上角)匹配。
			position: {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			},
		}

		return newNode
	})

	return { nodes: newNodes, edges }
}
