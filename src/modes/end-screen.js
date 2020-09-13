import shellViewFactory from '../display/views/shell'

function endScreenModeFactory(screen, score, updateState) {
  const shellView = shellViewFactory(screen, [
    ['You died of starvation.\n\nYour species is extinct...\n\n', 1, 104, 218],
    ['Score = ' + score + '\n\nPress enter to try again '],
  ])

  return {
    draw: shellView.draw,
    handleInput: input => {
      switch (input) {
        case 13:
          // enter
          if (shellView.isReady()) {
            updateState()
          }
          break
      }
    },
  }
}

export default endScreenModeFactory
