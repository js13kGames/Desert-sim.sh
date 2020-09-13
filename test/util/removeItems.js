const test = require('tape')
const { removeItems } = require('../../dist/util.cjs.js')

module.exports = () => {
  test('util.removeItems(arr, idx, n)', t => {
    t.plan(1)

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    removeItems(arr, 2, 3)
    t.same(
      arr,
      [1, 2, 6, 7, 8, 9, 10],
      'removes n items from arr beginning at arr[idx]'
    )
  })
}
