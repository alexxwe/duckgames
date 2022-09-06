<script lang="ts">
    export let type: 1 | 2 | 3

    const emojis = {
        1: 'bi-emoji-frown text-red-400',
        2: 'bi-emoji-neutral text-yellow-400',
        3: 'bi-emoji-smile text-green-400',
    }
</script>

<div class="w-12 h-12 bg-zinc-700 m-1 flex items-center justify-center text-4xl hover:bg-zinc-500 cursor-pointer">
    <i class="bi {emojis[type]}"></i>
</div>
