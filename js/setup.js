function setupToggle(
  nodeIndex,
  toggleOuter,
  toggleInner,
  setting,
  toggle1,
  toggle2,
  value1,
  value2
) {
  let platformSelected = localStorage.getItem(setting) || value1

  const option1 = document.getElementById(toggle1)
  const option2 = document.getElementById(toggle2)

  if (platformSelected === value1) {
    option1.classList.add('selected')
    option2.classList.remove('selected')
    toggleInner[nodeIndex].classList.remove('flip-toggle')
  } else if (platformSelected === value2) {
    option1.classList.remove('selected')
    option2.classList.add('selected')
    toggleInner[nodeIndex].classList.add('flip-toggle')
  }

  toggleOuter[nodeIndex].addEventListener('click', () => {
    platformSelected = localStorage.getItem(setting) || value1

    if (platformSelected === value1) {
      option1.classList.remove('selected')
      option2.classList.add('selected')
      toggleInner[nodeIndex].classList.add('flip-toggle')
      localStorage.setItem(setting, value2)
    } else if (platformSelected === value2) {
      option1.classList.add('selected')
      option2.classList.remove('selected')
      toggleInner[nodeIndex].classList.remove('flip-toggle')
      localStorage.setItem(setting, value1)
    }
  })
}

export default function setup() {
  let toggleOuter = document.querySelectorAll('.toggle-outer')
  let toggleInner = document.querySelectorAll('.toggle-inner')

  const settings = [
    ['platform', 'toggleWP', 'toggleSB', 'wordpress', 'storyblok'],
    ['website', 'toggleBR', 'toggleCC', 'bankrate.com', 'creditcards.com'],
    ['tables', 'toggleTableOn', 'toggleTableOff', 'on', 'off'],
    ['toc', 'toggleTocOn', 'toggleTocOff', 'on', 'off']
  ]

  settings.forEach((setting) => {
    const doesThisExistYet = localStorage.getItem(setting[0])
    if (!doesThisExistYet) {
      localStorage.setItem(setting[0], setting[3])
    }
  })

  settings.forEach((setting, index) => {
    setupToggle(
      index,
      toggleOuter,
      toggleInner,
      setting[0],
      setting[1],
      setting[2],
      setting[3],
      setting[4]
    )
  })
}
