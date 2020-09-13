import shellViewFactory from '../display/views/shell'

/**
 * TODO
 *
 * @param {*} screen TODO
 * @param {*} updateState TODO
 * @returns {*} TODO
 */
function titleSequenceFactory(screen, updateState) {
  const _shellView = shellViewFactory(screen, [
    [')', 60],
    ['desert-sim.sh', 10],
    // [
    //   '\n\nThen there was only "VOID".\n\n"VOID" gave way to "MIND",\n& "MIND" gave way to "WORD".\n\nThen "WORD" spoke...\n\n',
    //   1,
    //   0,
    //   3,
    // ],
    // ['<1> "Random world!"\n<2> "Choose world!"\n\n', 1, 0, 20],
    [
      '\n\n"Behind the dust, meanwhile,\nunder the vulture-haunted sky,\nthe desert waits - mesas,\nbutte, canyon, reef, sink,\nescarpment, pinnacle, maze,\ndry lake, sand dune and Barren\nMountain." -E. Abbey',
      1,
      104,
      218,
    ],
    ['\n\n<1> Random seed\n<2> Choose seed\n\n'],
    ['Enter <1-2> '],
  ])

  let _response = ''

  /**
   * TODO
   *
   * @param {*} t TODO
   */
  function _handleTextInput(t) {
    if (_shellView.isReady() && !_response.length) {
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
        if (_response.length) {
          updateState(parseInt(_response))
        }
        break
      case 49:
        // 1
        _handleTextInput('1')
        break
      case 50:
        // 2
        _handleTextInput('2')
        break
    }
  }

  return {
    draw: _shellView.draw,
    handleInput,
  }
}

export default titleSequenceFactory
