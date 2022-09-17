<script lang="ts">
    import type { GameDTO } from './types/Game'
    import Box from '$lib/Box.svelte'
    import TextInput from '$lib/TextInput.svelte'
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
        <TextInput
            inputValue={input1}
            title="Player 1"
            onClick={() => (game.player1.name = input1)}
            disabled={game.player1.name !== ''}
            hideButton={game.player1.name !== ''}
        />
        <TextInput
            inputValue={input2}
            title="Player 2"
            onClick={() => (game.player2.name = input2)}
            disabled={game.player2.name !== ''}
            hideButton={game.player2.name !== ''}
            buttonStyle="danger"
        />
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
