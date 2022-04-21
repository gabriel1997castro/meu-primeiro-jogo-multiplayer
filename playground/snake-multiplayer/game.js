export function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    }
  }

  function addPlayer(command) {
    const { playerId, playerX, playerY } = command

    state.players[playerId] = {
      x: playerX,
      y: playerY
    }
  }

  function removePlayer(command) {
    const { playerId } = command
    delete state.players[playerId]
  }

  function addFruit(command) {
    const { fruitId, fruitX, fruitY } = command

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    }
  }

  function removeFruit(command) {
    const { fruitId } = command
    delete state.fruits[fruitId]
  }

  function movePlayer(command) {

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y = player.y - 1
          return
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < screen.width) {
          player.x = player.x + 1
          return
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < screen.height) {
          player.y = player.y + 1
          return
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x = player.x - 1
          return
        }
      },
    }

    const { keyPressed, playerId } = command
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(playerId)
    }

  }

  function checkForFruitCollision(playerId) {

    const player = state.players[playerId]

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]
      console.log(`Checking ${playerId} ad ${fruitId}`)

      if (player.x === fruit.x && player.y === fruit.y) {
        console.log(`COLLISION between ${playerId} and ${fruitId}`)
        removeFruit({ fruitId })
      }
    }
  }


  return {
    addFruit,
    removeFruit,
    addPlayer,
    removePlayer,
    movePlayer,
    state
  }
}