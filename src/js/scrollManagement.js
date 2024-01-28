import { setCSSVar } from "@web3r/flowerkit/css"

//Класс помощник для контроля скрола страницы. Если надо где-либо запретить скрол - lock(), разрешить снова unscroll()
// ВАЖНО! иметь следующие стили в css, чтобы все корректно работало
// html.noscroll {
// 	position: fixed;
// 	overflow-y: scroll;
// 	width: 100%;
// 	top: var(--st);
// }
export default class ScrollManagement {
	static instance
	constructor() {
		if (!ScrollManagement.instance) {
			ScrollManagement.instance = this
		}

		this.state = {
			isLocked: false,
		}

		this.cssVars = {
			st: "--st",
		}

		this.lastPosition = 0

		return ScrollManagement.instance
	}

	lock() {
		this.state.isLocked = true
		setCSSVar(
			document.documentElement,
			this.cssVars.st,
			-1 * document.documentElement.scrollTop + "px"
		)
		this.lastPosition = document.documentElement.scrollTop
		document.documentElement.classList.add("noscroll")
	}

	unlock() {
		this.state.isLocked = false
		document.documentElement.classList.remove("noscroll")
		window.scrollTo(0, this.lastPosition)
	}

	get isLocked() {
		return this.state.isLocked
	}
}