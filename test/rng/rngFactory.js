const test = require('tape')
const rngFactory = require('../../dist/rng.cjs.js')

module.exports = () => {
  test('rngFactory()', t => {
    t.plan(6)

    // Tests
    const rng1 = rngFactory()
    t.same(rng1.getInt(), 28411, 'returns default int, n = 1')
    t.same(rng1.getInt(), 27646, 'returns default int, n = 2')
    t.same(rng1.getInt(), 57, 'returns default int, n = 3')

    const rng2 = rngFactory(42069)
    t.same(rng2.getInt(), 18064, 'returns seeded int, n = 1')
    t.same(rng2.getInt(), 34659, 'returns seeded int, n = 2')
    t.same(rng2.getInt(), 77742, 'returns seeded int, n = 3')

    t.end()
  })
}
