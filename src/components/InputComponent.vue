<template>
  <div class="input-wrapper" :class="{messageInputWrapper: inputType === 'message'}">
    <span class="error" v-show="invalid">
      {{ errorLabel }}
    </span>
    <span class="input-label" v-show="showLabel"> {{ inputLabel }} </span>
    <image-component class="send-icon" v-if="inputType === 'message'" v-show="model"
                     image-alt="send-icon" :image-path="require('../assets/image/send.svg')"
                     image-size="16px" :click-func="sendMessage" />
    <input class="input" :class="{messageInput: inputType === 'message'}" type="text" v-model="model"
           :placeholder="placeholder" v-on:focus="placeholder=''" v-on:focusout="setPlaceholder">
  </div>
</template>

<script>
import ImageComponent from "@/components/ImageComponent";
export default {
  name: "InputComponent",
  components: {
    ImageComponent
  },
  data () {
    return {
      model: "",
      placeholder: ""
    }
  },

  props: {
    inputLabel: {
      type: String
    },

    showLabel: {
      default: false
    },

    inputChanged: {
      type: Function
    },

    errorLabel: {},

    invalid: {
      default: false
    },

    inputType: {
      default: "text"
    },

    sendMessage: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    setPlaceholder () {
      this.placeholder = "Type " + this.inputLabel.toLowerCase() + " here"
    }
  },

  watch: {
    model (newValue) {
      this.inputChanged(newValue)
    }
  },

  created() {
    this.setPlaceholder()
  }
}
</script>

<style lang="scss">

  .input-wrapper {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-bottom: 16px;
    position: relative;
  }

  .input-label {
    font-size: 12px;
    font-weight: 700;
  }

  .input {
    outline: none;
    width: 100%;
    font-size: 13px;
    margin-top: 4px;
    padding: 5px 10px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid #e6e6e6;
    background: #fefefe;
  }

  .input:focus {
    border: 2px solid #48d294;
  }

  .error {
    text-align: right;
    width: 200px;
    position: absolute;
    font-size: 13px;
    font-weight: 700;
    color: crimson;
  }

  .messageInputWrapper {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0;
  }

  .messageInput {
    width: 90%;
    margin: 0;
    font-size: 16px;
  }

  .messageInput:focus {
    border: 2px solid #bababa;
  }

  .send-icon {
    position: absolute;
    top: 5px;
    left: 99%;
    cursor: pointer;
  }
</style>