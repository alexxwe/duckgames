<script lang="ts">
    import type { MatrioshkaDTO } from 'src/interfaces/Matrioshka'
    import Matrioshka from './matrioshka.svelte'
    export let playerMatrioshkas: MatrioshkaDTO[]
    export let blueTeam: boolean
    export let isTurn: boolean
    export let selectToken: (id: number) => number

    const titleColor = blueTeam ? 'text-blue-400' : 'text-red-400'
</script>

<div>
    <h2 class="text-xl {titleColor}">{blueTeam ? 'Player 1' : 'Player 2'}</h2>
    <div class="border grid grid-cols-3">
        {#each playerMatrioshkas as matrioshka}
            <Matrioshka {matrioshka} {blueTeam} isAvailable={isTurn} {selectToken} />
        {/each}
    </div>
</div>
