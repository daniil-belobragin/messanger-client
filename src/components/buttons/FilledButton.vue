<template>
  <button class="filled-button" v-on:click="method" v-bind:class="{'signin': buttonType === 'signin',
  'disabled': !isAvailable}" :disabled="!isAvailable">
    <span> {{ buttonLabel }} </span>
  </button>
</template>

<script>
export default {

  name: "FilledButton",

  props: {
    buttonLabel: {
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

  .signin {
    background: #48d294;
    cursor: pointer;
  }

  .signin:hover {
    filter: brightness(95%);
  }

  .disabled {
    background: #fefefe;
    cursor: default;
  }
  .disabled:hover {
    filter: none;
  }
</style>