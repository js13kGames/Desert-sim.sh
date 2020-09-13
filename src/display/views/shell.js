const DEFAULT_SPEED = 1
const DEFAULT_COLOR = 20
const DEFAULT_BG_COLOR = 0

/**
 * TODO
 *
 * @param {*} screen TODO
 * @param {*} initialScript TODO
 * @returns {*} TODO
 */
function shellViewFactory(screen, initialScript) {
  let cursor = 0
  let text = ''
  let speeds = []
  let colors = []
  let bgColors = []
  let initialIngest = 1
  let initialTextLength = 0

  /**
   * TODO
   *
   * @param {number} gameStep TODO
   */
  function draw(gameStep) {
    let xTile = 0
    let yTile = 0
    for (let i = 0; i <= cursor; i++) {
      const shape = text.charCodeAt(i)
      // If '\n'
      if (shape === 10) {
        xTile = 0
        yTile++
      } else {
        xTile++
        screen.drawShape(shape, xTile, yTile, colors[i], bgColors[i])
      }
    }
    screen.drawShape(1, xTile + 1, yTile, DEFAULT_COLOR, DEFAULT_BG_COLOR) // cursor

    if (!(gameStep % speeds[cursor]) && cursor + 1 < text.length) cursor++
  }

  /**
   * TODO
   *
   * @param {*} script TODO
   */
  function ingest(script) {
    for (let i = 0; i < script.length; i++) {
      const section = script[i]
      text += section[0]
      if (initialIngest) initialTextLength += section[0].length
      for (let j = 0; j < section[0].length; j++) {
        speeds.push(section[1] || DEFAULT_SPEED)
        colors.push(section[2] == null ? DEFAULT_COLOR : section[2])
        bgColors.push(section[3] == null ? DEFAULT_BG_COLOR : section[3])
      }
    }
  }
  ingest(initialScript)
  initialIngest = 0

  /**
   * TODO
   *
   * @returns {*} TODO
   */
  function isReady() {
    let v = 0
    if (cursor + 1 >= initialTextLength) v = 1
    return v
  }

  /**
   * TODO
   *
   * @param {*} n TODO
   */
  function remove(n) {
    n = n * -1
    cursor += n
    text = text.slice(0, n)
    speeds = speeds.slice(0, n)
    colors = colors.slice(0, n)
    bgColors = bgColors.slice(0, n)
  }

  return { draw, ingest, isReady, remove }
}

export default shellViewFactory
