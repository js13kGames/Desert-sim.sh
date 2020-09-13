const test = require('tape')
const { makeWorld, addProcessor } = require('../../dist/ecs.cjs.js')

module.exports = () => {
  test('ecs.addProcessor(world, componentKeys, processor)', t => {
    t.plan(1)

    t.comment('...creating new world')
    const world = makeWorld()

    const hookFn = () => {}
    addProcessor(world, ['foo', 'bar'], {
      u: hookFn,
    })
    t.same(
      world.p,
      {
        k: ['bar,foo'],
        h: [
          {
            u: hookFn,
          },
        ],
        e: [[]],
      },
      'adds processor to world'
    )
  })
}
