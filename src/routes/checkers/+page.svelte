<script lang="ts">
    import Box from '$lib/components/Box.svelte'

    /**
     * 0: empty
     * 1: White
     * 2:
     */

    let player1: string = 'Blue'
    let player2: string = 'Red'

    let gameTurn1: boolean = true

    let alert = {
        error: '',
        win: '',
    }
    // const board = () => Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0))
    let board: Array<Array<number>> = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ]
    
    function handleClick(rowIdx: number, colIdx: number) {
        if (alert.win) {
            return
        }

        const isCellOutOfRange = board.every(row => row[colIdx] !== 0)

        if (isCellOutOfRange) {
            alert.error = 'Piece inside the board please.'
            return
        } else {
            alert.error = ''
        }

        // if (winner()) {
        //     alert.win = `${gameTurn1 ? player1 : player2} wins!`
        // } else {
        //     gameTurn1 = !gameTurn1
        // }
    }

    function resetGame() {
        alert.error = ''
        alert.win = ''
        gameTurn1 = true
        board = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ]
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
    <div class="text-center text-2xl">
        <div class="flex flex-wrap mx-auto w-[34rem] gap-1">
            {#each board as row, rowIdx}
            {#each row as col, colIdx}
            <div class="{(colIdx + rowIdx) % 2 === 0 ? 'bg-black' : 'bg-white'} flex">
                    <button on:click={() => handleClick(rowIdx, colIdx)} class="hover:bg-neutral-700 p-4 h-16 w-16">
                        {#if col === 1}
                            <p class="animate__animated animate__backInUp animate__fast">🔵</p>
                        {:else if col === 2}
                            <p class="animate__animated animate__backInDown animate__fast">🔴</p>
                        {/if}
                    </button>
                </div>
                {/each}
            {/each}
        </div>
    </div>
</div>
<!-- <button on:click={resetGame} class="rounded rounded-t-full font-semibold bg-red-600 hover:bg-red-800 py-2 px-4 ml-4 my-4">
    Reset Game</button
> -->
