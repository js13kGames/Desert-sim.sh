const test = require('tape')
const {
  makeWorld,
  addEntity,
  addComponent,
  addProcessor,
  onUpdate,
} = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.onUpdate(world)', t => {
    t.plan(1)

    t.comment('...making new world')
    const world = makeWorld()

    t.comment('...adding new processor to world: foo')
    addProcessor(world, ['foo'], {
      u: w => {
        for (let i = 0; i < w.e.c.length; i++) {
          const idx = w.e.c[i].k.indexOf('foo')
          if (idx < 0) continue
          const data = w.e.c[i].d[idx]
          data.n = data.n + 1
        }
      },
    })
    t.comment('...adding new processor to world: bar')
    addProcessor(world, ['bar'], {
      u: w => {
        for (let i = 0; i < w.e.c.length; i++) {
          const idx = w.e.c[i].k.indexOf('bar')
          if (idx < 0) continue
          const data = w.e.c[i].d[idx]
          data.n = data.n + 1
        }
      },
    })

    t.comment('...adding new entity to world')
    const entityKey = addEntity(world)

    t.comment('...adding new components to entity: foo, bar')
    addComponent(world, entityKey, 'foo', { n: 0 })
    addComponent(world, entityKey, 'bar', { n: 0 })

    onUpdate(world)
    t.same(
      world.e.c,
      [
        {
          k: ['foo', 'bar'],
          d: [{ n: 1 }, { n: 1 }],
        },
      ],
      'runs update system hooks: foo, bar'
    )
  })
}
