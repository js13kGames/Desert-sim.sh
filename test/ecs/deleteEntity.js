const test = require('tape')
const { makeWorld, addEntity, deleteEntity } = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.deleteEntity(world, entityKey)', t => {
    t.plan(2)

    t.comment('...creating new world')
    const world = makeWorld()
    t.comment('...adding new entities to world: 0, 1')
    const entityKey0 = addEntity(world)
    const entityKey1 = addEntity(world)

    deleteEntity(world, entityKey0)
    t.same(
      world.e,
      {
        k: [1],
        c: [
          {
            k: [],
            d: [],
          },
        ],
      },
      'removes entity from world: 0'
    )

    deleteEntity(world, entityKey1)
    t.same(
      world.e,
      {
        k: [],
        c: [],
      },
      'removes entity from world: 1'
    )
  })
}
