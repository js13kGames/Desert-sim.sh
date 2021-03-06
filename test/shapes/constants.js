const test = require('tape')
const {
  TILE_WIDTH,
  TILE_HEIGHT,
  SHAPE_FEATURES,
} = require('../../dist/constants.shapes.cjs.js')

module.exports = () => {
  test('shapes.constants', t => {
    t.plan(3)

    // NB: Ignoring BITS_PER_SHAPE and CODE_TO_SHAPE
    // given they are completely static

    t.same(TILE_WIDTH, 64, 'returns expected TILE_WIDTH')
    t.same(TILE_HEIGHT, 64, 'returns expected TILE_HEIGHT')

    t.same(
      SHAPE_FEATURES,
      [
        [[6, 6, 52, 52]], // P
        [[58, 58, 5, 5]], // O
        [
          // N
          [52, 52, 6, 6],
          [51, 51, 6, 6],
          [50, 50, 6, 6],
          [49, 49, 6, 6],
          [48, 48, 6, 6],
          [47, 47, 6, 6],
          [46, 46, 6, 6],
          [45, 45, 6, 6],
          [44, 44, 6, 6],
          [43, 43, 6, 6],
          [42, 42, 6, 6],
          [41, 41, 6, 6],
          [40, 40, 6, 6],
          [39, 39, 6, 6],
          [38, 38, 6, 6],
          [37, 37, 6, 6],
          [36, 36, 6, 6],
          [35, 35, 6, 6],
          [34, 34, 6, 6],
          [33, 33, 6, 6],
          [32, 32, 6, 6],
          [31, 31, 6, 6],
          [30, 30, 6, 6],
          [29, 29, 6, 6],
        ],
        [[30, 30, 4, 28]], // M
        [
          // L
          [6, 52, 6, 6],
          [7, 51, 6, 6],
          [8, 50, 6, 6],
          [9, 49, 6, 6],
          [10, 48, 6, 6],
          [11, 47, 6, 6],
          [12, 46, 6, 6],
          [13, 45, 6, 6],
          [14, 44, 6, 6],
          [15, 43, 6, 6],
          [16, 42, 6, 6],
          [17, 41, 6, 6],
          [18, 40, 6, 6],
          [19, 39, 6, 6],
          [20, 38, 6, 6],
          [21, 37, 6, 6],
          [22, 36, 6, 6],
          [23, 35, 6, 6],
          [24, 34, 6, 6],
          [25, 33, 6, 6],
          [26, 32, 6, 6],
          [27, 31, 6, 6],
          [28, 30, 6, 6],
          [29, 29, 6, 6],
        ],
        [
          // K
          [52, 6, 6, 6],
          [51, 7, 6, 6],
          [50, 8, 6, 6],
          [49, 9, 6, 6],
          [48, 10, 6, 6],
          [47, 11, 6, 6],
          [46, 12, 6, 6],
          [45, 13, 6, 6],
          [44, 14, 6, 6],
          [43, 15, 6, 6],
          [42, 16, 6, 6],
          [41, 17, 6, 6],
          [40, 18, 6, 6],
          [39, 19, 6, 6],
          [38, 20, 6, 6],
          [37, 21, 6, 6],
          [36, 22, 6, 6],
          [35, 23, 6, 6],
          [34, 24, 6, 6],
          [33, 25, 6, 6],
          [32, 26, 6, 6],
          [31, 27, 6, 6],
          [30, 28, 6, 6],
          [29, 29, 6, 6],
        ],
        [[29, 6, 6, 29]], // J
        [
          // I
          [6, 6, 6, 6],
          [7, 7, 6, 6],
          [8, 8, 6, 6],
          [9, 9, 6, 6],
          [10, 10, 6, 6],
          [11, 11, 6, 6],
          [12, 12, 6, 6],
          [13, 13, 6, 6],
          [14, 14, 6, 6],
          [15, 15, 6, 6],
          [16, 16, 6, 6],
          [17, 17, 6, 6],
          [18, 18, 6, 6],
          [19, 19, 6, 6],
          [20, 20, 6, 6],
          [21, 21, 6, 6],
          [22, 22, 6, 6],
          [23, 23, 6, 6],
          [24, 24, 6, 6],
          [25, 25, 6, 6],
          [26, 26, 6, 6],
          [27, 27, 6, 6],
          [28, 28, 6, 6],
          [29, 29, 6, 6],
        ],
        [[29, 29, 29, 6]], // H
        [[6, 29, 29, 6]], // G
        [[6, 6, 6, 29]], // F
        [[6, 30, 4, 28]], // E
        [[6, 54, 52, 4]], // D
        [[54, 30, 4, 28]], // C
        [[52, 6, 6, 29]], // B
        [[6, 6, 52, 6]], // A
      ],
      'returns expected SHAPE_FEATURES'
    )
  })
}
