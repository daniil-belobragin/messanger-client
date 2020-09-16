<template>
  <div class="input-wrapper">
    <span class="input-label" v-show="showLabel"> {{ inputLabel }} </span>
    <input class="input" type="text" v-model="value" :placeholder="placeholder" v-on:focus="placeholder=''"
           v-on:focusout="initPlaceholder" v-on:input="inputChanged">
  </div>
</template>

<script>
export default {
  name: "InputComponent",

  data () {
    return {
      value: "",
      placeholder: ""
    }
  },

  props: {
    inputLabel: {
      type: String
    },
    showLabel: {
      default: false
    }
  },

  methods: {
    inputChanged () {
      let data = {
        value: this.value,
        target: this.inputLabel
      }

      this.$emit("inputChangedEvent", data)
    },

    initPlaceholder () {
      this.placeholder = "Type " + this.inputLabel.toLowerCase() + " here"
    }
  },

  mounted() {
    this.initPlaceholder()
  }
}
</script>

<style scoped>

  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .input-label {
    font-size: 12px;
    font-weight: 700;
  }

  .input {
    outline: none;
    max-width: 200px;
    font-size: 13px;
    margin-top: 4px;
    padding: 5px 10px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid #e6e6e6;
    background: #e6e6e6;
  }

  .input:focus {
    border: 2px solid #48d294;
  }

</style>