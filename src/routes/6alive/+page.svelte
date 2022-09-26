<script lang="ts">
    import type { Game } from './types/Game'

    const game: Game = {
        players: [],
        deck: [],
        discarded: {
            cards: [],
            value: 0,
        },
    }

    let playersInput: number = 0
    let playersPending: number = 0
    let error: string = ''

    function assignPlayers (numPlayers: number): void {
        error = ''
        if (numPlayers < 2) error = 'Min number: 2'
        if (numPlayers > 8) error = 'Max number: 8'
        if (!error) playersPending = numPlayers
    }
</script>

<div>
    {#if !playersPending}
        <h1>Welcome, choose a player (2-8)</h1>
        <br/>
        <input class="bg-zinc-600" bind:value={playersInput} type="number" min="2" max="8" />
        <p>{playersInput ?? 0} selected</p>
        <button class="border bg-blue-600" on:click={() => assignPlayers(playersInput)}>CONFIRM</button>
        {#if error}
            <p class="text-red-600">Oh no! {error}</p>
        {/if}
    {:else}
        <p>{playersInput} selected</p>
        <p>Yeah, lets start</p>
    {/if}
</div>
