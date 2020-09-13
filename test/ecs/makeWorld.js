const test = require('tape')
const { makeWorld } = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.makeWorld()', t => {
    t.plan(1)

    const world = makeWorld()
    t.same(
      world,
      {
        i: 0,
        p: {
          k: [],
          h: [],
          e: [],
        },
        e: {
          k: [],
          c: [],
        },
      },
      'returns new world object'
    )
  })
}
