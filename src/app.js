import "./css"
import "./components/header"
import "./components/intro"
import "./components/card"
import "./components/work"
import "./components/clients"
import "./components/copyright"
import "./components/footer"
import "./components/sidebar"
import "./components/overlay"
import "./components/modal"
import "./components/form"

import { getScrollbarWidth } from "@web3r/flowerkit/user"
import { setCSSVar } from "@web3r/flowerkit/css"

import ScrollManagement from "./js/scrollManagement"
import Overlay from "./components/overlay"
import Modal from "./components/modal"
import FormValidator from "./components/form"
import Sidebar from "./components/sidebar"

setCSSVar(
	document.documentElement,
	"--scrollbar-width",
	`${getScrollbarWidth()}px`
)

const init = () => {
	new ScrollManagement()
	new Overlay()
	new Modal()
	new FormValidator()
	new Sidebar()
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
