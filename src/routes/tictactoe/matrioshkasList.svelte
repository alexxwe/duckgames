<script lang="ts">
    import type { MatrioshkaDTO } from 'src/interfaces/Matrioshka.dto'
    import Matrioshka from './matrioshka.svelte'
    export let playerMatrioshkas: MatrioshkaDTO[]
    export let player1: boolean

    const titleColor = player1 ? 'text-blue-400' : 'text-red-400'
</script>

<div>
    <h2 class="text-xl {titleColor}">{player1 ? 'Player 1' : 'Player 2'}</h2>
    <div class="border grid grid-cols-3">
        {#each playerMatrioshkas as matrioshka}
            <Matrioshka type={matrioshka.value} player1={player1} />
        {/each}
    </div>
</div>
