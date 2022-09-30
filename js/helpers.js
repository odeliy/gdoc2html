export function setupAccorion() {
	const accordion = document.getElementsByClassName('accordion__content-box')

	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener('click', (e) => {
			accordion[i].classList.toggle('active')
		})
	}
}

export function fetchStorage(key, fallback) {
	return localStorage.getItem(key) || fallback
}

export function setupSettings() {
	const web = document.getElementById('website')
	const ToC = document.getElementById('ToC')

	web.addEventListener('change', () => {
		let newValue = web.value
		localStorage.setItem('website', newValue)
	})
	
	ToC.addEventListener('change', () => {
		let newValue = ToC.value
		localStorage.setItem('ToC', newValue)
	})
	
	web.value = fetchStorage('website', 'bankrate.com')
	ToC.value = fetchStorage('ToC', 'off')
}