import "./style.css"

import ScrollManager from "../../js/scrollManagement"
import Overlay from "../../components/overlay"

export default class Sidebar {
	static instance
	constructor() {
		if (!Sidebar.instance) {
			Sidebar.instance = this
		}
		this.state = {
			isActive: false,
		}
		this.selectors = {
			burger: `[data-js-sidebar-burger-btn]`,
			sidebarMenu: `[data-js-sidebar-menu]`,
		}
		this.stateClasses = {
			isActive: "isActive",
		}

		this.firstInit()
		this.acceptEvents()

		return Sidebar.instance
	}

	firstInit() {
		this.burger = document.querySelector(this.selectors.burger)
		this.sidebarMenu = document.querySelector(this.selectors.sidebarMenu)
	}

	checkElements() {
		return this.burger && this.sidebarMenu ? true : false
	}

	open() {
		if (this.checkElements()) {
			this.state.isActive = true
			this.burger.classList.add(this.stateClasses.isActive)
			this.sidebarMenu.classList.add(this.stateClasses.isActive)
			Overlay.instance.show("z-index2")
			ScrollManager.instance.lock()
		}
	}

	hide() {
		if (this.checkElements()) {
			this.state.isActive = false
			this.burger.classList.remove(this.stateClasses.isActive)
			this.sidebarMenu.classList.remove(this.stateClasses.isActive)
			Overlay.instance.hide()
			ScrollManager.instance.unlock()
		}
	}

	toggleMenu(e) {
		//на случай если у кнопки не будет type=button
		e.preventDefault()

		e.stopPropagation()
		this.state.isActive = !this.state.isActive
		this.state.isActive ? this.open() : this.hide()
	}

	handleKeydownClick(e) {
		if (this.state.isActive) {
			if (e.key === "Escape") {
				this.toggleMenu(e)
			}
		}
	}

	//"клик" вне области sidebar
	handleClosure(e) {
		if (this.state.isActive) {
			!this.sidebarMenu.contains(e.target) && this.hide()
		}
	}

	acceptEvents() {
		if (this.checkElements()) {
			window.addEventListener("click", (e) => {
				this.handleClosure(e)
			})
			this.burger.addEventListener("click", (e) => {
				this.toggleMenu(e)
			})
			document.addEventListener("keydown", (e) => {
				this.handleKeydownClick(e)
			})
		}
	}
}
