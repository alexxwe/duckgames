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

    // Nº of players selection
    let numOfPlayersInput: number = 0
    let numOfPlayersPending: number = 0
    let error: string = ''
    
    function assignNumOfPlayers (numPlayers: number): void {
        error = ''
        if (numPlayers < 2) error = 'Min number: 2'
        if (numPlayers > 8) error = 'Max number: 8'
        if (!error) numOfPlayersPending = numPlayers
    }

    // Names of players selection
    const names: string[] = []

    function registerName(name: string): void {

    }
</script>

<div>
    {#if !numOfPlayersPending}
        <!-- Step 1: select num of players -->
        <h1>Welcome, choose a player (2-8)</h1>
        <br/>
        <input class="bg-zinc-600" bind:value={numOfPlayersInput} type="number" min="2" max="8" />
        <p>{numOfPlayersInput ?? 0} selected</p>
        <button class="border bg-blue-600" on:click={() => assignNumOfPlayers(numOfPlayersInput)}>CONFIRM</button>
        {#if error}
            <p class="text-red-600">Oh no! {error}</p>
        {/if}
    {:else}
        <!-- Step 2: assign names to players -->
        <p>{numOfPlayersPending} selected</p>

        {#each Array(numOfPlayersPending) as x, idx}
            <p>Player {++idx}</p>
            <input class="bg-zinc-600" bind:value={names[idx]} type="text" />
            {#if !names[idx]}
                <button class="border bg-blue-600" on:click={() => registerName(String(names[idx]))}>CONFIRM</button>
            {/if}
        {/each}

        <p>Names assigned:</p>
        {#each names as name}
            <p> player {names.indexOf(name) + 1}: {name }</p>
        {/each}
    {/if}
</div>