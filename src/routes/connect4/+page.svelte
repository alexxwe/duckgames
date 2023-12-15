<script lang="ts">
    // 🔴🔵

    import Box from '$lib/components/Box.svelte'
    // Player Names
    let player1: string = 'Alex'
    let player2: string = 'EvilAlex'

    //Turns
    let gameTurn1: boolean = true

    let isBlueTurn: boolean = true

    //Pieces
    let piece1: string = '🔵' //1
    let piece2: string = '🔴' //2

    // Board
    const board: Array<Array<number>> = [
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1]
    ]

    function handleClick(rowIdx: number, colIdx: number){
        const isColumnFull = board.every(row => row[colIdx]!==0)
            
        if(isColumnFull) {
            return alert('Hey, aqui no puedes colocar nada')
        }

        const column = board.map(row => row[colIdx])
        const lowestRowIdx = column.findLastIndex(num => num === 0)
        board[lowestRowIdx]![colIdx] = gameTurn1 ? 1 : 2
        // gameTurn1 = gameTurn1 === true ? gameTurn1 = false : gameTurn1 = true
        // if (gameTurn1 === true){gameTurn1 = false} else{gameTurn1 = true}

        // gameTurn1 = gameTurn1 ? false : true

        gameTurn1 = !gameTurn1
    }
</script>

<div class="ml-4">
    <div>
        <Box title="Connect 4">Connect 4 in a row like in the classic tic tac toe with this fantastic new big board.</Box>
        <br />
        <br />
    </div>
    <div class="ml-4">
        {#if (gameTurn1)}
            <p class="text-blue-400">{player1} Turn</p>
        {:else}
            <p class="text-red-400">{player2} Turn</p>
        {/if}
    </div>
    <div class="text-center text-2xl">
        BOARD
        <br />
        <br />
        <div class="flex flex-wrap mx-auto w-[32rem] gap-1">
            {#each board as row, rowIdx}
                {#each row as col, colIdx}
                    <button on:click={() => handleClick(rowIdx, colIdx)} class="bg-neutral-500 hover:bg-neutral-700 p-4 h-16 w-16"
                        >{col}</button
                    >
                {/each}
            {/each}
        </div>
    </div>
</div>
