/*
  Generates 8-bit color list (i.e., 256 RGB strings)

  [
    'rgb(0,0,0)',
    'rgb(0,0,85)',
    'rgb(0,0,170)',
    'rgb(0,0,255)',
    'rgb(0,36,0)',
    'rgb(0,36,85)',
    'rgb(0,36,170)',
    'rgb(0,36,255)',
    'rgb(0,73,0)',
    'rgb(0,73,85)',
    'rgb(0,73,170)',
    'rgb(0,73,255)',
    'rgb(0,109,0)',
    'rgb(0,109,85)',
    'rgb(0,109,170)',
    'rgb(0,109,255)',
    'rgb(0,146,0)',
    'rgb(0,146,85)',
    'rgb(0,146,170)',
    'rgb(0,146,255)',
    'rgb(0,182,0)',
    'rgb(0,182,85)',
    'rgb(0,182,170)',
    'rgb(0,182,255)',
    'rgb(0,219,0)',
    'rgb(0,219,85)',
    'rgb(0,219,170)',
    'rgb(0,219,255)',
    'rgb(0,255,0)',
    'rgb(0,255,85)',
    'rgb(0,255,170)',
    'rgb(0,255,255)',
    'rgb(36,0,0)',
    'rgb(36,0,85)',
    'rgb(36,0,170)',
    'rgb(36,0,255)',
    'rgb(36,36,0)',
    'rgb(36,36,85)',
    'rgb(36,36,170)',
    'rgb(36,36,255)',
    'rgb(36,73,0)',
    'rgb(36,73,85)',
    'rgb(36,73,170)',
    'rgb(36,73,255)',
    'rgb(36,109,0)',
    'rgb(36,109,85)',
    'rgb(36,109,170)',
    'rgb(36,109,255)',
    'rgb(36,146,0)',
    'rgb(36,146,85)',
    'rgb(36,146,170)',
    'rgb(36,146,255)',
    'rgb(36,182,0)',
    'rgb(36,182,85)',
    'rgb(36,182,170)',
    'rgb(36,182,255)',
    'rgb(36,219,0)',
    'rgb(36,219,85)',
    'rgb(36,219,170)',
    'rgb(36,219,255)',
    'rgb(36,255,0)',
    'rgb(36,255,85)',
    'rgb(36,255,170)',
    'rgb(36,255,255)',
    'rgb(73,0,0)',
    'rgb(73,0,85)',
    'rgb(73,0,170)',
    'rgb(73,0,255)',
    'rgb(73,36,0)',
    'rgb(73,36,85)',
    'rgb(73,36,170)',
    'rgb(73,36,255)',
    'rgb(73,73,0)',
    'rgb(73,73,85)',
    'rgb(73,73,170)',
    'rgb(73,73,255)',
    'rgb(73,109,0)',
    'rgb(73,109,85)',
    'rgb(73,109,170)',
    'rgb(73,109,255)',
    'rgb(73,146,0)',
    'rgb(73,146,85)',
    'rgb(73,146,170)',
    'rgb(73,146,255)',
    'rgb(73,182,0)',
    'rgb(73,182,85)',
    'rgb(73,182,170)',
    'rgb(73,182,255)',
    'rgb(73,219,0)',
    'rgb(73,219,85)',
    'rgb(73,219,170)',
    'rgb(73,219,255)',
    'rgb(73,255,0)',
    'rgb(73,255,85)',
    'rgb(73,255,170)',
    'rgb(73,255,255)',
    'rgb(109,0,0)',
    'rgb(109,0,85)',
    'rgb(109,0,170)',
    'rgb(109,0,255)',
    'rgb(109,36,0)',
    'rgb(109,36,85)',
    'rgb(109,36,170)',
    'rgb(109,36,255)',
    'rgb(109,73,0)',
    'rgb(109,73,85)',
    'rgb(109,73,170)',
    'rgb(109,73,255)',
    'rgb(109,109,0)',
    'rgb(109,109,85)',
    'rgb(109,109,170)',
    'rgb(109,109,255)',
    'rgb(109,146,0)',
    'rgb(109,146,85)',
    'rgb(109,146,170)',
    'rgb(109,146,255)',
    'rgb(109,182,0)',
    'rgb(109,182,85)',
    'rgb(109,182,170)',
    'rgb(109,182,255)',
    'rgb(109,219,0)',
    'rgb(109,219,85)',
    'rgb(109,219,170)',
    'rgb(109,219,255)',
    'rgb(109,255,0)',
    'rgb(109,255,85)',
    'rgb(109,255,170)',
    'rgb(109,255,255)',
    'rgb(146,0,0)',
    'rgb(146,0,85)',
    'rgb(146,0,170)',
    'rgb(146,0,255)',
    'rgb(146,36,0)',
    'rgb(146,36,85)',
    'rgb(146,36,170)',
    'rgb(146,36,255)',
    'rgb(146,73,0)',
    'rgb(146,73,85)',
    'rgb(146,73,170)',
    'rgb(146,73,255)',
    'rgb(146,109,0)',
    'rgb(146,109,85)',
    'rgb(146,109,170)',
    'rgb(146,109,255)',
    'rgb(146,146,0)',
    'rgb(146,146,85)',
    'rgb(146,146,170)',
    'rgb(146,146,255)',
    'rgb(146,182,0)',
    'rgb(146,182,85)',
    'rgb(146,182,170)',
    'rgb(146,182,255)',
    'rgb(146,219,0)',
    'rgb(146,219,85)',
    'rgb(146,219,170)',
    'rgb(146,219,255)',
    'rgb(146,255,0)',
    'rgb(146,255,85)',
    'rgb(146,255,170)',
    'rgb(146,255,255)',
    'rgb(182,0,0)',
    'rgb(182,0,85)',
    'rgb(182,0,170)',
    'rgb(182,0,255)',
    'rgb(182,36,0)',
    'rgb(182,36,85)',
    'rgb(182,36,170)',
    'rgb(182,36,255)',
    'rgb(182,73,0)',
    'rgb(182,73,85)',
    'rgb(182,73,170)',
    'rgb(182,73,255)',
    'rgb(182,109,0)',
    'rgb(182,109,85)',
    'rgb(182,109,170)',
    'rgb(182,109,255)',
    'rgb(182,146,0)',
    'rgb(182,146,85)',
    'rgb(182,146,170)',
    'rgb(182,146,255)',
    'rgb(182,182,0)',
    'rgb(182,182,85)',
    'rgb(182,182,170)',
    'rgb(182,182,255)',
    'rgb(182,219,0)',
    'rgb(182,219,85)',
    'rgb(182,219,170)',
    'rgb(182,219,255)',
    'rgb(182,255,0)',
    'rgb(182,255,85)',
    'rgb(182,255,170)',
    'rgb(182,255,255)',
    'rgb(219,0,0)',
    'rgb(219,0,85)',
    'rgb(219,0,170)',
    'rgb(219,0,255)',
    'rgb(219,36,0)',
    'rgb(219,36,85)',
    'rgb(219,36,170)',
    'rgb(219,36,255)',
    'rgb(219,73,0)',
    'rgb(219,73,85)',
    'rgb(219,73,170)',
    'rgb(219,73,255)',
    'rgb(219,109,0)',
    'rgb(219,109,85)',
    'rgb(219,109,170)',
    'rgb(219,109,255)',
    'rgb(219,146,0)',
    'rgb(219,146,85)',
    'rgb(219,146,170)',
    'rgb(219,146,255)',
    'rgb(219,182,0)',
    'rgb(219,182,85)',
    'rgb(219,182,170)',
    'rgb(219,182,255)',
    'rgb(219,219,0)',
    'rgb(219,219,85)',
    'rgb(219,219,170)',
    'rgb(219,219,255)',
    'rgb(219,255,0)',
    'rgb(219,255,85)',
    'rgb(219,255,170)',
    'rgb(219,255,255)',
    'rgb(255,0,0)',
    'rgb(255,0,85)',
    'rgb(255,0,170)',
    'rgb(255,0,255)',
    'rgb(255,36,0)',
    'rgb(255,36,85)',
    'rgb(255,36,170)',
    'rgb(255,36,255)',
    'rgb(255,73,0)',
    'rgb(255,73,85)',
    'rgb(255,73,170)',
    'rgb(255,73,255)',
    'rgb(255,109,0)',
    'rgb(255,109,85)',
    'rgb(255,109,170)',
    'rgb(255,109,255)',
    'rgb(255,146,0)',
    'rgb(255,146,85)',
    'rgb(255,146,170)',
    'rgb(255,146,255)',
    'rgb(255,182,0)',
    'rgb(255,182,85)',
    'rgb(255,182,170)',
    'rgb(255,182,255)',
    'rgb(255,219,0)',
    'rgb(255,219,85)',
    'rgb(255,219,170)',
    'rgb(255,219,255)',
    'rgb(255,255,0)',
    'rgb(255,255,85)',
    'rgb(255,255,170)',
    'rgb(255,255,255)',
  ]
*/
// Google Closure Compiler: 327 bytes uncompressed

// Each color generated from 1 byte
const BITS_PER_COLOR = 8
// Bits to RGB channel map
const CHANNEL_MAP = [
  [0, 3], // R: 3 bits
  [3, 6], // G: 3 bits
  [6, 8], // B: 2 bits
]

// Get n equally distributed integers ranging [0-255], where n >= 2
const generateSteps = n => {
  const stepSize = 255 / (n - 1)
  const steps = []
  for (let i = 0; i < n; i++) {
    steps.push(Math.round(i * stepSize))
  }
  return steps
}
const CHANNEL_STEPS = {
  2: generateSteps(4), // 2 bits: 2^2 = 4 steps of resolution
  3: generateSteps(8), // 3 bits: 2^3 = 8 steps of resolution
}

// Returns value for provided channel in provided bits
const getChannelValue = (bits, channel) => {
  const slice = bits.slice(channel[0], channel[1])
  return CHANNEL_STEPS[slice.length][parseInt(slice, 2)]
}

// Generate and export list of RGB strings
const RGB_256 = []
for (let i = 0; i < Math.pow(2, BITS_PER_COLOR); i++) {
  const bits = i.toString(2).padStart(BITS_PER_COLOR, '0')
  RGB_256.push(
    'rgb(' +
      getChannelValue(bits, CHANNEL_MAP[0]) +
      ',' +
      getChannelValue(bits, CHANNEL_MAP[1]) +
      ',' +
      getChannelValue(bits, CHANNEL_MAP[2]) +
      ')'
  )
}
export { RGB_256 }