let resultHolder = document.getElementById('result')

window.addEventListener('paste', (event) => {
	let html = event.clipboardData.getData('text/html')
	resultHolder.innerHTML = html
    console.log(html)
})

