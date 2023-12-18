<script lang="ts">
    // 🔴🔵

    import Box from '$lib/components/Box.svelte'
    // Player Names
    let player1: string = 'Alex'
    let player2: string = 'EvilAlex'

    //Turns
    let gameTurn1: boolean = true

    let alert = {
        error: '',
        win: '',
    }

    // Board
    const board: Array<Array<number>> = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]

    // Winner function
    function winner2() {
        for (const [row_idx_str, row] of Object.entries(board)) {
            const row_idx = Number(row_idx_str)

            for (const [cell_idx_str, cell] of Object.entries(row)) {
                const cell_idx = Number(cell_idx_str)

                /**
                 * CHECK ROWS
                 */
                if (cell !== 0 && cell === row[cell_idx + 1] && cell === row[cell_idx + 2] && cell === row[cell_idx + 3]) {
                    return true
                }

                /**
                 * CHECK COLUMNS
                 */
                // If index goes out of board
                if (board[row_idx + 1] && board[row_idx + 2] && board[row_idx + 3]) {
                    if (
                        cell !== 0 &&
                        cell === board[row_idx + 1]![cell_idx] &&
                        cell === board[row_idx + 2]![cell_idx] &&
                        cell === board[row_idx + 3]![cell_idx]
                    ) {
                        return true
                    }
                }

                /**
                 * CHECK DIAGONALS
                 */
                if (
                    board[row_idx + 1] &&
                    board[row_idx + 2] &&
                    board[row_idx + 3] &&
                    board[cell_idx + 1] &&
                    board[cell_idx + 2] &&
                    board[cell_idx + 3]
                ) {
                    if (
                        board[row_idx]![cell_idx] !== 0 &&
                        board[row_idx]![cell_idx] === board[row_idx + 1]![cell_idx + 1] &&
                        board[row_idx]![cell_idx] === board[row_idx + 2]![cell_idx + 2] &&
                        board[row_idx]![cell_idx] === board[row_idx + 3]![cell_idx + 3]
                    ) {
                        return true
                    }
                }

                if (
                    board[row_idx + 1] &&
                    board[row_idx + 2] &&
                    board[row_idx + 3] &&
                    board[cell_idx - 1] &&
                    board[cell_idx - 2] &&
                    board[cell_idx - 3]
                ) {
                    if (
                        board[row_idx]![cell_idx] !== 0 &&
                        board[row_idx]![cell_idx] === board[row_idx + 1]![cell_idx - 1] &&
                        board[row_idx]![cell_idx] === board[row_idx + 2]![cell_idx - 2] &&
                        board[row_idx]![cell_idx] === board[row_idx + 3]![cell_idx - 3]
                    ) {
                        return true
                    }
                }
            }
        }

        return false
    }

    function winner() {
        // Check Rows
        for (const row of board) {
            for (const col of row) {
                if (
                    col !== 0 &&
                    col === row[row.indexOf(col) + 1] &&
                    col === row[row.indexOf(col) + 2] &&
                    col === row[row.indexOf(col) + 3]
                ) {
                    return true
                }
            }
        }

        // for (let row = 0; row < board.length; row++) {
        //     for (let col = 0; col <= board[row]!.length - 4; col++) {
        //         if (
        //             board[row]![col] !== 0 &&
        //             board[row]![col] === board[row]![col + 1] &&
        //             board[row]![col] === board[row]![col + 2] &&
        //             board[row]![col] === board[row]![col + 3]
        //         ) {
        //             return true
        //         }
        //     }
        // }

        // Check columns
        for (const col of board!.keys()) {
            for (const row of board) {
                if (
                    row[col] !== 0 &&
                    row[col] === (board[board.indexOf(row) + 1] ? board[board.indexOf(row) + 1]![col] : undefined) &&
                    row[col] === (board[board.indexOf(row) + 2] ? board[board.indexOf(row) + 2]![col] : undefined) &&
                    row[col] === (board[board.indexOf(row) + 3] ? board[board.indexOf(row) + 3]![col] : undefined)
                ) {
                    return true
                }
            }
        }

        // for (let col = 0; col < board!.length; col++) {
        //     for (let row = 0; row <= board.length - 4; row++) {
        //         if (
        //             board[row]![col] !== 0 &&
        //             board[row]![col] === board[row + 1]![col] &&
        //             board[row]![col] === board[row + 2]![col] &&
        //             board[row]![col] === board[row + 3]![col]
        //         ) {
        //             return true
        //         }
        //     }
        // }

        // Check Diagonals
        for (let row = 0; row <= board.length - 4; row++) {
            for (let col = 0; col <= board[row]!.length - 4; col++) {
                if (
                    (board[row]![col] !== 0 &&
                        board[row]![col] === board[row + 1]![col + 1] &&
                        board[row]![col] === board[row + 2]![col + 2] &&
                        board[row]![col] === board[row + 3]![col + 3]) ||
                    (board[row]![col] !== 0 &&
                        board[row]![col] === board[row + 1]![col - 1] &&
                        board[row]![col] === board[row + 2]![col - 2] &&
                        board[row]![col] === board[row + 3]![col - 3])
                ) {
                    return true
                }
            }
        }
    }

    function handleClick(rowIdx: number, colIdx: number) {
        const isColumnFull = board.every(row => row[colIdx] !== 0)

        if (isColumnFull) {
            alert.error = 'This column is full.'
            return
        } else {
            alert.error = ''
        }

        const column = board.map(row => row[colIdx])
        const lowestRowIdx = column.findLastIndex(num => num === 0)
        board[lowestRowIdx]![colIdx] = gameTurn1 ? 1 : 2

        // gameTurn1 = gameTurn1 === true ? gameTurn1 = false : gameTurn1 = true
        // if (gameTurn1 === true){gameTurn1 = false} else{gameTurn1 = true}

        // gameTurn1 = gameTurn1 ? false : true

        if (winner2()) {
            alert.win = `${gameTurn1 ? player1 : player2} wins!`
        } else {
            gameTurn1 = !gameTurn1
        }
    }
</script>

<div class="ml-4">
    <div>
        <Box title="Connect 4">Connect 4 in a row like in the classic tic tac toe with this fantastic new big board.</Box>
    </div>
    <div
        class="border-l-4 {alert.error ? 'border-red-600 bg-red-400/30' : 'border-green-600 bg-green-400/30'} 
            p-4 w-96 mx-auto my-4 {alert.error || alert.win ? '' : 'invisible'}"
    >
        <h2><i class="bi bi-exclamation-triangle-fill"></i> {alert.error ? alert.error : alert.win}</h2>
    </div>
    <div class="text-center text-2xl">
        <br />
        <div class="flex flex-wrap mx-auto w-[32rem] gap-1">
            {#each board as row, rowIdx}
                {#each row as col, colIdx}
                    <button on:click={() => handleClick(rowIdx, colIdx)} class="bg-neutral-500 hover:bg-neutral-700 p-4 h-16 w-16">
                        {#if col === 1}
                            <p class="animate__animated animate__backInDown animate__fast">🔵</p>
                        {:else if col === 2}
                            <p class="animate__animated animate__backInDown animate__fast">🔴</p>
                        {/if}
                    </button>
                {/each}
            {/each}
        </div>
    </div>
</div>
