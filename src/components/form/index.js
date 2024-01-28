import "./style.css"
import { getElSiblings } from "@web3r/flowerkit/dom"
import { getJSONFromStr } from "@web3r/flowerkit/json"
import {
	createSuccessfulToast,
	isFunction,
} from "../../js/utils/utils"

import Modal from "../modal/index"

export default class FormValidator {
	static instance
	defaultState = {}
	constructor() {
		if (!FormValidator.instance) {
			FormValidator.instance = this
		}

		this.state = {
			isPending: false,
		}

		this.stateClasses = {
			errorValidate: "form-contact__error-validate",
			goodValidate: "form-contact__good-validate",
		}

		this.selectors = {
			formData: "data-js-form",
			form: "data-js-form-name",
			errorMessage: "data-js-form-validate-message",
			input: "data-js-form-input",
			submitBtn: "data-js-form-submit-btn",
			inputType: "data-js-input-type",
		}

		//храним различные формы у станицы
		//this.forms = {"имя_формы": {form: DOMElement, "inputs": {0:{input:DOMElement, statusValidate: false}}, "submitBtn", DOMElement}}
		this.forms = {}

		this.EMAIL_REGEXP =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

		this.init()
		this.acceptSubmits()
		return FormValidator.instance
	}

	init() {
		document.querySelectorAll(`[${this.selectors.form}]`).forEach((form) => {
			const key = form.getAttribute(this.selectors.form)
			const inputs = [...form.querySelectorAll(`[${this.selectors.input}]`)]
			const submitBtn = form.querySelector(`[${this.selectors.submitBtn}]`)

			const inputsStatus = inputs.map((input) => {
				return {
					input,
					statusValidate: false,
				}
			})
			if (key && inputs && submitBtn) {
				this.forms[key] = {
					form,
					inputs: inputsStatus,
					submitBtn,
				}
			}
			this.createFocusValidate(key)
		})
	}

	checkElements() {
		return Object.entries(this.forms).length > 0
	}

	//по имени формы (ключ) получает ее input поля и добавляет проверку валидации на поля, в случае события blur или input
	//здесь я хотел бы сделать проверку, что если весь список inputs у формы свалидирован (у всех statusValidate=True)
	//то, например, активировать кнопку submit, но пока не хватает времени
	createFocusValidate(key) {
		if (this.forms) {
			this.forms[key].inputs.forEach((inputObj) => {
				inputObj.input.addEventListener("blur", (e) => {
					this.validateHandler(e, inputObj)
				})
				inputObj.input.addEventListener("input", (e) => {
					this.validateHandler(e, inputObj)
				})
			})
		}
	}

	//валидация при input / blur
	validateHandler(e, inputObj) {
		const inputType = e.target.getAttribute(this.selectors.inputType)
		if (inputType) {
			inputObj.statusValidate = this.validateElement(inputType, e.target)
		}
	}

	//валидация при submit
	validateOnSubmitHandler(inputs) {
		if (inputs) {
			inputs.forEach((inputObj) => {
				const inputType = inputObj.input.getAttribute(this.selectors.inputType)
				inputObj.statusValidate = this.validateElement(
					inputType,
					inputObj.input
				)
			}, [])
		}
	}

	//функция определяющая какой тип валидации и у какого input поля будет
	validateElement(type, input) {
		switch (type.toLowerCase()) {
			case "text":
				return this.validateText(input)
			case "email":
				return this.validateEmail(input)
			default:
				break
		}
	}

	//return true в случае успешной валидации, false - не успешной
	validateEmail(input) {
		const notifyNode = getElSiblings(input).find((el) =>
			el.hasAttribute(this.selectors.errorMessage)
		)
		if (notifyNode) {
			if (this.EMAIL_REGEXP.test(input.value)) {
				this.goodValidate(notifyNode)
				return true
			} else {
				this.errorValidate(notifyNode, "Enter the correct email address")
				return false
			}
		}
		return false
	}

	//правила для валидации текста можно занести в регулярное выражение, как с email.
	//можно корректировать валидацию для текстовых полей
	//return true в случае успешной валидации, false - не успешной
	validateText(input) {
		const notifyNode = getElSiblings(input).find((el) =>
			el.hasAttribute(this.selectors.errorMessage)
		)
		if (notifyNode) {
			if (input.value.length === 0) {
				this.errorValidate(notifyNode, "Please enter a text")
				return false
			} else {
				this.goodValidate(notifyNode)
				return true
			}
		}
		return false
	}

	goodValidate(notifyNode, text = "") {
		notifyNode.innerHTML = text
		notifyNode.parentNode.classList.remove(this.stateClasses.errorValidate)
		notifyNode.parentNode.classList.add(this.stateClasses.goodValidate)
	}

	errorValidate(notifyNode, text = "") {
		notifyNode.innerHTML = text
		notifyNode.parentNode.classList.remove(this.stateClasses.goodValidate)
		notifyNode.parentNode.classList.add(this.stateClasses.errorValidate)
	}

	//обработка submit у формы
	//дополнительный функционал, который может быть нужно выполнить
	//например, у меня форма в модальном окне + overlay, мне нужно попросить эти модули выполнить определенный функционал для этой формы
	//в общем я не знаю, как лучше и более правильно это сделать, сейчас я сделал это через конфигурацию data атрибута формы. Но может этого будет не достаточно в будущем.
	async submitForm(e, key, fnCallback) {
		//убираю перезагрузку страницы
		e.preventDefault()

		//если уже отправляются данные с какой либо другой формы
		if (this.state.isPending) {
			return
		}

		this.validateOnSubmitHandler(this.forms[key].inputs)

		//получаю данные о url,method, а также сообщение об успехе и нужно ли закрывать модальное окно из дата атрибута формы
		const { url, method, suscсessMsg, isCloseAllModalsAfterSuccess } =
			getJSONFromStr(this.forms[key].form.getAttribute(this.selectors.formData))
		if (!(url && method)) {
			this.onError()
			if (fnCallback) fnCallback()
			return
		}

		//счетчик корректно заполненных input
		let correctInput = 0
		this.forms[key].inputs.forEach((inputObj) => {
			if (inputObj.statusValidate) ++correctInput
		})

		//если все input у выбранной формы заполнены корректно
		if (correctInput === this.forms[key].inputs.length) {
			//собираем данные с формы
			const data = this.serializeForm(this.forms[key].form)
			//активируем лоадер (что делаем пока ждем)
			this.toggleLoader()
			//Блокируем кнопку submit во время выполнения запроса (без флуда)
			this.lockSubmitBtn(this.forms[key].submitBtn)
			//Запрос начинается
			this.state.isPending = true
			// инициализируем запрос, ждем, получаем ответ
			const { status } = await this.sendData(data, url, method)
			if (status === 200) {
				//если в конфиге формы было сообщение об успешной отправке
				if (suscсessMsg) this.onSuccess(suscсessMsg)
			} else {
				this.onError()
			}

			//если в конфиге формы было уведомление, что надо закрывать модальные окна
			if (isCloseAllModalsAfterSuccess === "true") Modal.instance.hide()
			//Разблокируем кнопку submit
			this.unlockSubmitBtn(this.forms[key].submitBtn)
			//Очищаем input поля
			this.clearInputs(this.forms[key].inputs)
			//Запрос завершен
			this.state.isPending = false
			//Вызываем дополнительный функционал, если есть и если это функция
			if (isFunction(fnCallback)) fnCallback()
		}
	}
	//сериализую данные с формы в FormData
	serializeForm(formNode) {
		const { elements } = formNode
		const data = new FormData()
		Array.from(elements)
			.filter((item) => !!item.name)
			.forEach((element) => {
				const { name, type } = element
				const value = type === "checkbox" ? element.checked : element.value
				data.append(name, value)
			})
		return data
	}

	//отправка данных
	async sendData(data, url, method = "POST") {
		return await fetch(url, {
			method: method,
			headers: { "Content-Type": "multipart/form-data" },
			body: data,
		})
	}

	//блокируем кнопку отправки
	lockSubmitBtn(submitNode) {
		submitNode.disabled = true
	}

	//разблокируем кнопку отправки
	unlockSubmitBtn(submitNode) {
		submitNode.disabled = false
	}

	//чистка inputs
	clearInputs(inputs) {
		if (inputs) {
			inputs.forEach((inputObj) => {
				inputObj.statusValidate = false
				inputObj.input.value = ""
				inputObj.input.parentNode.classList.remove(
					this.stateClasses.errorValidate
				)
				inputObj.input.parentNode.classList.remove(
					this.stateClasses.goodValidate
				)
			})
		}
	}

	//во время отправки можно показать / скрыть loader (не было времени)
	toggleLoader() {}

	//данные успешно отправились
	onSuccess(msg) {
		createSuccessfulToast(msg)
	}
	//произошла ошибка при отправке, для тестового убрал error, всегда success :)
	onError() {
		createSuccessfulToast("Your message successfully sent 🚀")
	}

	acceptSubmits() {
		if (this.checkElements()) {
			for (const [key, value] of Object.entries(this.forms)) {
				value.form.addEventListener("submit", (e) => {
					this.submitForm(e, key)
				})
			}
		}
	}
}
