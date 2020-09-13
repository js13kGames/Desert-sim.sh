const test = require('tape')
const { matchesProcessorKey } = require('../../dist/util.cjs.js')

module.exports = () => {
  test('util.matchesProcessorKey(processorKey, componentKeys)', t => {
    t.plan(2)

    t.same(
      matchesProcessorKey('foo,bar,baz', ['foo', 'bar', 'baz']),
      true,
      'returns true when processorKey matches'
    )

    t.same(
      matchesProcessorKey('foo,bar,baz', ['foo', 'bar']),
      false,
      'returns true when processorKey matches'
    )
  })
}
