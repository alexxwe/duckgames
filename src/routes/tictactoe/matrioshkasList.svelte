<script lang="ts">
    import type { GameDataDTO, MatrioshkaDTO } from 'src/interfaces/Matrioshka'
    import Matrioshka from './matrioshka.svelte'

    export let game: GameDataDTO
    export let blueTeam: boolean
    export let isTurn: boolean

    const playerHand = blueTeam ? game.player1 : game.player2
    const titleColor = blueTeam ? 'text-blue-400' : 'text-red-400'
</script>

<div>
    <h2 class="text-xl {titleColor}">{blueTeam ? 'Player 1' : 'Player 2'}</h2>
    <div class="border grid grid-cols-3">
        {#each playerHand as matrioshka}
            <Matrioshka {game} {matrioshka} {blueTeam} isAvailable={isTurn} />
        {/each}
    </div>
</div>
