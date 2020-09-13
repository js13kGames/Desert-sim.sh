/**
 * @typedef {object} Rng Seeded psuedo random number generator
 * @property {Function} getInt Returns next pseudo-rng integer, scaled to optional range
 */

const DEFAULT_SEED = 0 // x₀
const LCG_A = 8121 // multiplier
const LCG_C = 28411 // increment
const LCG_M = 134456 // modulus

/**
 * Factory function returning Rng instance
 *
 * @function rngFactory
 * @param {number} seed Seed to initialize psuedo-rng sequence with
 * @returns {Rng} Instance of seeded psuedo random number generator
 */
function rngFactory(seed) {
  // Internal state
  let x = seed || DEFAULT_SEED

  /**
   * Returns next pseudo-rng integer, scaled to optional range
   *
   * @function getInt
   * @param {number} range Optional, scales random int to range: (0,range]
   * @returns {number} Psuedo-random integer
   */
  function getInt(range) {
    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    // xₙ = (axₙ₋₁ + c) % m
    x = (LCG_A * x + LCG_C) % LCG_M
    // Scale result if range provided: [0, range)
    if (range) return Math.floor(x * (range / LCG_M))
    return x
  }

  return {
    getInt,
  }
}

export default rngFactory
