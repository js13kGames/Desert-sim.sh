const test = require('tape')
const { makeWorld, addEntity } = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.addEntity(world)', t => {
    t.plan(3)

    t.comment('...creating new world')
    const world = makeWorld()

    const entity0 = addEntity(world)
    t.same(entity0, 0, 'returns new entity key: 0')

    const entity1 = addEntity(world)
    t.same(entity1, 1, 'returns new entity key: 1')

    t.same(
      world.e,
      {
        k: [0, 1],
        c: [
          {
            k: [],
            d: [],
          },
          {
            k: [],
            d: [],
          },
        ],
      },
      'adds new entities to world'
    )
  })
}
