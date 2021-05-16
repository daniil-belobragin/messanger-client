<template>
  <div class="input-wrapper" :class="{messageInputWrapper: isMessage}">
    <span class="input-label" :v-show="!isMessage"> {{ inputLabel }} </span>
    <input ref="inputs" class="input" :class="{messageInput: isMessage}" :type="inputType" v-model="model">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class InputComponent extends Vue {

  private model: string = ""

  @Prop() inputLabel!: string
  @Prop({default: false}) isMessage!: boolean
  @Prop({type: Function}) inputChanged!: Function
  @Prop({default: "text"}) inputType!: string
  @Prop({type: Function}) clearFunction!: Function



  @Watch("model")
  modelChanged(newValue: string) {
    this.inputChanged(newValue)
  }

  @Watch("clearFunction")
  clearInput() {
    this.model = ""
  }
}
</script>

<style lang="scss">

  .input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-top: 8px;
    position: relative;
  }

  .input-label {
    font-size: 16px;
    font-weight: 500;
    color: #6b7782;
  }

  .input {
    outline: none;
    border: none;
    border-bottom: 2px solid #6b7782;
    width: 100%;
    font-size: 16px;
    padding: 3px 0;
    box-sizing: border-box;
    background: transparent;
    color: white;
  }

  .input:focus {
    border-bottom: 2px solid #6faff4;
  }
</style>