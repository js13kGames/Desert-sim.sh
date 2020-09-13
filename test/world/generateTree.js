const test = require('tape')
const rngFactory = require('../../dist/rng.cjs.js')
const { generateTree } = require('../../dist/world.cjs.js')

module.exports = () => {
  test('world.generateTree()', t => {
    t.plan(2)

    // Tests
    const rng1 = rngFactory()
    const tree1 = generateTree(12, rng1)
    t.same(
      tree1,
      [
        [1, 2, 3, 4, 11],
        [0],
        [0],
        [0, 5, 7],
        [0, 6, 9],
        [3],
        [4],
        [3, 8, 10],
        [7],
        [4],
        [7],
        [0],
      ],
      'returns default tree, n = 12'
    )

    const rng2 = rngFactory(42069)
    const tree2 = generateTree(12, rng2)
    t.same(
      tree2,
      [
        [1, 2, 3],
        [0, 8, 11],
        [0, 4, 9],
        [0, 5, 6, 7],
        [2],
        [3],
        [3],
        [3],
        [1],
        [2, 10],
        [9],
        [1],
      ],
      'returns seeded tree, n = 12'
    )

    t.end()
  })
}
