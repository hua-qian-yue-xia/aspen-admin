import { Card, Flex } from "antd"
import { ReactFlow, applyNodeChanges, Background, Controls, MiniMap, BackgroundVariant } from "@xyflow/react"
import type { ReactFlowProps } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useSetState } from "ahooks"
import { useCallback, useEffect } from "react"

import CMP from "@@/components"
import type { DeptFormCmpRef } from "@@/components/sys-dept/dept-form"

import { API } from "@@/api/share/request-tool"
import DeptNode from "./dept-node"
import { getLayoutedElements } from "./layout-util"

const DeptOrgCmp: React.FC = () => {
	const deptFormRef = useRef<DeptFormCmpRef>(null)

	const [state, setState] = useSetState<{
		nodes: ReactFlowProps["nodes"]
		edges: ReactFlowProps["edges"]
	}>({
		nodes: [],
		edges: [],
	})

	useEffect(() => {
		getDeptTree()
	}, [])

	// 获取部门dept树
	const getDeptTree = async () => {
		try {
			const { data } = await API.sys.sysDeptControllerPage({
				page: 1,
				pageSize: 999,
			})
			const nodes =
				data.records?.map<ReactFlowProps["nodes"][0]>((item) => {
					return {
						id: item.deptId,
						type: "deptNode",
						position: {
							x: 0,
							y: 0,
						},
						data: {
							label: item.deptName,
							...item,
							dropdownChange: onNodeContextMenuClick,
						},
					}
				}) ?? []
			const edges =
				data.records
					?.filter((item) => item.deptParentId !== "-99")
					?.map<ReactFlowProps["edges"][0]>((item) => {
						return {
							id: `${item.deptParentId}-${item.deptId}`,
							source: item.deptParentId,
							target: item.deptId,
						}
					}) ?? []
			const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges)

			setState({
				nodes: layoutedNodes,
				edges: layoutedEdges,
			})
		} catch (error) {
			console.error("|获取部门dept树|意外的错误,error:", error)
		}
	}

	const onNodesChange = useCallback(
		(changes) => setState((stateSnapshot) => ({ nodes: applyNodeChanges(changes, stateSnapshot.nodes) })),
		[],
	)

	// node右键点击
	const onNodeContextMenuClick = useCallback((key: "ADD" | "EDIT" | "DELETE", nodeData: any) => {
		console.log("|node右键点击|key:", key, "nodeData:", nodeData)
		switch (key) {
			case "ADD":
				deptFormRef.current?.open(nodeData.deptId, null)
				break
			case "EDIT":
				deptFormRef.current?.open(nodeData.deptParentId, nodeData.deptId)
				break
			case "DELETE":
				window.$modal.confirm({
					title: "警告",
					content: `部门${nodeData.deptName}确认删除吗?`,
					onOk: async () => {
						await API.sys.sysDeptControllerDelete([nodeData.deptId])
						getDeptTree()
						window.$message.success("删除成功")
					},
				})
				break
		}
	}, [])

	return (
		<Flex className="flex-1" vertical gap={12}>
			<Card></Card>
			<Card className="flex-1 h-full" styles={{ body: { height: "100%" } }}>
				<ReactFlow
					className="dept-org-flow"
					nodes={state.nodes}
					edges={state.edges}
					onNodesChange={onNodesChange}
					fitView
					nodesDraggable={false}
					nodesConnectable={false}
					nodeTypes={{
						deptNode: DeptNode,
					}}
					proOptions={{ hideAttribution: true }}
					minZoom={0.5}
					maxZoom={1.5}
					defaultViewport={{ x: 0, y: 0, zoom: 1 }}
				>
					<Background variant={BackgroundVariant.Dots} />
					<Controls showInteractive={false} />
					<MiniMap nodeColor={"rgb(var(--primary-color))"} nodeStrokeWidth={3} zoomable pannable />
				</ReactFlow>
			</Card>
			<CMP.sysDept.DeptForm ref={deptFormRef} onRefresh={getDeptTree} />
		</Flex>
	)
}

export default DeptOrgCmp
