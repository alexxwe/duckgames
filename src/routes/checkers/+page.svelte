<script lang="ts">
    import Box from '$lib/components/Box.svelte'

    /**
     * 0: empty
     * 1: Blue
     * 2: Red
     * 3: KingBlue
     * 4: KingRed
     * 5: GhostMove
     */

    let player1: string = 'Blue'
    let player2: string = 'Red'

    let highlighted: (number | null)[] = [null, null]

    let gameTurn1: boolean = true

    let alert = {
        error: '',
        win: '',
    }

    const generateBoard = () => [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 0, 0, 2, 0, 2],
        [0, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ]

    let board = generateBoard()

    /**
     * 1- This function need to change the color of the cell selected
     * 2- Highlight the respective cell to allow the possible moves
     */
    function handleOnClick(rowIdx: number, colIdx: number) {
        const selectedPiece = board[rowIdx]![colIdx]!

        const is_player1 = gameTurn1 && [1, 3].includes(selectedPiece)
        const is_player2 = !gameTurn1 && [2, 4].includes(selectedPiece)

        if (!is_player1 && !is_player2) {
            alert.error = 'Select your Piece'
            return
        }

        if (highlighted[0]) {
            // Has hecho click en una pieza (en vez de en un ghost move)
            highlighted = [rowIdx, colIdx]
            cleanGhostMoves()
            generateGhostMoves(rowIdx, colIdx)

            // Has hecho click en un ghost move
            if (selectedPiece === 5) {
                // move(highlighted, pieza)
                highlighted = [null, null]
                gameTurn1 = !gameTurn1
            }
        } else {
            if ([1, 2, 3, 4].includes(selectedPiece)) {
                highlighted = [rowIdx, colIdx]
                cleanGhostMoves()
                generateGhostMoves(rowIdx, colIdx)
            }
        }
    }

    const cleanGhostMoves = () =>
        board.forEach((row, rowIdx) =>
            row.forEach((col, colIdx) => {
                if (col === 5) {
                    board[rowIdx]![colIdx]! = 0
                }
            }),
        )

    function generateGhostMoves(rowIdx: number, colIdx: number) {
        if (board[rowIdx - 1]![colIdx + 1]! === 0) {
            board[rowIdx - 1]![colIdx + 1]! = 5
            alert.error = ''
        }

        if (board[rowIdx - 1]![colIdx - 1]! === 0) {
            board[rowIdx - 1]![colIdx - 1]! = 5
            alert.error = ''
        }

        if (board[rowIdx - 1]![colIdx + 1]! === 2 && board[rowIdx - 2]![colIdx + 2]! === 0) {
            board[rowIdx - 2]![colIdx + 2]! = 5
        }

        if (board[rowIdx - 1]![colIdx - 1]! === 2 && board[rowIdx - 2]![colIdx - 2]! === 0) {
            board[rowIdx - 2]![colIdx - 2]! = 5
        }
    }

    function moves(rowIdx: number, colIdx: number) {
        if (alert.win) {
            return
        }

        const selectedPiece = board[rowIdx]![colIdx]

        if ((gameTurn1 && selectedPiece === 1) || (!gameTurn1 && selectedPiece === 2)) {
            const yBasedOnTurn = gameTurn1 ? -1 : 1

            const target = rowIdx + yBasedOnTurn

            if (target >= 0 && target < 8 && board[target]![colIdx] === 0) {
                board[target]![colIdx] = selectedPiece
                board[rowIdx]![colIdx] = 0

                gameTurn1 = !gameTurn1

                return
            }
            alert.error = 'Target cell is not empty.'
        } else {
            alert.error = 'Select your Piece'

            // if (winner()) {
            //     alert.win = `${gameTurn1 ? player1 : player2} wins!`
            // } else {
            //     gameTurn1 = !gameTurn1
            // }
        }
    }

    function winner() {}

    const isHighlighted = (rowIdx: number, colIdx: number, highlighted: (number | null)[]) =>
        highlighted[0] === rowIdx && highlighted[1] === colIdx ? 'bg-green-800' : ''

    function resetGame() {
        alert.error = ''
        alert.win = ''
        gameTurn1 = true
        board = generateBoard()
    }
</script>

<div class="ml-4">
    <div class="flex">
        <Box title="Checkers">Classic board game, checkers (better and easier than chess).</Box>
    </div>
    <h1 class="text-center text-3xl font-semibold {gameTurn1 ? 'text-blue-400' : 'text-red-400'}">{gameTurn1 ? player1 : player2}</h1>
    <div
        class="border-l-4 {alert.error ? 'border-red-600 bg-red-400/30' : 'border-green-600 bg-green-400/30'} 
            p-4 w-96 mx-auto my-2 {alert.error || alert.win ? '' : 'invisible'}"
    >
        <h2><i class="bi bi-exclamation-triangle-fill"></i> {alert.error ? alert.error : alert.win}</h2>
    </div>
    <div class="flex flex-wrap mx-auto w-[34rem] gap-1">
        {#each board as row, rowIdx}
            {#each row as col, colIdx}
                {#if (colIdx + rowIdx) % 2 === 0}
                    <div class="bg-white w-16 h-16"></div>
                {:else}
                    <button
                        on:click={() => handleOnClick(rowIdx, colIdx)}
                        class="p-4 h-16 w-16 bg-green-600 text-2xl {isHighlighted(rowIdx, colIdx, highlighted)}"
                    >
                        {#if col === 1}
                            <p class="">🔵</p>
                            <!-- <p class="animate__animated animate__backInUp animate__fast">🔵</p> -->
                        {:else if col === 2}
                            <p class="">🔴</p>
                            <!-- <p class="animate__animated animate__backInDown animate__fast">🔴</p> -->
                        {:else if col === 5}
                            <i class="bi bi-dot"></i>
                        {/if}
                    </button>
                {/if}
            {/each}
        {/each}
    </div>
</div>

<button on:click={resetGame} class="rounded rounded-t-full font-semibold bg-red-600 hover:bg-red-800 py-2 px-4 ml-4 my-4">
    Reset Game</button
>
