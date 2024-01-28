import "./style.css"

export default class Overlay {
	static instance
	constructor() {
		if (!Overlay.instance) {
			Overlay.instance = this
		}

		this.state = {
			isActive: false,
		}

		this.selectors = {
			overlay: `[data-js="overlay"]`,
		}

		this.stateClasses = {
			isActive: "isActive",
		}

		this.extraClasses = []

		this.findElements()

		return Overlay.instance
	}

	findElements() {
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	checkElements() {
		return this.overlay ? true : false
	}

	show(...extraClasses) {
		if (this.checkElements()) {
			this.state.isActive = true
			this.overlay.classList.add(this.stateClasses.isActive)
			if (extraClasses.length !== 0) {
				extraClasses.forEach((className) => {
					this.extraClasses.push(className)
					this.overlay.classList.add(className)
				})
			}
		}
	}

	hide() {
		if (this.checkElements()) {
			this.state.isActive = false
			this.overlay.classList.remove(this.stateClasses.isActive)
			if (this.extraClasses.length !== 0) {
				this.extraClasses.forEach((className) => {
					this.overlay.classList.remove(className)
				})
			}
		}
	}
}
