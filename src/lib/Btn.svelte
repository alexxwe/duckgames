<!--
  @component

  ## Btn
  Custom button

  @param style - the style of the button
-->

<script lang="ts">
    export let style: 'info' | 'success' | 'warning' | 'danger'

    const color = {
        info: 'bg-blue-500 hover:bg-blue-700 border-2 border-blue-800',
        success: 'bg-green-500 hover:bg-green-700 border-2 border-green-800',
        warning: 'bg-yellow-500 hover:bg-yellow-700 border-2 border-yellow-800',
        danger: 'bg-red-500 hover:bg-red-700 border-2 border-red-800',
    }
</script>

<button type="button" class="{color[style]} text-xl tracking-wide py-1 px-6 m-2 rounded">
    <slot/>
</button>
