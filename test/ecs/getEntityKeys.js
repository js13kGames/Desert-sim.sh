const test = require('tape')
const {
  makeWorld,
  addEntity,
  addComponent,
  getEntityKeys,
  addProcessor,
} = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.getEntityKeys()', t => {
    t.plan(4)

    // Setup
    t.comment('...making new world')
    const world = makeWorld()

    t.comment('...adding processor to world: foo')
    addProcessor(world, ['foo'], () => {})
    t.comment('...adding processor to world: foo, bar')
    addProcessor(world, ['foo', 'bar'], () => {})
    t.comment('...adding processor to world: foo, baz')
    addProcessor(world, ['foo', 'baz'], () => {})
    t.comment('...adding processor to world: bar, baz')
    addProcessor(world, ['bar', 'baz'], () => {})

    t.comment('...adding new entity to world: 0')
    const entityKey0 = addEntity(world)
    t.comment('...adding new component to entity 0: foo')
    addComponent(world, entityKey0, 'foo', {})
    t.comment('...adding new component to entity 0: bar')
    addComponent(world, entityKey0, 'bar', {})

    t.comment('...adding new entity to world: 1')
    const entityKey1 = addEntity(world)
    t.comment('...adding new component to entity 1: foo')
    addComponent(world, entityKey1, 'foo')
    t.comment('...adding new component to entity 1: baz')
    addComponent(world, entityKey1, 'baz')

    // Tests
    const fooEntities = getEntityKeys(world, ['foo'])
    t.same(
      fooEntities,
      [0, 1],
      'returns keys of entities having components: foo'
    )

    const fooBarEntities = getEntityKeys(world, ['foo', 'bar'])
    t.same(
      fooBarEntities,
      [0],
      'returns keys of entities having components: foo, bar'
    )

    const fooBazEntities = getEntityKeys(world, ['foo', 'baz'])
    t.same(
      fooBazEntities,
      [1],
      'returns keys of entities having components: foo, baz'
    )

    const barBazEntities = getEntityKeys(world, ['bar', 'baz'])
    t.same(
      barBazEntities,
      [],
      'returns keys of entities having components: bar, baz'
    )
  })
}
