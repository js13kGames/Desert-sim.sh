import { RGB_256 } from './colors'
import shapesFactory from './shapes'

const ASPECT_RATIO_W = 16
const ASPECT_RATIO_H = 9
const ASPECT_RATIO = ASPECT_RATIO_W / ASPECT_RATIO_H
const TILES_PER_ROW = ASPECT_RATIO_W * 2
const TILES_PER_COL = ASPECT_RATIO_H * 2
const MARGIN_PX = 40

/**
 * @function screenFactory
 * @returns {CanvasRenderingContext2D} Screen context
 */
function screenFactory() {
  const canvas = document.getElementById('c')
  const context = canvas.getContext('2d')

  const shapes = shapesFactory(canvas, RGB_256)

  let w, h, tileSize

  const _invalidCanvasWidth = n =>
    n % ASPECT_RATIO_W > 0 || (n / ASPECT_RATIO_W) % 2 > 0

  /**
   * @function _setCanvasSize
   */
  function _setCanvasSize() {
    w = window.innerWidth
    h = window.innerHeight
    if (w / h < ASPECT_RATIO) {
      w = w - MARGIN_PX
      while (_invalidCanvasWidth(w)) {
        w--
      }
      h = w / ASPECT_RATIO
    } else {
      h = h - MARGIN_PX
      w = Math.floor(h * ASPECT_RATIO)
      while (_invalidCanvasWidth(w)) {
        w--
      }
      h = w / ASPECT_RATIO
    }
    tileSize = w / TILES_PER_ROW
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.width = w
    canvas.height = h
    // console.log(`window.innerWidth: ${window.innerWidth}`)
    // console.log(`window.innerHeight: ${window.innerHeight}`)
    // console.log(`canvas w: ${w}`)
    // console.log(`canvas h: ${h}`)
    // console.log(`tileSize: ${tileSize}`)
  }
  _setCanvasSize()
  window.addEventListener('resize', _setCanvasSize)

  /**
   * Clears canvas
   *
   * @function clear
   */
  function clear() {
    // const x = xTile ? xTile * tileSize : 0
    // const y = yTile ? yTile * tileSize : 0
    // const w = xTile != null && yTile != null ? tileSize : canvas.width
    // const h = xTile != null && yTile != null ? tileSize : canvas.height
    context.clearRect(0, 0, w, h)
  }

  function drawFrame(data) {
    for (let x = 0; x < TILES_PER_ROW; x++) {
      for (let y = 0; y < TILES_PER_COL; y++) {
        const tile = data[x][y]
        if (tile) {
          drawShape(tile[0], x, y, tile[1], tile[2])
        }
      }
    }
  }

  /**
   * TODO
   *
   * @function drawShape
   * @param {number} shape TODO
   * @param {number} xTile TODO
   * @param {number} yTile TODO
   * @param {number} color TODO
   * @param {number} bgColor TODO
   */
  function drawShape(shape, xTile, yTile, color, bgColor) {
    const x = xTile * tileSize
    const y = yTile * tileSize
    if (bgColor) {
      context.fillStyle = RGB_256[bgColor]
      context.fillRect(x, y, tileSize, tileSize)
    }
    shapes.drawShape(shape, x, y, tileSize, color)
  }

  /**
   * Draws background by filling rectangle from 0,0 to canvasWidth,canvasHeight w/ provided color
   *
   * @function fillBg
   * @param {string} color Background color
   */
  function fillBg(color) {
    context.fillStyle = RGB_256[color]
    context.fillRect(0, 0, w, h)
  }

  return {
    clear,
    drawFrame,
    drawShape,
    fillBg,
  }
}

export default screenFactory
