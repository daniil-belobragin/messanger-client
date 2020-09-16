<template>
  <button class="filled-button" v-on:click="method" v-bind:class="{'unavailable-signin': (buttonType === 'signin' && !isAvailable),
  'available-signin': (buttonType === 'signin' && isAvailable)}">
    <span> {{ buttonTitle }} </span>
  </button>
</template>

<script>
export default {

  name: "FilledButton",

  props: {
    buttonTitle: {
      required: true
    },
    buttonType: {
      type: String
    },
    isAvailable: {
      default: false
    },
    method: {
      required: true
    }
  },
}
</script>

<style lang="scss">
  .filled-button {
    border: none;
    color: black;
    outline: none;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
  }


  .unavailable-signin {
    background: #e6e6e6;
  }

  .available-signin {
    background: #48d294;
    cursor: pointer;
  }

  .available-signin:hover {
    filter: brightness(95%);
  }
</style>