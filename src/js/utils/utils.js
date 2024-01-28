import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

/**
 * Функция задержки
 * @param {number} ms - миллисекунды для задержки
 * @returns {Promise}
 */
export function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
export function createSuccessfulToast(text) {
	Toastify({
		text: text ?? "Данные успешно отправлены. Мы свяжемся с вами 🚀",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_success",
		onClick: function () {}, // Callback after click
	}).showToast()
}
/**
 * Функция создания уведомления о неудаче или ошибке.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {string | undefined} text - Текст сообщения, если не отправим, будет дефолтное уведомление
 * @returns {undefined}
 */
export function createErrorToast(text) {
	Toastify({
		text: text ?? "Что-то пошло не так, попробуйте позже 🤨",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_error",
		style: {
			background: "rgba(121,9,9,1)",
		},
		onClick: function () {}, // Callback after click
	}).showToast()
}

/**
 * Функция создания уведомления о неудаче или ошибке.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {any} functionToCheck - Функция или любой другой объект
 * @returns {boolean}
 */
export function isFunction(functionToCheck) {
	return (
		functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
	)
}