<script lang="ts">
    import type { MatrioshkaDTO } from 'src/interfaces/Matrioshka.dto'
    import Matrioshka from './matrioshka.svelte'
    export let playerMatrioshkas: MatrioshkaDTO[]
    export let name: string
</script>

<div>
    <h2>{name}</h2>
    <div class="border grid grid-cols-3">
        {#each playerMatrioshkas as matrioshka}
            <Matrioshka type={matrioshka.value} />
        {/each}
    </div>
</div>
