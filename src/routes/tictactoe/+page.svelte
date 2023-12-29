<script lang="ts">
    import Box from '$lib/components/Box.svelte'
    import { styles } from '../../styles/globals'
    import { TicTacToe, type Piece, gameData } from './game'

    // Ask for player names
    let gameStep: 0 | 1 = 0
    let input1: string = 'Player 1'
    let input2: string = 'Player 2'

    // Initialize the game
    // The inner logic is handled by the class
    const game = new TicTacToe()

    function highlightCell(clickedPiece: Piece, selectedPiece: Piece | null, isBluePlayer: boolean) {
        if (selectedPiece !== null && clickedPiece.player !== selectedPiece.player) {
            selectedPiece = null
            // return alert('You can only move your pieces!')
        }
        return clickedPiece.id === selectedPiece?.id ? 'border-green-400' : isBluePlayer ? 'border-blue-700' : 'border-red-700'
    }

    function pieceBackground(piece: Piece) {
        return piece.player === 1 ? 'bg-blue-500/50' : 'bg-red-500/50'
    }

    function handleClickOnPiece(piece: Piece) {
        game.selectPiece(piece)
    }

    function handleClickOnBoard(row: number, col: number) {
        game.movePiece(row, col)
    }
</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Tic Tac Toe">The game you already know BUT this time with matrioshkas!</Box>
    <!-- <span>isWhiteTurn: {$gameData.isWhiteTurn}</span> -->
    <!-- <span>selectedPiece: {JSON.stringify($gameData.selectedPiece)}</span> -->
    <br />

    {#if gameStep === 0} 
        <p class="py-8">To start the game, write your names</p>
        <section class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col">
                <label class="m-2 text-xl" for="p1">Player 1</label>
                <input id="p1" class="rounded bg-zinc-700 p-2" bind:value={input1} type="text" />
            </div>
            <div class="flex flex-col">
                <label class="m-2 text-xl" for="p2">Player 2</label>
                <input id="p2" class="rounded bg-zinc-700 p-2" bind:value={input2} type="text" />
            </div>
        </section>

        <button class="{styles.button.info} {input1 && input2 ? '' : 'cursor-not-allowed opacity-50'} mt-8" on:click={() => (gameStep = 1)}>
            Start
        </button>
    {/if}

    {#if gameStep === 1}
        {#if $gameData.isWhiteTurn}
            <div>Turn: {input1}</div>
        {:else}
            <div>Turn: {input2}</div>
        {/if}

        <section class="grid grid-cols-3 gap-8">
            <aside>
                <h2 class="pb-4 text-center text-2xl">{input1}</h2>
                <hr />
                <br />
                <div class="grid grid-cols-3 gap-2 text-4xl">
                    {#each $gameData.player1 as piece, pieceIdx}
                        <div class="flex justify-center">
                            {#if piece.used}
                                <div class="rounded bg-gray-500/50 p-2 opacity-25">
                                    {game.icon(piece)}
                                </div>
                            {:else}
                                <button
                                    class="border rounded bg-blue-500/50 p-2 {highlightCell(piece, $gameData.selectedPiece, true)}"
                                    on:click={() => handleClickOnPiece(piece)}
                                >
                                    {game.icon(piece)}
                                </button>
                            {/if}
                        </div>
                    {/each}
                </div>
            </aside>

            <div>
                <h2 class="pb-4 text-center text-2xl">Board</h2>
                <hr />
                <br />
                <div class="grid grid-cols-3 gap-3">
                    {#each $gameData.board as row, rowIdx}
                        {#each row as cell, cellIdx}
                            {#if cell === 0}
                                <button on:click={() => handleClickOnBoard(rowIdx, cellIdx)} class="h-24 w-24 rounded bg-zinc-700 p-4">
                                    {cell}
                                </button>
                            {:else}
                                <button
                                    on:click={() => handleClickOnBoard(rowIdx, cellIdx)}
                                    class="h-24 w-24 rounded bg-zinc-700 text-4xl flex justify-center items-center {pieceBackground(cell)}"
                                >
                                    {game.icon(cell)}
                                </button>
                            {/if}
                        {/each}
                    {/each}
                </div>
            </div>

            <aside>
                <h2 class="pb-4 text-center text-2xl">{input2}</h2>
                <hr />
                <br />
                <div class="grid grid-cols-3 gap-2 text-4xl">
                    {#each $gameData.player2 as piece, pieceIdx}
                    <div class="flex justify-center">
                        {#if piece.used}
                            <div class="rounded bg-gray-500/50 p-2 opacity-25">
                                {game.icon(piece)}
                            </div>
                        {:else}
                            <button
                                class="border rounded bg-red-700/50 p-2 {highlightCell(piece, $gameData.selectedPiece, false)}"
                                on:click={() => handleClickOnPiece(piece)}
                            >
                                {game.icon(piece)}
                            </button>
                        {/if}
                        </div>
                    {/each}
                </div>
            </aside>
        </section>
    {/if}
</div>
