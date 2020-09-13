/*
  16-Feature LCD Shapes (14 Segments + Decimal + Fill)

  LCD shapes are encoded as int16 numbers with each bit
  corresponding to one of the following features:

  P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A
  ————A————
  |\  |  /|
  F I J K B
  |  \|/  |
  --G---H--
  |  /|\  |
  E L M N C
  |/  |  \|
  ————D———— O
  P: Fill entire box
*/

// Tile dimensions
const W = 52 // Prime factors: 2, 13
const H = 52
const MX = 6 // Prime factors: 2, 3
const MY = 6
const TILE_WIDTH = MX * 2 + W // 64px
const TILE_HEIGHT = MY * 2 + H // 64px

// Number of relevant bits per shape encoding
const BITS_PER_SHAPE = 16 // 16 bits = 16 features
// 2D array of rect arrays which form LCD shape features when drawn
const SHAPE_FEATURES = [
  // P: Fill entire box*
  [[MX, MY, W, H]],
  // O: Decimal*
  [[MX + W, MY + H, MX - 1, MY - 1]],
  // N: South-east inner edge*
  Array.from(Array(W / 2 - MX / 2 + 1), (v, i) => [W - i, H - i, MX, MY]),
  // M: Inner south edge
  [[MX + W / 2 - W / 26, MY + H / 2 - H / 26, W / 13, H / 2 + H / 26]],
  // L: South-west inner edge*
  Array.from(Array(W / 2 - MX / 2 + 1), (v, i) => [MX + i, H - i, MX, MY]),
  // K: North-east inner edge*
  Array.from(Array(W / 2 - MX / 2 + 1), (v, i) => [W - i, MY + i, MX, MY]),
  // J: North inner edge*
  [[MX / 2 + W / 2, MY, MX, MY / 2 + H / 2]],
  // I: North-west inner edge*
  Array.from(Array(W / 2 - MX / 2 + 1), (v, i) => [MX + i, MY + i, MX, MY]),
  // H: East inner edge*
  [[MX / 2 + W / 2, MY / 2 + H / 2, MX / 2 + W / 2, MY]],
  // G: West inner edge*
  [[MX, MY / 2 + H / 2, MX / 2 + W / 2, MY]],
  // F: West-north edge*
  [[MX, MY, MX, H / 2 + MY / 2]],
  // E: West-south edge
  [[MX, MY + H / 2 - H / 26, W / 13, H / 2 + H / 26]],
  // D: South edge
  [[MX, MY + H - H / 13, W, H / 13]],
  // C: East-south edge
  [[MX + W - W / 13, MY + H / 2 - H / 26, W / 13, H / 2 + H / 26]],
  // B: East-north edge*
  [[W, MY, MX, H / 2 + MY / 2]],
  // A: North edge*
  [[MX, MY, W, MY]],
]

// Lookup table that maps UTF-16 character codes (32-127)
// to numbers which encode LCD shapes, leaving (0-31)
// for custom shapes
const CODE_TO_SHAPE = [
  0, //   0: (empty)
  32768, //   1: (fill)
  16383, //   2: (all segments)
  55, //   3: (staple; A,B,C,E,F)
  54, //   4: (pipe, vertical; B, C, E, F)
  9, //   5: (pipe, horizontal; A, D)
  49, //   6: (corner, northwest; A, E, F)
  7, //   7: (corner, northeast; A, B, C)
  14, //   8: (corner, southwest; B, C, D)
  // NB: 76: L = (corner, southeast; D, E, F)
  0, //   9: (empty)
  0, //  10: (line feed; \n)
  0, //  11: (empty)
  0, //  12: (empty)
  0, //  13: (empty)
  0, //  14: (empty)
  0, //  15: (empty)
  0, //  16: (empty)
  0, //  17: (empty)
  0, //  18: (empty)
  0, //  19: (empty)
  0, //  20: (empty)
  0, //  21: (empty)
  0, //  22: (empty)
  0, //  23: (empty)
  0, //  24: (empty)
  0, //  25: (empty)
  0, //  26: (empty)
  0, //  27: (empty)
  0, //  28: (empty)
  0, //  29: (empty)
  0, //  30: (empty)
  0, //  31: (empty)
  0, //  32: (space)
  16390, //  33: !
  514, //  34: "
  4814, //  35: #
  4845, //  36: $
  16356, //  37: %
  9049, //  38: &
  512, //  39: '
  9216, //  40: (
  2304, //  41: )
  16320, //  42: *
  4800, //  43: +
  2048, //  44: ,
  192, //  45: -
  16384, //  46: .
  3072, //  47: /
  3135, //  48: 0
  1030, //  49: 1
  219, //  50: 2
  143, //  51: 3
  230, //  52: 4
  8297, //  53: 5
  253, //  54: 6
  7, //  55: 7
  255, //  56: 8
  239, //  57: 9
  4608, //  58: :
  2560, //  59: ;
  9280, //  60: <
  200, //  61: =
  2432, //  62: >
  20611, //  63: ?
  699, //  64: @
  247, //  65: A
  4751, //  66: B
  57, //  67: C
  4623, //  68: D
  121, //  69: E
  113, //  70: F
  189, //  71: G
  246, //  72: H
  4617, //  73: I
  30, //  74: J
  9328, //  75: K
  56, //  76: L
  1334, //  77: M
  8502, //  78: N
  63, //  79: O
  243, //  80: P
  8255, //  81: Q
  8435, //  82: R
  237, //  83: S
  4609, //  84: T
  62, //  85: U
  3120, //  86: V
  10294, //  87: W
  11520, //  88: X
  238, //  89: Y
  3081, //  90: Z
  57, //  91: [
  8448, //  92: \
  15, //  93: ]
  10240, //  94: ^
  8, //  95: _
  256, //  96: `
  4184, //  97: a
  8312, //  98: b
  216, //  99: c
  2190, // 100: d
  2136, // 101: e
  5312, // 102: f
  1166, // 103: g
  4208, // 104: h
  4096, // 105: i
  2576, // 106: j
  13824, // 107: k
  48, // 108: l
  4308, // 109: m
  4176, // 110: n
  220, // 111: o
  368, // 112: p
  1158, // 113: q
  80, // 114: r
  8328, // 115: s
  120, // 116: t
  28, // 117: u
  2064, // 118: v
  10260, // 119: w
  11520, // 120: x
  654, // 121: y
  2120, // 122: z
  2377, // 123: {
  4608, // 124: |
  9353, // 125: }
  3264, // 126: ~
  0, // 127: (del)
]

/**
 * TODO
 *
 * @function shapesFactory
 * @param {CanvasRenderingContext2D} canvas TODO
 * @param {Array<string>} colors TODO
 * @returns {object} TODO
 */
function shapesFactory(canvas, colors) {
  // Initialize off-screen canvas as cache for shape drawings
  const cache = document.createElement('canvas')
  const cacheWidth = TILE_WIDTH * CODE_TO_SHAPE.length
  const cacheHeight = TILE_HEIGHT * colors.length
  cache.width = cacheWidth
  cache.height = cacheHeight
  canvas.offscreenCanvas = cache
  const isCached = new Array(CODE_TO_SHAPE.length)

  // Get canvas contexts
  const canvasCtx = canvas.getContext('2d')
  const cacheCtx = cache.getContext('2d')

  // Define canvas helpers
  const drawSegment = rects => {
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i]
      cacheCtx.fillRect(rect[0], rect[1], rect[2], rect[3])
    }
  }

  /**
   * Method for drawing shape w/ caching
   *
   * @param {number} shape TODO
   * @param {number} x TODO
   * @param {number} y TODO
   * @param {number} tileSize TODO
   * @param {number} color TODO
   */
  function drawShape(shape, x, y, tileSize, color) {
    const cacheX = shape * TILE_WIDTH
    const cacheY = color * TILE_HEIGHT
    if (!isCached[shape]) {
      isCached[shape] = new Array(colors.length)
    }
    if (!isCached[shape][color]) {
      // Draw shape in cache context
      cacheCtx.save()
      cacheCtx.fillStyle = colors[color]
      cacheCtx.translate(cacheX, cacheY)
      const shapeCode = CODE_TO_SHAPE[shape]
      const shapeBits = shapeCode.toString(2).padStart(BITS_PER_SHAPE, '0')
      let i = BITS_PER_SHAPE
      while (i--) {
        if (parseInt(shapeBits.charAt(i), 2)) {
          drawSegment(SHAPE_FEATURES[i])
        }
      }
      cacheCtx.fill()
      cacheCtx.restore()
      // Record that shape is cached
      isCached[shape][color] = 1
    }

    canvasCtx.drawImage(
      cache,
      cacheX,
      cacheY,
      TILE_WIDTH,
      TILE_HEIGHT,
      x,
      y,
      tileSize,
      tileSize
    )
  }

  return { drawShape }
}

export default shapesFactory
