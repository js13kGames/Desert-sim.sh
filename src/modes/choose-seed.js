import shellViewFactory from '../display/views/shell'

const MAX_SEED = 134456

/**
 * TODO
 *
 * @param {*} screen TODO
 * @param {*} updateState TODO
 * @returns {*} TODO
 */
function chooseSeedModeFactory(screen, updateState) {
  const _shellView = shellViewFactory(screen, [
    // ['"Which world?" wondered "MIND".\n\n', 1, 0, 3],
    ['Enter seed <1-' + MAX_SEED + '> '],
  ])

  let _response = ''

  /**
   * TODO
   *
   * @param {*} t TODO
   */
  function _handleTextInput(t) {
    if (_shellView.isReady() && _response.length < 6) {
      _shellView.ingest([t])
      _response += t
    }
  }

  /**
   * TODO
   *
   * @param {*} input TODO
   */
  function handleInput(input) {
    switch (input) {
      case 8:
        // backspace
        if (_response.length) {
          _response = _response.slice(0, -1)
          _shellView.remove(1)
        }
        break
      case 13:
        // enter
        var responseInt = parseInt(_response) // intentional 'var' use re: hoisting & avoiding block brackets
        if (_response.length && responseInt && responseInt <= 134456)
          updateState(responseInt)
        break
      case 48:
        // 0
        _handleTextInput('0')
        break
      case 49:
        // 1
        _handleTextInput('1')
        break
      case 50:
        // 2
        _handleTextInput('2')
        break
      case 51:
        // 3
        _handleTextInput('3')
        break
      case 52:
        // 4
        _handleTextInput('4')
        break
      case 53:
        // 5
        _handleTextInput('5')
        break
      case 54:
        // 6
        _handleTextInput('6')
        break
      case 55:
        // 7
        _handleTextInput('7')
        break
      case 56:
        // 8
        _handleTextInput('8')
        break
      case 57:
        // 9
        _handleTextInput('9')
        break
    }
  }

  return {
    draw: _shellView.draw,
    handleInput,
  }
}

export default chooseSeedModeFactory
