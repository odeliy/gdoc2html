export function setupAccorion() {
	const accordion = document.getElementsByClassName('accordion__content-box')

	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener('click', (e) => {
			accordion[i].classList.toggle('active')
		})
	}
}

function fetchSelectedWebsite() {
	return localStorage.getItem('website') || 'bankrate.com'
}

export function setupSettings() {
	const websiteSelect = document.getElementById('website')
	
	websiteSelect.addEventListener('change', () => {
		let newValue = websiteSelect.value
		localStorage.setItem('website', newValue)
	})
	
	websiteSelect.value = fetchSelectedWebsite()
}