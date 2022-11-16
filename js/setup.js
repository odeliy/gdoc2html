function platformEventListener() {
  let platformSelection = localStorage.getItem('platform')
  if (platformSelection === 'wordpress') {
    toggleWP.classList.remove('selected')
    toggleSB.classList.add('selected')
    platformToggleInner.classList.add('flip-toggle')
    localStorage.setItem('platform', 'storyblok')
  } else if (platformSelection === 'storyblok') {
    toggleWP.classList.add('selected')
    toggleSB.classList.remove('selected')
    platformToggleInner.classList.remove('flip-toggle')
    localStorage.setItem('platform', 'wordpress')
  }
}

function websiteEventListener() {
  let websiteSelection = localStorage.getItem('website')
  if (websiteSelection === 'bankrate.com') {
    toggleBR.classList.remove('selected')
    toggleCC.classList.add('selected')
    websiteToggleInner.classList.add('flip-toggle')
    localStorage.setItem('website', 'creditcards.com')
  } else if (websiteSelection === 'creditcards.com') {
    toggleBR.classList.add('selected')
    toggleCC.classList.remove('selected')
    websiteToggleInner.classList.remove('flip-toggle')
    localStorage.setItem('website', 'bankrate.com')
  }
}

function tablesEventListener() {
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

export default function setup() {
  const platformToggleOuter = document.getElementById('platformToggleOuter')
  const platformToggleInner = document.getElementById('platformToggleInner')
  const toggleWP = document.getElementById('toggleWP')
  const toggleSB = document.getElementById('toggleSB')

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
    ['platform', 'wordpress'],
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

  // platform toggle
  if (localStorage.getItem('platform') === 'wordpress') {
    toggleWP.classList.add('selected')
    toggleSB.classList.remove('selected')
    platformToggleInner.classList.remove('flip-toggle')
  } else if (localStorage.getItem('platform') === 'storyblok') {
    toggleWP.classList.remove('selected')
    toggleSB.classList.add('selected')
    platformToggleInner.classList.add('flip-toggle')
  }
  platformToggleOuter.addEventListener('click', platformEventListener)

  // website toggle
  if (localStorage.getItem('website') === 'bankrate.com') {
    toggleBR.classList.add('selected')
    toggleCC.classList.remove('selected')
    websiteToggleInner.classList.remove('flip-toggle')
  } else if (localStorage.getItem('website') === 'creditcards.com') {
    toggleBR.classList.remove('selected')
    toggleCC.classList.add('selected')
    websiteToggleInner.classList.add('flip-toggle')
    tocToggleOuter.removeEventListener('click', tocEventListener)
  }
  websiteToggleOuter.addEventListener('click', websiteEventListener)

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
  tablesToggleOuter.addEventListener('click', tablesEventListener)

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
  tocToggleOuter.addEventListener('click', tocEventListener)
}
