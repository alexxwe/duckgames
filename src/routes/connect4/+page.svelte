<script lang="ts">
    // 🔴🔵

    import Box from '$lib/components/Box.svelte'

    let player1: string = 'Blue'
    let player2: string = 'Red'

    let gameTurn1: boolean = true

    let alert = {
        error: '',
        win: '',
    }

    const generateBoard = () => Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => 0))

    // Board
    let board: Array<Array<number>> = generateBoard()

    // Winner function
    function winner() {
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

    function handleClick(rowIdx: number, colIdx: number) {
        if (alert.win) {
            return
        }

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

        if (winner()) {
            alert.win = `${gameTurn1 ? player1 : player2} wins!`
        } else {
            gameTurn1 = !gameTurn1
        }
    }

    function resetGame() {
        alert.error = ''
        alert.win = ''
        gameTurn1 = true
        board = generateBoard()
    }
</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Connect 4">Connect 4 in a row like in the classic tic tac toe with this fantastic new big board.</Box>

    <h1 class="text-center text-3xl font-semibold {gameTurn1 ? 'text-blue-400' : 'text-red-400'}">{gameTurn1 ? player1 : player2}</h1>
    <div
        class="border-l-4 {alert.error ? 'border-red-600 bg-red-400/30' : 'border-green-600 bg-green-400/30'} 
            p-4 w-72 mx-auto my-2 {alert.error || alert.win ? '' : 'invisible'}"
    >
        <h2><i class="bi bi-exclamation-triangle-fill"></i> {alert.error ? alert.error : alert.win}</h2>
    </div>
    <div class="flex flex-wrap mx-auto w-[19rem] md:w-[32rem] gap-1 text-center text-2xl">
        {#each board as row, rowIdx}
            {#each row as col, colIdx}
                <button on:click={() => handleClick(rowIdx, colIdx)} class="bg-neutral-500 hover:bg-neutral-700 md:p-4 h-10 w-10 md:h-16 md:w-16">
                    {#if col === 1}
                        <div class="animate__animated animate__backInDown animate__fast flex items-center justify-center w-full h-full">
                            <p class="w-8 h-8 bg-blue-700 rounded-full border-4 border-blue-900"></p>
                        </div>
                    {:else if col === 2}
                        <div class="animate__animated animate__backInDown animate__fast flex items-center justify-center w-full h-full">
                            <p class="w-8 h-8 bg-red-700 rounded-full border-4 border-red-900"></p>
                        </div>
                    {/if}
                </button>
            {/each}
        {/each}
    </div>
</div>
<!-- </div> -->
<button on:click={resetGame} class="rounded rounded-t-full font-semibold bg-red-600 hover:bg-red-800 py-2 px-4 ml-4 my-4">
    Reset Game</button
>
