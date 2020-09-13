import shellViewFactory from '../display/views/shell'
import rngFactory from '../rng'
import { generateGridTree } from '../world'

/**
 * TODO
 *
 * @param {*} screen TODO
 * @param {*} seed TODO
 * @param {*} updateState TODO
 * @returns {*} TODO
 */
function worldGenerationModeFactory(screen, seed, updateState) {
  const rng = rngFactory(seed)

  // World constants
  const PLANET_TREE_N = 12
  const NODE_WIDTH = 32
  const NODE_HEIGHT = 18
  const FAUNA_N = 12
  const EMPTY_SHAPE = [0, 0, 0] // shape, color, bgColor
  const MOUNTAIN_SHAPE = [77, 77, 187]
  const WATER_SHAPE = [87, 2, 74]
  const DEFAULT_HUNGER = 50

  // Planet
  const planetTree = generateGridTree(PLANET_TREE_N, rng)
  const planetGrid = Array.from(Array(PLANET_TREE_N * 2), () => [])
  const planetGridEdges = Array.from(Array(PLANET_TREE_N), () => [])
  planetGrid[PLANET_TREE_N][PLANET_TREE_N] = 0
  const planetNodeLocations = [[PLANET_TREE_N, PLANET_TREE_N]]
  const pending = [[0, PLANET_TREE_N, PLANET_TREE_N]]
  const done = []
  const treeToGrid = () => {
    const i = pending[0][0]
    const x = pending[0][1]
    const y = pending[0][2]
    // Iterate over current node's connected nodes
    for (let j = 0; j < planetTree[i].length; j++) {
      const connected = planetTree[i][j]
      // If connected node hasn't been processed
      if (done.indexOf(connected) < 0) {
        // Place connected node in grid adjacent to current node, random direction
        //  - Get empty directly adjacent nodes
        const openAdjacentNodes = []
        if (planetGrid[x][y - 1] == null) openAdjacentNodes.push([x, y - 1]) // N
        if (planetGrid[x + 1][y] == null) openAdjacentNodes.push([x + 1, y]) // E
        if (planetGrid[x][y + 1] == null) openAdjacentNodes.push([x, y + 1]) // S
        if (planetGrid[x - 1][y] == null) openAdjacentNodes.push([x - 1, y]) // W
        //  - If no directly adjacent nodes are open
        let shouldMerge = 0
        if (!openAdjacentNodes.length) {
          //  - Get empty semi adjacent nodes
          if (planetGrid[x + 1][y - 1] == null)
            openAdjacentNodes.push([x + 1, y - 1]) // NE
          if (planetGrid[x + 1][y + 1] == null)
            openAdjacentNodes.push([x + 1, y + 1]) // SE
          if (planetGrid[x - 1][y + 1] == null)
            openAdjacentNodes.push([x - 1, y + 1]) // SW
          if (planetGrid[x - 1][y - 1] == null)
            openAdjacentNodes.push([x - 1, y - 1]) // NW
          if (openAdjacentNodes.length) {
            shouldMerge = 1
          }
        }
        //  - If any adjacent nodes are empty, place
        if (openAdjacentNodes.length) {
          const randomIdx = rng.getInt(openAdjacentNodes.length)
          const randomX = openAdjacentNodes[randomIdx][0]
          const randomY = openAdjacentNodes[randomIdx][1]
          planetGrid[randomX][randomY] = connected
          planetNodeLocations[connected] = [randomX, randomY]
          // Merge neighbors if semi-adjacent
          if (shouldMerge) {
            const neighbor1 = planetGrid[x][randomY]
            const neighbor2 = planetGrid[randomX][y]
            // i<x,y> <-> neighbor1<x,randomY>
            if (planetGridEdges[i].indexOf(neighbor1) < 0) {
              planetGridEdges[i].push(neighbor1)
              planetGridEdges[neighbor1].push(i)
            }
            // i<x,y> <-> neighbor2<randomX,y>
            if (planetGridEdges[i].indexOf(neighbor2) < 0) {
              planetGridEdges[i].push(neighbor2)
              planetGridEdges[neighbor2].push(i)
            }
            // i<x,y> <-> connected<randomX,randomY>
            if (planetGridEdges[i].indexOf(connected) < 0) {
              planetGridEdges[i].push(connected)
              planetGridEdges[connected].push(i)
            }
            // connected<randomX,randomY> <-> neighbor1<randomX,y>
            if (planetGridEdges[connected].indexOf(neighbor1) < 0) {
              planetGridEdges[connected].push(neighbor1)
              planetGridEdges[neighbor1].push(connected)
            }
            // connected<randomX,randomY> <-> neighbor2<x,randomY>
            if (planetGridEdges[connected].indexOf(neighbor2) < 0) {
              planetGridEdges[connected].push(neighbor2)
              planetGridEdges[neighbor2].push(connected)
            }
            // neighbor1<randomX,y> <-> neighbor2<x,randomY>
            if (planetGridEdges[neighbor1].indexOf(neighbor2) < 0) {
              planetGridEdges[neighbor1].push(neighbor2)
              planetGridEdges[neighbor2].push(neighbor1)
            }
          } else {
            planetGridEdges[i].push(connected)
            planetGridEdges[connected].push(i)
          }
          // Queue connected node to be processed
          pending.push([connected, randomX, randomY])
        }
      }
    }
    // Mark current node as done
    done.push(i)
    // Remove current node from pending queue
    pending.splice(0, 1)
    // Recurse if any nodes are pending processing
    if (pending.length) {
      treeToGrid(0)
    }
  }
  treeToGrid(0)
  // console.log('planetGrid:', planetGrid)
  // console.log('planetNodeLocations:', planetNodeLocations)
  // console.log('planetGridEdges:', planetGridEdges)

  // Terrain
  const terrain = []
  for (let i = 0; i < planetGridEdges.length; i++) {
    const currentNodeLocation = planetNodeLocations[i]
    const edges = planetGridEdges[i]
    if (edges.length) {
      // Check for edges
      let n, e, s, w, nw, ne, se, sw
      for (let j = 0; j < edges.length; j++) {
        const edge = edges[j]
        const xDelta = planetNodeLocations[edge][0] - currentNodeLocation[0]
        const yDelta = planetNodeLocations[edge][1] - currentNodeLocation[1]
        if (!xDelta && yDelta < 0) n = 1
        if (xDelta > 0 && !yDelta) e = 1
        if (!xDelta && yDelta > 0) s = 1
        if (xDelta < 0 && !yDelta) w = 1
        if (xDelta < 0 && yDelta < 0) nw = 1
        if (xDelta > 0 && yDelta < 0) ne = 1
        if (xDelta > 0 && yDelta > 0) se = 1
        if (xDelta < 0 && yDelta > 0) sw = 1
      }
      // Check for neighboring nodes
      let nNode, eNode, sNode, wNode, nwNode, neNode, seNode, swNode
      if (
        planetGrid[currentNodeLocation[0]][currentNodeLocation[1] - 1] != null
      )
        nNode = 1
      if (
        planetGrid[currentNodeLocation[0] + 1][currentNodeLocation[1]] != null
      )
        eNode = 1
      if (
        planetGrid[currentNodeLocation[0]][currentNodeLocation[1] + 1] != null
      )
        sNode = 1
      if (
        planetGrid[currentNodeLocation[0] - 1][currentNodeLocation[1]] != null
      )
        wNode = 1

      if (
        planetGrid[currentNodeLocation[0] - 1][currentNodeLocation[1] - 1] !=
        null
      )
        nwNode = 1
      if (
        planetGrid[currentNodeLocation[0] + 1][currentNodeLocation[1] - 1] !=
        null
      )
        neNode = 1
      if (
        planetGrid[currentNodeLocation[0] + 1][currentNodeLocation[1] + 1] !=
        null
      )
        seNode = 1
      if (
        planetGrid[currentNodeLocation[0] - 1][currentNodeLocation[1] + 1] !=
        null
      )
        swNode = 1
      // Pick terrain templates based on edges
      let nwTemplate
      if (nw) {
        // Open NW quadrant
        nwTemplate = [0]
      } else {
        if (n && w) {
          // Corner NW quadrant
          nwTemplate = [1, nwNode]
        } else if (n) {
          // W-closed NW quadrant
          nwTemplate = [2, wNode]
        } else if (w) {
          // N-closed NW quadrant
          nwTemplate = [3, nNode]
        } else {
          // Closed NW quadrant
          nwTemplate = [4, wNode, nwNode, nNode]
        }
      }
      let neTemplate
      if (ne) {
        // Open NE quadrant
        neTemplate = [5]
      } else {
        if (n && e) {
          // Corner NE quadrant
          neTemplate = [6, neNode]
        } else if (n) {
          // E-closed NE quadrant
          neTemplate = [7, eNode]
        } else if (e) {
          // N-closed NE quadrant
          neTemplate = [8, nNode]
        } else {
          // Closed NE quadrant
          neTemplate = [9, nNode, neNode, eNode]
        }
      }
      let seTemplate
      if (se) {
        // Open SE quadrant
        seTemplate = [10]
      } else {
        if (s && e) {
          // Corner SE quadrant
          seTemplate = [11, seNode]
        } else if (s) {
          // E-closed SE quadrant
          seTemplate = [12, eNode]
        } else if (e) {
          // S-closed SE quadrant
          seTemplate = [13, sNode]
        } else {
          // Closed SE quadrant
          seTemplate = [14, eNode, seNode, sNode]
        }
      }
      let swTemplate
      if (sw) {
        // Open SW quadrant
        swTemplate = [15]
      } else {
        if (s && w) {
          // Corner SW quadrant
          swTemplate = [16, swNode]
        } else if (s) {
          // W-closed SW quadrant
          swTemplate = [17, wNode]
        } else if (w) {
          // S-closed SW quadrant
          swTemplate = [18, sNode]
        } else {
          // Closed SW quadrant
          swTemplate = [19, sNode, swNode, wNode]
        }
      }
      terrain[i] = [nwTemplate, neTemplate, seTemplate, swTemplate]
    }
  }
  // console.log('terrain:', terrain)

  const world = []
  for (let i = 0; i < terrain.length; i++) {
    const node = terrain[i]
    if (terrain[i]) {
      const output = Array.from(Array(NODE_WIDTH), () => [])
      for (let x = 0; x < NODE_WIDTH; x++) {
        for (let y = 0; y < NODE_HEIGHT; y++) {
          output[x][y] = EMPTY_SHAPE
        }
      }
      // Create NW quadrant
      const nwTemplate = node[0]
      const nwTemplateType = nwTemplate[0]
      if (nwTemplateType === 1) {
        // Update output with NW corner
        output[0][0] = nwTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
      } else if (nwTemplateType === 2) {
        // Update output with W wall
        for (let y = 0; y < NODE_HEIGHT / 2; y++) {
          output[0][y] = nwTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
      } else if (nwTemplateType === 3) {
        // Update output with N wall
        for (let x = 0; x < NODE_WIDTH / 2; x++) {
          output[x][0] = nwTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
      } else if (nwTemplateType === 4) {
        // Update output with NW wall
        for (let x = 0; x < NODE_WIDTH / 2; x++) {
          output[x][0] = nwTemplate[3] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
        for (let y = 0; y < NODE_HEIGHT / 2; y++) {
          output[0][y] = nwTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
        if (nwTemplate[1] !== nwTemplate[3])
          output[0][0] = nwTemplate[2] ? MOUNTAIN_SHAPE : WATER_SHAPE
      }
      // Create NE template
      const neTemplate = node[1]
      const neTemplateType = neTemplate[0]
      if (neTemplateType === 6) {
        // Update output with NE corner
        output[NODE_WIDTH - 1][0] = neTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
      } else if (neTemplateType === 7) {
        // Update output with E wall
        for (let y = 0; y < NODE_HEIGHT / 2; y++) {
          output[NODE_WIDTH - 1][y] = neTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
      } else if (neTemplateType === 8) {
        // Update output with N wall
        for (let x = NODE_WIDTH / 2; x < NODE_WIDTH; x++) {
          output[x][0] = neTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
      } else if (neTemplateType === 9) {
        // Update output with NE wall
        for (let x = NODE_WIDTH / 2; x < NODE_WIDTH; x++) {
          output[x][0] = neTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
        for (let y = 0; y < NODE_HEIGHT / 2; y++) {
          output[NODE_WIDTH - 1][y] = neTemplate[3]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
        if (neTemplate[1] !== neTemplate[3])
          output[NODE_WIDTH - 1][0] = neTemplate[2]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
      }
      // Create SE quadrant
      const seTemplate = node[2]
      const seTemplateType = seTemplate[0]
      if (seTemplateType === 11) {
        // Update output with SE corner
        output[NODE_WIDTH - 1][NODE_HEIGHT - 1] = seTemplate[1]
          ? MOUNTAIN_SHAPE
          : WATER_SHAPE
      } else if (seTemplateType === 12) {
        // Update output with E wall
        for (let y = NODE_HEIGHT / 2; y < NODE_HEIGHT; y++) {
          output[NODE_WIDTH - 1][y] = seTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
      } else if (seTemplateType === 13) {
        // Update output with S wall
        for (let x = NODE_WIDTH / 2; x < NODE_WIDTH; x++) {
          output[x][NODE_HEIGHT - 1] = seTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
      } else if (seTemplateType === 14) {
        // Update output with SE wall
        for (let x = NODE_WIDTH / 2; x < NODE_WIDTH; x++) {
          output[x][NODE_HEIGHT - 1] = seTemplate[3]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
        for (let y = NODE_HEIGHT / 2; y < NODE_HEIGHT; y++) {
          output[NODE_WIDTH - 1][y] = seTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
        if (seTemplate[1] !== seTemplate[3])
          output[NODE_WIDTH - 1][NODE_HEIGHT - 1] = seTemplate[2]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
      }
      // Create SW quadrant
      const swTemplate = node[3]
      const swTemplateType = swTemplate[0]
      if (swTemplateType === 16) {
        // Update output with SW corner
        output[0][NODE_HEIGHT - 1] = swTemplate[1]
          ? MOUNTAIN_SHAPE
          : WATER_SHAPE
      } else if (swTemplateType === 17) {
        // Update output with W wall
        for (let y = NODE_HEIGHT / 2; y < NODE_HEIGHT; y++) {
          output[0][y] = swTemplate[1] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
      } else if (swTemplateType === 18) {
        // Update output with S wall
        for (let x = 0; x < NODE_WIDTH / 2; x++) {
          output[x][NODE_HEIGHT - 1] = swTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
      } else if (swTemplateType === 19) {
        // Update output with SE wall
        for (let x = 0; x < NODE_WIDTH / 2; x++) {
          output[x][NODE_WIDTH - 1] = swTemplate[1]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
        }
        for (let y = NODE_HEIGHT / 2; y < NODE_HEIGHT; y++) {
          output[0][y] = swTemplate[3] ? MOUNTAIN_SHAPE : WATER_SHAPE
        }
        if (swTemplate[1] !== swTemplate[3])
          output[0][NODE_HEIGHT - 1] = swTemplate[2]
            ? MOUNTAIN_SHAPE
            : WATER_SHAPE
      }
      world[i] = output
    }
  }
  // console.log('world:', world)

  // Flora
  const flora = Array.from(Array(PLANET_TREE_N), () =>
    Array.from(Array(NODE_WIDTH), () => [])
  )
  for (let i = 0; i < world.length; i++) {
    const node = world[i]
    if (node) {
      for (let x = 0; x < node.length; x++) {
        for (let y = 0; y < node[x].length; y++) {
          if (node[x][y] === EMPTY_SHAPE) {
            let randFlora = rng.getInt(10)
            if (randFlora > 8) {
              randFlora = 1
            } else {
              randFlora = 0
            }
            flora[i][x][y] = randFlora
          }
        }
      }
    }
  }
  // console.log('flora:', flora)

  // Fauna
  const fauna = Array.from(Array(PLANET_TREE_N), () =>
    Array.from(Array(NODE_WIDTH), () => [])
  )
  const faunaList = []
  for (let i = 0; i < FAUNA_N; i++) {
    const nodeId = rng.getInt(PLANET_TREE_N)
    if (planetNodeLocations[nodeId] != null) {
      const x = rng.getInt(NODE_WIDTH)
      const y = rng.getInt(NODE_HEIGHT)
      if (world[nodeId][x][y] === EMPTY_SHAPE) {
        fauna[nodeId][x][y] = [i, 64, 69]
        faunaList[i] = [nodeId, x, y, DEFAULT_HUNGER]
      }
    }
  }
  // console.log('fauna:', fauna)

  const mainOrganismId = FAUNA_N
  const makeMainOrganism = () => {
    const x = rng.getInt(NODE_WIDTH)
    const y = rng.getInt(NODE_HEIGHT)
    if (world[0][x][y] === EMPTY_SHAPE) {
      fauna[0][x][y] = [FAUNA_N, 35, 64]
      faunaList[FAUNA_N] = [0, x, y, DEFAULT_HUNGER]
    } else {
      makeMainOrganism()
    }
  }
  makeMainOrganism()
  // console.log('faunaList:', faunaList)

  const shellView = shellViewFactory(screen, [
    ['Creating world ' + seed, +'...'],
    [
      '\nCreating water...\nCreating land...\nCreating flora...\nCreating fauna...\n\nReady!\n\nPress enter to start ',
    ],
  ])

  return {
    draw: shellView.draw,
    handleInput: input => {
      switch (input) {
        case 13:
          // enter
          if (shellView.isReady()) {
            updateState(
              planetGrid,
              planetNodeLocations,
              world,
              flora,
              fauna,
              mainOrganismId,
              faunaList
            )
          }
          break
      }
    },
  }
}

export default worldGenerationModeFactory
