<template>
  <button class="filled-button" @click="method">
    <span> {{ buttonLabel }} </span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class FilledButton extends Vue {

  @Prop({required: true}) buttonLabel!: string
  @Prop({required: true}) method!: Function

}
</script>

<style lang="scss">
  .filled-button {
    margin-top: 30px;
    font-size: 16px;
    border: none;
    color: white;
    background: #356ba7;
    outline: none;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  .filled-button:hover {
    filter: brightness(110%);
  }
</style>