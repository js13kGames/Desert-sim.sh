const test = require('tape')
const {
  makeWorld,
  addEntity,
  addComponent,
  deleteComponent,
} = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.deleteComponent(world, entityKey, componentKey)', t => {
    t.plan(2)

    t.comment('...creating new world')
    const world = makeWorld()
    t.comment('...adding new entity to world')
    const entityKey = addEntity(world)
    const entityIdx = world.e.k.indexOf(entityKey)
    t.comment('...adding new components to entity: foo, bar')
    addComponent(world, entityKey, 'foo', { bar: 'baz' })
    addComponent(world, entityKey, 'bar', { baz: 'foo' })

    deleteComponent(world, entityKey, 'foo')
    t.same(
      world.e.c[entityIdx],
      {
        k: ['bar'],
        d: [{ baz: 'foo' }],
      },
      'removes component from entity: foo'
    )

    deleteComponent(world, entityKey, 'bar')
    t.same(
      world.e.c[entityIdx],
      {
        k: [],
        d: [],
      },
      'removes component from entity: bar'
    )
  })
}
