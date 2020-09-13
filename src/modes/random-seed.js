const MAX_SEED = 134456

/**
 * TODO
 *
 * @param {*} cb TODO
 * @returns {*} TODO
 */
function randomSeedModeFactory(cb) {
  return {
    draw: () => {},
    handleInput: () => cb(Math.floor(Math.random() * MAX_SEED)),
    // handleInput: () => cb(420),
  }
}

export default randomSeedModeFactory
