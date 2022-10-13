function setupAccorion() {
  const accordion = document.getElementsByClassName('accordion__content-box')

  for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', (e) => {
      accordion[i].classList.toggle('active')
    })
  }
}

function updateWebsite() {
  let websiteSelected = localStorage.getItem('website') || 'bankrate.com'

  if (websiteSelected === 'bankrate.com') {
    toggleSwitchInner.classList.add('flip-toggle')
    toggleBR.classList.remove('selected')
    toggleCC.classList.add('selected')
    localStorage.setItem('website', 'creditcards.com')
  } else {
    toggleSwitchInner.classList.remove('flip-toggle')
    toggleBR.classList.add('selected')
    toggleCC.classList.remove('selected')
    localStorage.setItem('website', 'bankrate.com')
  }
}

function setupToggle() {
  const toggleSwitchOuter = document.getElementById('toggleSwitchOuter')
  const toggleSwitchInner = document.getElementById('toggleSwitchInner')
  const toggleBR = document.getElementById('toggleBR')
  const toggleCC = document.getElementById('toggleCC')

  let websiteSelected = localStorage.getItem('website') || 'bankrate.com'

  if (websiteSelected === 'bankrate.com') {
    toggleSwitchInner.classList.remove('flip-toggle')
    toggleBR.classList.add('selected')
    toggleCC.classList.remove('selected')
  } else {
    // creditcards.com is selected
    toggleSwitchInner.classList.add('flip-toggle')
    toggleBR.classList.remove('selected')
    toggleCC.classList.add('selected')
  }

  // toggle local storage and visual indicator between br.com and cc.com
  toggleSwitchOuter.addEventListener('click', () => updateWebsite())
}

function setup() {
  setupAccorion()
  setupToggle()
}

export { setup }
