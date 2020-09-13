const test = require('tape')
const { makeWorld, addEntity, addComponent } = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.addComponent(world, entityKey, componentKey, componentData)', t => {
    t.plan(2)

    t.comment('...creating new world')
    const world = makeWorld()
    t.comment('...adding new entity to world')
    const entityKey = addEntity(world)
    const entityIdx = world.e.k.indexOf(entityKey)

    addComponent(world, entityKey, 'foo', { bar: 'baz' })
    t.same(
      world.e.c[entityIdx],
      {
        k: ['foo'],
        d: [{ bar: 'baz' }],
      },
      'adds new component to entity: foo'
    )

    addComponent(world, entityKey, 'bar', { baz: 'foo' })
    t.same(
      world.e.c[entityIdx],
      {
        k: ['foo', 'bar'],
        d: [{ bar: 'baz' }, { baz: 'foo' }],
      },
      'adds new component to entity: bar'
    )
  })
}
