<script lang="ts">
    import type { GameDTO } from './types/Game'
    import Box from '$lib/Box.svelte'
    import Btn from '$lib/Btn.svelte'
    import MatrioshkasList from './matrioshkasList.svelte'

    /**
     * Declare the game information
     */
    const game: GameDTO = {
        player1: {
            name: '',
            tokens: [],
            isTurn: false,
        },
        player2: {
            name: '',
            tokens: [],
            isTurn: false,
        },
        selectToken: (id: number) => (game.selectedToken = id),
        selectedToken: 0,
    }

    // Fill the players array with tokens
    const opts: Array<1 | 2 | 3> = [1, 1, 1, 2, 2, 2, 3, 3, 3]
    opts.forEach((value, idx) => {
        game.player1.tokens.push({
            id: idx + 1,
            value,
            position: 0,
        })
        game.player2.tokens.push({
            id: idx + 10,
            value,
            position: 0,
        })
    })

    // Ask for player names
    let input1: string
    let input2: string
</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Tic Tac Toe">The game you already know BUT this time with matrioshkas!</Box>
    <br />

    <section class="grid md:grid-cols-2 gap-4">
        <div class="flex flex-col">
            <label class="text-xl m-2" for="player1">Player 1 name</label>
            <input
                id="player1"
                class="bg-zinc-700 p-2 rounded {!game.player1.name ? '' : 'cursor-not-allowed opacity-50'}"
                bind:value={input1}
                disabled={game.player1.name !== ''}
                type="text"
            />

            {#if !game.player1.name}
                <span on:click={() => (game.player1.name = input1)}>
                    <Btn style="info">Save</Btn>
                </span>
            {/if}
        </div>
        <div class="flex flex-col">
            <label class="text-xl m-2" for="player2">Player 2 name</label>
            <input
                id="player2"
                class="bg-zinc-700 p-2 rounded {!game.player2.name ? '' : 'cursor-not-allowed opacity-50'}"
                bind:value={input2}
                disabled={game.player2.name !== ''}
                type="text"
            />
            {#if !game.player2.name}
                <span on:click={() => (game.player2.name = input2)}>
                    <Btn style="danger">Save</Btn>
                </span>
            {/if}
        </div>
    </section>

    {#if !game.player1.name}
        <span />
    {:else if !game.player2.name}
        <span />
    {:else}
        <h1>FINISHED!!!!!!!!!!</h1>
        {game.player1.name}
        {game.player2.name}
    {/if}

    <div class="grid grid-cols-3 gap-4">
        <MatrioshkasList {game} blueTeam={true} isTurn={true} />
    
        <div>
            <h2 class="text-xl">map</h2>
            <div class="border grid grid-cols-3">
            </div>
        </div>
        
        <MatrioshkasList {game} blueTeam={false} isTurn={false} />
    </div>
</div>

selected matrioshka {game.selectedToken}
