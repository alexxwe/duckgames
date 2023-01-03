<!--
    @component

    ## TextInput
    Custom text input

    @param inputValue - Value binded to the input
    @param title - Title of the input
    @param onClick - Function to be called when the button is clicked
    @param disabled - If the button should be disabled (default: false)
    @param hideButton - If the button should be hidden (default: false)
    @param buttonStyle - Style of the button (default: 'primary')
-->
<script lang="ts">
    import Btn from './Btn.svelte'

    export let inputValue: string
    export let title: string
    export let onClick: () => void
    export let disabled: boolean = false
    export let hideButton: boolean = false
    export let buttonStyle: 'info' | 'success' | 'warning' | 'danger' = 'info'

    const disabledCSS = disabled ? 'cursor-not-allowed opacity-50' : ''
</script>

<div class="flex flex-col">
    <label class="text-xl m-2" for={title}>{title}</label>
    <input id={title} class="bg-zinc-700 p-2 rounded {disabledCSS}" bind:value={inputValue} {disabled} type="text" />

    {#if !hideButton}
        <span on:click={onClick}>
            <Btn style={buttonStyle}>Save</Btn>
        </span>
    {/if}
</div>
