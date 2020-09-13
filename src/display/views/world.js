const FLORA_COLORS = [218, 112] //[217, 108, 112, 84, 12, 8]
function worldViewFactory(screen) {
  function draw(data, nodeId) {
    const world = data[2]
    const flora = data[3]
    const fauna = data[4]
    const frameData = Array.from(Array(32), (res, x) => {
      res = []
      for (let y = 0; y < 18; y++) {
        let shape, color, bgColor
        const tile = world[nodeId][x][y]
        shape = tile[0]
        color = tile[1]
        bgColor = tile[2]
        const tileFlora = flora[nodeId][x][y]
        if (tileFlora != null) {
          bgColor = FLORA_COLORS[tileFlora]
        }
        const tileFauna = fauna[nodeId][x][y]
        if (tileFauna != null) {
          shape = tileFauna[1]
          color = tileFauna[2]
        }
        res.push([shape, color, bgColor])
      }
      return res
    })
    screen.drawFrame(frameData)
  }

  return {
    draw,
  }
}

export default worldViewFactory
