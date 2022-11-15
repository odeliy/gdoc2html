export default function setup() {
  const websiteToggleOuter = document.getElementById('websiteToggleOuter')
  const websiteToggleInner = document.getElementById('websiteToggleInner')
  const toggleBR = document.getElementById('toggleBR')
  const toggleCC = document.getElementById('toggleCC')

  const tablesToggleOuter = document.getElementById('tablesToggleOuter')
  const tablesToggleInner = document.getElementById('tablesToggleInner')
  const toggleTableOn = document.getElementById('toggleTableOn')
  const toggleTableOff = document.getElementById('toggleTableOff')

  const tocToggleOuter = document.getElementById('tocToggleOuter')
  const tocToggleInner = document.getElementById('tocToggleInner')
  const toggleTocOn = document.getElementById('toggleTocOn')
  const toggleTocOff = document.getElementById('toggleTocOff')

  const defaults = [
    ['website', 'bankrate.com'],
    ['tables', 'on'],
    ['toc', 'off']
  ]

  defaults.forEach((element) => {
    const alreadyInLocalStorage = localStorage.getItem(element[0])
    if (!alreadyInLocalStorage) {
      localStorage.setItem(element[0], element[1])
    }
  })

  // website toggle

  if (localStorage.getItem('website') === 'bankrate.com') {
    console.log('bankrate')
    toggleBR.classList.add('selected')
    toggleCC.classList.remove('selected')
    websiteToggleInner.classList.remove('flip-toggle')
    tocToggleInner.classList.remove('disabled')
  } else if (localStorage.getItem('website') === 'creditcards.com') {
    console.log('creditcards')
    toggleBR.classList.remove('selected')
    toggleCC.classList.add('selected')
    websiteToggleInner.classList.add('flip-toggle')
    tocToggleInner.classList.add('disabled')
    tocToggleOuter.removeEventListener('click', tocEventListener)
  }

  websiteToggleOuter.addEventListener('click', () => {
    let websiteSelection = localStorage.getItem('website')
    if (websiteSelection === 'bankrate.com') {
      toggleBR.classList.remove('selected')
      toggleCC.classList.add('selected')
      websiteToggleInner.classList.add('flip-toggle')
      tocToggleInner.classList.add('disabled')
      tocToggleOuter.removeEventListener('click', tocEventListener)
      localStorage.setItem('website', 'creditcards.com')
    } else if (websiteSelection === 'creditcards.com') {
      toggleBR.classList.add('selected')
      toggleCC.classList.remove('selected')
      websiteToggleInner.classList.remove('flip-toggle')
      tocToggleInner.classList.remove('disabled')
      tocToggleOuter.addEventListener('click', tocEventListener)
      localStorage.setItem('website', 'bankrate.com')
    }
  })

  // tables toggle
  if (localStorage.getItem('tables') === 'on') {
    toggleTableOn.classList.add('selected')
    toggleTableOff.classList.remove('selected')
    tablesToggleInner.classList.remove('flip-toggle')
  } else if (localStorage.getItem('tables') === 'off') {
    toggleTableOn.classList.remove('selected')
    toggleTableOff.classList.add('selected')
    tablesToggleInner.classList.add('flip-toggle')
  }

  tablesToggleOuter.addEventListener('click', () => {
    let tablesSelection = localStorage.getItem('tables')
    if (tablesSelection === 'on') {
      toggleTableOn.classList.remove('selected')
      toggleTableOff.classList.add('selected')
      tablesToggleInner.classList.add('flip-toggle')
      localStorage.setItem('tables', 'off')
    } else if (tablesSelection === 'off') {
      toggleTableOn.classList.add('selected')
      toggleTableOff.classList.remove('selected')
      tablesToggleInner.classList.remove('flip-toggle')
      localStorage.setItem('tables', 'on')
    }
  })

  // toc toggle
  if (localStorage.getItem('toc') === 'on') {
    toggleTocOn.classList.add('selected')
    toggleTocOff.classList.remove('selected')
    tocToggleInner.classList.remove('flip-toggle')
  } else if (localStorage.getItem('toc') === 'off') {
    toggleTocOn.classList.remove('selected')
    toggleTocOff.classList.add('selected')
    tocToggleInner.classList.add('flip-toggle')
  }

  function tocEventListener() {
    let tablesSelection = localStorage.getItem('toc')
    if (tablesSelection === 'on') {
      toggleTocOn.classList.remove('selected')
      toggleTocOff.classList.add('selected')
      tocToggleInner.classList.add('flip-toggle')
      localStorage.setItem('toc', 'off')
    } else if (tablesSelection === 'off') {
      toggleTocOn.classList.add('selected')
      toggleTocOff.classList.remove('selected')
      tocToggleInner.classList.remove('flip-toggle')
      localStorage.setItem('toc', 'on')
    }
  }

  tocToggleOuter.addEventListener('click', tocEventListener)
}
