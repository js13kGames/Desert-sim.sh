import worldViewFactory from '../display/views/world'
import rngFactory from '../rng'

function mainViewModeFactory(
  screen,
  getWorldState,
  seed,
  updateFauna,
  updateFlora,
  incrementHunger,
  handleFaunaDeath
) {
  const initialState = getWorldState()
  const rng = rngFactory(seed)
  // [
  //   _worldGrid,
  //   _worldNodes,
  //   _world,
  //   _worldFlora,
  //   _worldFauna,
  //   _worldMainOrganismId,
  //   _worldFaunaList,
  // ]
  const worldView = worldViewFactory(screen, initialState)

  let currentNodeId = 0
  let currentNodeX = 12
  let currentNodeY = 12
  let mainOrganismX = initialState[6][initialState[5]][1]
  let mainOrganismY = initialState[6][initialState[5]][2]

  function draw() {
    worldView.draw(getWorldState(), currentNodeId)
  }

  function handleInput(input) {
    const currentState = getWorldState()
    const currentGrid = currentState[0]
    const currentWorld = currentState[2]
    const currentFlora = currentState[3]
    const currentFauna = currentState[4]
    const currentMainOrganismId = currentState[5]
    const currentFaunaList = currentState[6]
    let nextX, nextY
    if (currentFaunaList[currentMainOrganismId] != null) {
      switch (input) {
        case 37:
          nextX = mainOrganismX - 1
          nextY = mainOrganismY
          if (nextX >= 0) {
            if (
              currentWorld[currentNodeId][nextX][nextY][0] === 0 &&
              currentFauna[currentNodeId][nextX][nextY] == null
            ) {
              updateFauna(
                currentMainOrganismId,
                currentNodeId,
                mainOrganismX,
                mainOrganismY,
                currentNodeId,
                nextX,
                nextY
              )
              mainOrganismX--
            }
          } else {
            const nextNodeX = currentNodeX - 1
            const nextNodeY = currentNodeY
            const nextNode = currentGrid[nextNodeX][nextNodeY]
            if (nextNode != null) {
              nextX = 31
              if (currentFauna[nextNode][nextX][nextY] == null) {
                updateFauna(
                  currentMainOrganismId,
                  currentNodeId,
                  mainOrganismX,
                  mainOrganismY,
                  nextNode,
                  nextX,
                  nextY
                )
                currentNodeX = nextNodeX
                currentNodeY = nextNodeY
                mainOrganismX = nextX
                currentNodeId = nextNode
              }
            }
          }
          break
        case 38:
          nextX = mainOrganismX
          nextY = mainOrganismY - 1
          if (nextY >= 0) {
            if (
              currentWorld[currentNodeId][nextX][nextY][0] === 0 &&
              currentFauna[currentNodeId][nextX][nextY] == null
            ) {
              updateFauna(
                currentMainOrganismId,
                currentNodeId,
                mainOrganismX,
                mainOrganismY,
                currentNodeId,
                nextX,
                nextY
              )
              mainOrganismY--
            }
          } else {
            const nextNodeX = currentNodeX
            const nextNodeY = currentNodeY - 1
            const nextNode = currentGrid[nextNodeX][nextNodeY]
            if (nextNode != null) {
              nextY = 17
              if (currentFauna[nextNode][nextX][nextY] == null) {
                updateFauna(
                  currentMainOrganismId,
                  currentNodeId,
                  mainOrganismX,
                  mainOrganismY,
                  nextNode,
                  nextX,
                  nextY
                )
                currentNodeX = nextNodeX
                currentNodeY = nextNodeY
                mainOrganismY = nextY
                currentNodeId = nextNode
              }
            }
          }
          break
        case 39:
          nextX = mainOrganismX + 1
          nextY = mainOrganismY
          if (nextX < 32) {
            if (
              currentWorld[currentNodeId][nextX][nextY][0] === 0 &&
              currentFauna[currentNodeId][nextX][nextY] == null
            ) {
              updateFauna(
                currentMainOrganismId,
                currentNodeId,
                mainOrganismX,
                mainOrganismY,
                currentNodeId,
                nextX,
                nextY
              )
              mainOrganismX++
            }
          } else {
            const nextNodeX = currentNodeX + 1
            const nextNodeY = currentNodeY
            const nextNode = currentGrid[nextNodeX][nextNodeY]
            if (nextNode != null) {
              nextX = 0
              if (currentFauna[nextNode][nextX][nextY] == null) {
                updateFauna(
                  currentMainOrganismId,
                  currentNodeId,
                  mainOrganismX,
                  mainOrganismY,
                  nextNode,
                  nextX,
                  nextY
                )
                currentNodeX = nextNodeX
                currentNodeY = nextNodeY
                mainOrganismX = nextX
                currentNodeId = nextNode
              }
            }
          }
          break
        case 40:
          nextX = mainOrganismX
          nextY = mainOrganismY + 1
          if (nextY < 18) {
            if (
              currentWorld[currentNodeId][nextX][nextY][0] === 0 &&
              currentFauna[currentNodeId][nextX][nextY] == null
            ) {
              updateFauna(
                currentMainOrganismId,
                currentNodeId,
                mainOrganismX,
                mainOrganismY,
                currentNodeId,
                nextX,
                nextY
              )
              mainOrganismY++
            }
          } else {
            const nextNodeX = currentNodeX
            const nextNodeY = currentNodeY + 1
            const nextNode = currentGrid[nextNodeX][nextNodeY]
            if (nextNode != null) {
              nextY = 0
              if (currentFauna[nextNode][nextX][nextY] == null) {
                updateFauna(
                  currentMainOrganismId,
                  currentNodeId,
                  mainOrganismX,
                  mainOrganismY,
                  nextNode,
                  nextX,
                  nextY
                )
                currentNodeX = nextNodeX
                currentNodeY = nextNodeY
                mainOrganismY = nextY
                currentNodeId = nextNode
              }
            }
          }
          break
      }
    }
    if (currentFlora[currentNodeId][mainOrganismX][mainOrganismY]) {
      updateFlora(
        currentNodeId,
        mainOrganismX,
        mainOrganismY,
        currentMainOrganismId
      )
    }
  }

  function update(gameStep) {
    if (!(gameStep % 30)) {
      const currentState = getWorldState()
      const currentGrid = currentState[0]
      const currentNodes = currentState[1]
      const currentWorld = currentState[2]
      const currentFlora = currentState[3]
      const currentFauna = currentState[4]
      const currentMainOrganismId = currentState[5]
      const currentFaunaList = currentState[6]
      for (let i = 0; i < currentFaunaList.length; i++) {
        if (currentFaunaList[i] != null) {
          // Increase hunger
          const hunger = incrementHunger(i)
          if (hunger >= 100) {
            // Die
            handleFaunaDeath(i)
          } else if (i !== currentMainOrganismId) {
            const thisFauna = currentFaunaList[i]
            const thisFaunaNode = thisFauna[0]
            const thisFaunaX = thisFauna[1]
            const thisFaunaY = thisFauna[2]
            // Simulate fauna
            // - Movement
            let thisFaunaNextNode = thisFaunaNode
            let thisFaunaNextX = thisFaunaX
            let thisFaunaNextY = thisFaunaY
            const randomDirection = rng.getInt(5)
            if (randomDirection === 0) {
              // N
              thisFaunaNextX = thisFaunaX
              thisFaunaNextY = thisFaunaY - 1
              if (thisFaunaNextY >= 0) {
                if (
                  currentWorld[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ][0] === 0 &&
                  currentFauna[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ] == null
                ) {
                  updateFauna(
                    i,
                    thisFaunaNode,
                    thisFaunaX,
                    thisFaunaY,
                    thisFaunaNextNode,
                    thisFaunaNextX,
                    thisFaunaNextY
                  )
                }
              } else {
                const thisFaunaNextNodeX = currentNodes[thisFaunaNode][0]
                const thisFaunaNextNodeY = currentNodes[thisFaunaNode][1] - 1
                thisFaunaNextNode =
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY]
                if (
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY] != null
                ) {
                  thisFaunaNextY = 17
                  if (
                    currentFauna[thisFaunaNextNode][thisFaunaNextX][
                      thisFaunaNextY
                    ] == null
                  ) {
                    updateFauna(
                      i,
                      thisFaunaNode,
                      thisFaunaX,
                      thisFaunaY,
                      thisFaunaNextNode,
                      thisFaunaNextX,
                      thisFaunaNextY
                    )
                  }
                }
              }
            } else if (randomDirection === 1) {
              // E
              thisFaunaNextX = thisFaunaX + 1
              thisFaunaNextY = thisFaunaY
              if (thisFaunaNextX < 32) {
                if (
                  currentWorld[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ][0] === 0 &&
                  currentFauna[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ] == null
                ) {
                  updateFauna(
                    i,
                    thisFaunaNode,
                    thisFaunaX,
                    thisFaunaY,
                    thisFaunaNextNode,
                    thisFaunaNextX,
                    thisFaunaNextY
                  )
                }
              } else {
                const thisFaunaNextNodeX = currentNodes[thisFaunaNode][0] + 1
                const thisFaunaNextNodeY = currentNodes[thisFaunaNode][1]
                thisFaunaNextNode =
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY]
                if (
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY] != null
                ) {
                  thisFaunaNextX = 0
                  if (
                    currentFauna[thisFaunaNextNode][thisFaunaNextX][
                      thisFaunaNextY
                    ] == null
                  ) {
                    updateFauna(
                      i,
                      thisFaunaNode,
                      thisFaunaX,
                      thisFaunaY,
                      thisFaunaNextNode,
                      thisFaunaNextX,
                      thisFaunaNextY
                    )
                  }
                }
              }
            } else if (randomDirection === 2) {
              // S
              thisFaunaNextX = thisFaunaX
              thisFaunaNextY = thisFaunaY + 1
              if (thisFaunaNextY < 18) {
                if (
                  currentWorld[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ][0] === 0 &&
                  currentFauna[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ] == null
                ) {
                  updateFauna(
                    i,
                    thisFaunaNode,
                    thisFaunaX,
                    thisFaunaY,
                    thisFaunaNextNode,
                    thisFaunaNextX,
                    thisFaunaNextY
                  )
                }
              } else {
                const thisFaunaNextNodeX = currentNodes[thisFaunaNode][0]
                const thisFaunaNextNodeY = currentNodes[thisFaunaNode][1] + 1
                thisFaunaNextNode =
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY]
                if (
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY] != null
                ) {
                  thisFaunaNextY = 0
                  if (
                    currentFauna[thisFaunaNextNode][thisFaunaNextX][
                      thisFaunaNextY
                    ] == null
                  ) {
                    updateFauna(
                      i,
                      thisFaunaNode,
                      thisFaunaX,
                      thisFaunaY,
                      thisFaunaNextNode,
                      thisFaunaNextX,
                      thisFaunaNextY
                    )
                  }
                }
              }
            } else if (randomDirection === 3) {
              // W
              thisFaunaNextX = thisFaunaX - 1
              thisFaunaNextY = thisFaunaY
              if (thisFaunaNextX >= 0) {
                if (
                  currentWorld[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ][0] === 0 &&
                  currentFauna[thisFaunaNextNode][thisFaunaNextX][
                    thisFaunaNextY
                  ] == null
                ) {
                  updateFauna(
                    i,
                    thisFaunaNode,
                    thisFaunaX,
                    thisFaunaY,
                    thisFaunaNextNode,
                    thisFaunaNextX,
                    thisFaunaNextY
                  )
                }
              } else {
                const thisFaunaNextNodeX = currentNodes[thisFaunaNode][0] - 1
                const thisFaunaNextNodeY = currentNodes[thisFaunaNode][1]
                thisFaunaNextNode =
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY]
                if (
                  currentGrid[thisFaunaNextNodeX][thisFaunaNextNodeY] != null
                ) {
                  thisFaunaNextX = 31
                  if (
                    currentFauna[thisFaunaNextNode][thisFaunaNextX][
                      thisFaunaNextY
                    ] == null
                  ) {
                    updateFauna(
                      i,
                      thisFaunaNode,
                      thisFaunaX,
                      thisFaunaY,
                      thisFaunaNextNode,
                      thisFaunaNextX,
                      thisFaunaNextY
                    )
                  }
                }
              }
            }
            // - Eat
            if (
              currentFlora[thisFaunaNextNode][thisFaunaNextX][thisFaunaNextY]
            ) {
              updateFlora(thisFaunaNextNode, thisFaunaNextX, thisFaunaNextY, i)
            }
          }
        }
      }
    }
  }

  return {
    draw,
    handleInput,
    update,
  }
}

export default mainViewModeFactory
