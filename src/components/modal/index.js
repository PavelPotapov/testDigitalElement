import "./style.css"

import ScrollManager from "../../js/scrollManagement"
import Overlay from "../../components/overlay"

/**
 * Класс для создания модальных окон.
 * Элементу, которые должен открывать определенное модальное окно необходимо повесить атрибут data-js-modal-trigger="имя_модального_окна"
 * Элементу, который будет модальным окном, необходимо повесить атрибут data-js-modal="имя_модального_окна"
 * Внутри элемента модального окна должен быть элемент, закрывающий его, с атрибутом data-js-close-modal-btn
 */
export default class Modal {
	static instance
	constructor() {
		if (!Modal.instance) {
			Modal.instance = this
		}
		this.state = {
			isActive: "isActive",
		}

		this.selectors = {
			trigger: `data-js-modal-trigger`,
			modal: `data-js-modal`,
			closeModalBtn: "data-js-close-modal-btn",
			flowContainer: "data-js-flowContainer",
			sidebarMenu: `data-js-sidebar-menu`,
		}

		this.stateClasses = {
			isActive: "isActive",
		}

		this.currentOpenModal
		this.init()
		this.acceptEvents()

		return Modal.instance
	}

	init() {
		this.triggers = document.querySelectorAll(`[${this.selectors.trigger}]`)
		this.modals = document.querySelectorAll(`[${this.selectors.modal}]`)
		this.closeModalsBtns = document.querySelectorAll(
			`[${this.selectors.closeModalBtn}]`
		)
		this.flowContainer = document.querySelector(
			`[${this.selectors.flowContainer}]`
		)
		this.sidebarMenu = document.querySelector(`[${this.selectors.sidebarMenu}]`)
	}

	checkElements() {
		return this.triggers && this.modals && this.closeModalsBtns ? true : false
	}

	open(e) {
		//на случай, если у триггера будет какой-нибудь условный submit
		e.preventDefault()

		e.stopPropagation()
		this.createInert()
		const modalName = e.target.getAttribute(this.selectors.trigger)
		this.modals.forEach((modal) => {
			if (modal.getAttribute(this.selectors.modal) === modalName) {
				modal.classList.add(this.stateClasses.isActive)
				this.state.isActive = true
				Overlay.instance.show("z-index4")
				ScrollManager.instance.lock()
				this.currentOpenModal = modal
			}
		})
	}

	hide() {
		this.state.isActive = false
		if (this.currentOpenModal) {
			this.currentOpenModal.classList.remove(this.stateClasses.isActive)
			this.currentOpenModal = null
		}
		this.removeInert()
		Overlay.instance.hide()
		ScrollManager.instance.unlock()
	}

	//"клик" вне области Modal окна
	handleClosure(e) {
		if (this.state.isActive && this.currentOpenModal) {
			!this.currentOpenModal.contains(e.target) && this.hide()
		}
	}

	//esc - закрыть модалку
	handleKeydown(e) {
		if (this.state.isActive) {
			if (e.key === "Escape") {
				this.hide(e)
			}
		}
	}

	//inert атрибут для flowContainer и для sidebarmenu
	createInert() {
		if (this.flowContainer && this.sidebarMenu) {
			this.flowContainer.setAttribute("inert", "")
			this.sidebarMenu.setAttribute("inert", "")
		}
	}

	removeInert() {
		if (this.flowContainer && this.sidebarMenu) {
			this.flowContainer.removeAttribute("inert")
			this.sidebarMenu.removeAttribute("inert")
		}
	}

	acceptEvents() {
		if (this.checkElements()) {
			window.addEventListener("click", (e) => {
				this.handleClosure(e)
			})

			window.addEventListener("keydown", (e) => {
				this.handleKeydown(e)
			})

			this.triggers.forEach((trigger) => {
				trigger.addEventListener("click", (e) => {
					this.open(e)
				})
			})
			this.closeModalsBtns.forEach((closeBtn) => {
				closeBtn.addEventListener("click", (e) => {
					this.hide(e)
				})
			})
		}
	}

	get isActive() {
		return this.state.isActive
	}
}
