interface Window {
	/**
	 * antd 全局提示
	 * @see https://ant.design/components/message-cn
	 */
	$message?: import("antd/es/message/interface").MessageInstance
	/**
	 * antd 对话框
	 * @see https://ant.design/components/modal-cn
	 */
	$modal?: Omit<import("antd/es/modal/confirm").ModalStaticFunctions, "warn">
	/**
	 * antd 通知提醒框
	 * @see https://ant.design/components/notification-cn
	 */
	$notification?: import("antd/es/notification/interface").NotificationInstance
}
