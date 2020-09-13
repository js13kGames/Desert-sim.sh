import screenFactory from './display/screen'
import randomSeedFactory from './modes/random-seed'
import chooseSeedFactory from './modes/choose-seed'
import titleSequenceFactory from './modes/title-sequence'
import worldGenerationFactory from './modes/world-generation'
import mainViewFactory from './modes/main-view'
import endScreenFactory from './modes/end-screen'

// Constants
const TIMESTEP = 1000 / 30 // 30 game state steps per second
const KEY_CODES = [
  8, // Backspace
  13, // Enter
  37, // Left
  38, // Up
  39, // Right
  40, // Down
  48, // 0
  49, // 1
  50, // 2
  51, // 3
  52, // 4
  53, // 5
  54, // 6
  55, // 7
  56, // 8
  57, // 9
]
const DEBOUNCE_TIME = [5, 5, 5, 5, 20, 20, 5]

// Initialize game state
let _gameStep = -1
let _gameMode = 0
let _gameModes = []
let _gameSeed

let _inputBackspace = 0
let _inputEnter = 0
let _inputDown = 0
let _inputLeft = 0
let _inputRight = 0
let _inputUp = 0
let _input0 = 0
let _input1 = 0
let _input2 = 0
let _input3 = 0
let _input4 = 0
let _input5 = 0
let _input6 = 0
let _input7 = 0
let _input8 = 0
let _input9 = 0
let _inputDebounce = 0

let _loopTimerAccumulator = 0
let _loopTimerPrev = +new Date()

let _worldGrid,
  _worldNodes,
  _world,
  _worldFlora,
  _worldFauna,
  _worldMainOrganismId,
  _worldFaunaList
let _score = 0

// Initialize canvas context
const screen = screenFactory()

// Game mode helpers
const getWorldState = () => {
  return [
    _worldGrid,
    _worldNodes,
    _world,
    _worldFlora,
    _worldFauna,
    _worldMainOrganismId,
    _worldFaunaList,
  ]
}
const updateFauna = (
  thisId,
  thisNode,
  thisX,
  thisY,
  thisNextNode,
  thisNextX,
  thisNextY
) => {
  const faunaTile = _worldFauna[thisNode][thisX][thisY]
  _worldFauna[thisNode][thisX][thisY] = null
  _worldFauna[thisNextNode][thisNextX][thisNextY] = faunaTile
  const faunaData = _worldFaunaList[thisId]
  _worldFaunaList[thisId] = [thisNextNode, thisNextX, thisNextY, faunaData[3]]
}
const updateFlora = (floraNode, floraX, floraY, faunaId) => {
  _worldFlora[floraNode][floraX][floraY] =
    _worldFlora[floraNode][floraX][floraY] - 1
  _worldFaunaList[faunaId][3] = _worldFaunaList[faunaId][3] - 2
  if (faunaId === _worldMainOrganismId) _score++
}
const incrementHunger = faunaId => {
  _worldFaunaList[faunaId][3] = _worldFaunaList[faunaId][3] + 1
  return _worldFaunaList[faunaId][3]
}
const handleFaunaDeath = faunaId => {
  const dying = _worldFaunaList[faunaId]
  _worldFauna[dying[0]][dying[1]][dying[2]] = null
  _worldFaunaList[faunaId] = null
  _world[dying[0]][dying[1]][dying[2]] = [88, 0, 0]
  if (faunaId === _worldMainOrganismId) {
    setTimeout(() => {
      _gameModes.push(
        endScreenFactory(screen, _score, () => {
          location.reload()
        })
      )
      _gameMode = _gameModes.length - 1
    }, 1000)
  }
}
const initWorldGeneration = gameSeed => {
  _gameSeed = gameSeed
  _gameModes.push(
    worldGenerationFactory(
      screen,
      _gameSeed,
      (grid, nodes, world, flora, fauna, mainOrganismId, faunaList) => {
        _worldGrid = grid
        _worldNodes = nodes
        _world = world
        _worldFlora = flora
        _worldFauna = fauna
        _worldMainOrganismId = mainOrganismId
        _worldFaunaList = faunaList
        _gameModes.push(
          mainViewFactory(
            screen,
            getWorldState,
            _gameSeed,
            updateFauna,
            updateFlora,
            incrementHunger,
            handleFaunaDeath
          )
        )
        _gameMode = _gameModes.length - 1
      }
    )
  )
  _gameMode = _gameModes.length - 1
}

// Initialize game modes
_gameModes = [
  // 0: Title sequence
  titleSequenceFactory(screen, gameMode => (_gameMode = gameMode)),
  // 1: Random seed
  randomSeedFactory(initWorldGeneration),
  // 2: Choose seed
  chooseSeedFactory(screen, initWorldGeneration),
  // 3: World generation
  // 4: Main view
  // 5: Eco collapse screen
]

/**
 * Advances game state by one step
 *
 * @function updateState
 */
function updateState() {
  _gameStep++

  // Handle user input
  let input
  if (_inputDebounce && _gameStep % DEBOUNCE_TIME[_gameMode] === 0) {
    _inputDebounce = 0
  }
  if (!_inputDebounce) {
    if (_inputBackspace) {
      input = 8
    } else if (_inputEnter) {
      input = 13
    } else if (_inputLeft) {
      input = 37
    } else if (_inputUp) {
      input = 38
    } else if (_inputRight) {
      input = 39
    } else if (_inputDown) {
      input = 40
    } else if (_input0) {
      input = 48
    } else if (_input1) {
      input = 49
    } else if (_input2) {
      input = 50
    } else if (_input3) {
      input = 51
    } else if (_input4) {
      input = 52
    } else if (_input5) {
      input = 53
    } else if (_input6) {
      input = 54
    } else if (_input7) {
      input = 55
    } else if (_input8) {
      input = 56
    } else if (_input9) {
      input = 57
    }
    _inputDebounce = 1
  }
  _gameModes[_gameMode].handleInput(input)
  if (_gameModes[_gameMode].update != null)
    _gameModes[_gameMode].update(_gameStep)
}

/**
 * Draws frame for current game state
 *
 * @function drawFrame
 */
function drawFrame() {
  screen.clear()
  _gameModes[_gameMode].draw(_gameStep)
}

/**
 * Game loop: handle timer, advance game state, draw frame
 *
 * @function loop
 */
function loop() {
  // Handle loop timer
  const loopTimerNow = +new Date()
  const loopTimerDelta = loopTimerNow - _loopTimerPrev
  _loopTimerPrev = loopTimerNow
  _loopTimerAccumulator += loopTimerDelta
  // If at least one timestep has passed,
  // advance an equal number of gamesteps
  while (_loopTimerAccumulator >= TIMESTEP) {
    updateState()
    _loopTimerAccumulator -= TIMESTEP
  }
  // Draw frame w/ updated state
  drawFrame()
  // Recurse
  window.requestAnimationFrame(loop)
}

// Attach input handlers
const attachInputHandlers = (targetEvent, outputVal) => {
  document.addEventListener(targetEvent, e => {
    if (KEY_CODES.indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
    switch (e.keyCode) {
      case 8:
        _inputBackspace = outputVal
        break
      case 13:
        _inputEnter = outputVal
        break
      case 37:
        _inputLeft = outputVal
        break
      case 38:
        _inputUp = outputVal
        break
      case 39:
        _inputRight = outputVal
        break
      case 40:
        _inputDown = outputVal
        break
      case 48:
        _input0 = outputVal
        break
      case 49:
        _input1 = outputVal
        break
      case 50:
        _input2 = outputVal
        break
      case 51:
        _input3 = outputVal
        break
      case 52:
        _input4 = outputVal
        break
      case 53:
        _input5 = outputVal
        break
      case 54:
        _input6 = outputVal
        break
      case 55:
        _input7 = outputVal
        break
      case 56:
        _input8 = outputVal
        break
      case 57:
        _input9 = outputVal
        break
    }
  })
}
attachInputHandlers('keydown', 1)
attachInputHandlers('keyup', 0)

// Kickoff game loop
loop()
