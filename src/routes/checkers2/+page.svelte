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
    type Piece = 0 | 1 | 2 | 3 | 4 | 5
    type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

    function validatePiece(piece: number): piece is Piece {
        return piece >= 0 && piece <= 5
    }
    function validateKey(key: number): key is Key {
        return key >= 0 && key <= 7
    }

    // ---------------------------------------

    let highlighted: Key[] | null = null

    let gameTurn1: boolean = true

    let alert = {
        error: '',
        win: '',
    }

    const row1: Record<Key, Piece> = {
        0: 0,
        1: 2,
        2: 0,
        3: 2,
        4: 0,
        5: 2,
        6: 0,
        7: 2,
    }

    const row2: Record<Key, Piece> = {
        0: 1,
        1: 0,
        2: 1,
        3: 0,
        4: 1,
        5: 0,
        6: 1,
        7: 0,
    }

    const empty: Record<Key, Piece> = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
    }

    const board: Record<Key, Record<Key, Piece>> = {
        0: row1,
        1: empty,
        2: empty,
        3: empty,
        4: empty,
        5: empty,
        6: empty,
        7: row2,
    }

    /**
     * 1- This function need to change the color of the cell selected
     * 2- Highlight the respective cell to allow the possible moves
     */
    function handleOnClick(rowIdx: number, colIdx: number) {
        alert.error = ''

        // We are sure this is correct (as)
        const rowKey = rowIdx as Key
        const colKey = colIdx as Key
        const selectedPiece = board[rowKey][colKey]

        // 1. If player 1 clicked a player 2 piece OR viceversa
        const is_player1 = gameTurn1 && [1, 3, 5].includes(selectedPiece)
        const is_player2 = !gameTurn1 && [2, 4, 5].includes(selectedPiece)

        if (!is_player1 && !is_player2) {
            alert.error = 'Select your Piece'
            return
        }

        // 2. You clicked a piece
        if ([1, 2, 3, 4].includes(selectedPiece)) {
            highlighted = [rowKey, colKey]
            cleanGhostMoves()
            generateGhostMovesFor(rowKey, colKey)
        }

        // 3. You clicked a possible ghost move
        if (selectedPiece === 5) {
            // moves(rowIdx, colIdx)
            // highlighted = [null, null]
            // gameTurn1 = !gameTurn1
        }
    }

    // Delete all 5's in the board
    const cleanGhostMoves = (): void => {
        for (const [rowIdx, row] of Object.entries(board)) {
            for (const [colIdx, col] of Object.entries(row)) {
                if (col === 5) {
                    board[Number(rowIdx) as Key][Number(colIdx) as Key] = 0
                }
            }
        }
    }

    /**
     * This function will generate the possible moves for the selected piece
     */
    function generateGhostMovesFor(rowKey: Key, colKey: Key) {
        const checkTopRight = () => {
            const top_right_row = rowKey - 1
            const top_right_col = colKey + 1

            if (!validateKey(top_right_row) || !validateKey(top_right_col)) {
                console.log('[TOP RIGHT]: Out of index')
            }

            const top_right_cell = board[top_right_row as Key][top_right_col as Key]

            // is empty
            if (top_right_cell === 0) {
                board[top_right_row as Key][top_right_col as Key] = 5
            }

            // is eatable
            if (gameTurn1) {
                // function recursiva para comprobar diagonal en n longitud y n lejania de la pieza origen
            } else {
                // same shit
            }
        }
        const checkTopLeft = () => {
// TOP LEFT
                // if (board[rowKey - 1]![colKey - 1]! === 0) {
                //     board[rowKey - 1]![colKey - 1]! = 5
                // } else if ([2, 4].includes(board[rowKey - 1]![colKey - 1]!) && board[rowKey - 2]![colKey - 2]! === 0) {
                //     board[rowKey - 2]![colKey - 2]! = 5
                // }
        }
        const checkBottomRight = () => {

        }
        const checkBottomLeft = () => {

        }

        // ----------------------------------------
        const is_a_king = [3, 4].includes(board[rowKey][colKey])
        if (is_a_king) {
            // King can move in all directions
            checkTopRight()
            checkTopLeft()
            checkBottomRight()
            checkBottomLeft()
        } else {
            if (gameTurn1) {
                // Blue moving (only up)
                if (colKey === 0) {
                    checkTopRight()
                } else if (colKey === 7) {
                    checkTopLeft()
                } else {
                    checkTopRight()
                    checkTopLeft()
                }
            } else {
                // Red moving (only down)
                // BOTTOM RIGHT
                // BOTTOM LEFT
            }
        }

    }

    // function moves(rowIdx: number, colIdx: number) {
    //     if (alert.win) {
    //         return
    //     }
    //     console.log('moving', highlighted, 'to', rowIdx, colIdx)

    //     // This should never happen
    //     if (highlighted[0] === null || highlighted[1] === null) {
    //         alert.error = 'An error happened.'
    //         return
    //     }

    //     const origin = highlighted as [number, number]
    //     const destiny = [rowIdx, colIdx] as [number, number]
    //     const selectedPiece = board[origin[0]]![origin[1]]!

    //     board[rowIdx]![colIdx] = selectedPiece

    //     if ((selectedPiece === 1 && rowIdx === 0) || (selectedPiece === 2 && rowIdx === 7)) {
    //         board[rowIdx]![colIdx] += 2
    //     }

    //     board[highlighted[0]!]![highlighted[1]!] = 0
    //     highlighted = [null, null]
    //     cleanGhostMoves()

    //     if (Math.abs(rowIdx - origin[0]) === 2 && Math.abs(colIdx - origin[1]) === 2) {
    //         const capturedRow = (rowIdx + origin[0]) / 2
    //         const capturedCol = (colIdx + origin[1]) / 2
    //         board[capturedRow]![capturedCol] = 0
    //     }
    // }

    // function winner() {}

    function isHighlighted(rowIdx: number, colIdx: number, highlighted: number[] | null): string {
        if (highlighted === null) {
            return 'bg-green-600'
        }
    
        const row_correct = highlighted[0] === rowIdx
        const col_correct = highlighted[1] === colIdx
    
        return row_correct && col_correct ? 'bg-green-800' : 'bg-green-600'
    }

    function resetGame() {
        alert.error = ''
        alert.win = ''
        gameTurn1 = true
        // board = generateBoard()
    }
</script>

<div class="ml-4">
    <div class="flex">
        <Box title="Checkers">Classic board game, checkers (better and easier than chess).</Box>
    </div>
    <h1 class="text-center text-3xl font-semibold {gameTurn1 ? 'text-blue-400' : 'text-red-400'}">{gameTurn1 ? 'Blue' : 'Red'}</h1>
    <div
        class="border-l-4 {alert.error ? 'border-red-600 bg-red-400/30' : 'border-green-600 bg-green-400/30'} 
            p-4 w-96 mx-auto my-2 {alert.error || alert.win ? '' : 'invisible'}"
    >
        <h2><i class="bi bi-exclamation-triangle-fill"></i> {alert.error ? alert.error : alert.win}</h2>
    </div>
    <div class="flex flex-wrap mx-auto w-[34rem] gap-1">
        {#each Object.entries(board) as [rowKey, row], rowIdx}
            {#each Object.entries(row) as [colKey, col], colIdx}
                {#if (colIdx + rowIdx) % 2 === 0}
                    <div class="bg-white w-16 h-16"></div>
                {:else}
                    <button
                        on:click={() => handleOnClick(rowIdx, colIdx)}
                        class="p-4 h-16 w-16 text-2xl {isHighlighted(rowIdx, colIdx, highlighted)}"
                    >
                        {#if col === 1}
                            <p class="">🔵</p>
                            <!-- <p class="animate__animated animate__backInUp animate__fast">🔵</p> -->
                        {:else if col === 2}
                            <p class="">🔴</p>
                            <!-- <p class="animate__animated animate__backInDown animate__fast">🔴</p> -->
                        {:else if col === 5}
                            <i class="bi bi-dot"></i>
                        {:else if col === 3}
                            <p class="">🥶</p>
                        {:else if col === 4}
                            <p class="">😡</p>
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
