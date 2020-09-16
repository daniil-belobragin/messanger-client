<template>
  <div class="page-wrapper">
    <div class="wrapper" v-bind:class="{blur: !isJoined}">
      <header-block />
      <div class="body-wrapper">
      </div>
    </div>
    <div class="join-wrapper" v-show="!isJoined">
      <div class="inputs-wrapper">
        <div class="input-wrapper">
          <span class="input-label">Username</span>
          <input class="input" type="text" :placeholder="userNamePlaceholder" v-model="userName"
                 v-on:focus="userNamePlaceholder = ''"
                 v-on:focusout="userNamePlaceholder = initPlaceholder('username')">
        </div>

        <div class="input-wrapper">
          <span class="input-label">Room</span>
          <input class="input" type="text" :placeholder="roomNamePlaceholder" v-model="roomName"
                 v-on:focus="roomNamePlaceholder = ''"
                 v-on:focusout="roomNamePlaceholder = initPlaceholder('room')">
        </div>
      </div>
      <filled-button button-title="Join" :is-available="isButtonAvailable" button-type="signin"
                     :method="click" />
    </div>
  </div>
</template>

<script>
const io = require("socket.io-client")
import { uuid } from "vue-uuid"

import FilledButton from "@/components/buttons/FilledButton";
import HeaderBlock from "@/components/HeaderBlock";
export default {
  name: "Home",

  components: {HeaderBlock, FilledButton},

  data () {
    return {
      isJoined: false,
      socket: io("localhost:1488"),
      userName: "",
      userNamePlaceholder: this.initPlaceholder("username"),
      roomName: "",
      roomNamePlaceholder: this.initPlaceholder("room")
    }
  },

  computed: {
    isButtonAvailable () {
      return this.roomName && this.userName
    },

    user () {
      return {
        uid: uuid.v1(),
        username: this.userName,
        room: this.roomName
      }
    }
  },

  methods: {
    click () {
      if (!this.isButtonAvailable) return

       this.socket.emit('connect_user', this.user)

      this.isJoined = true
    },
    initPlaceholder (label) {
      return "Type " + label.toLowerCase() + " here"
    },
  },

  mounted() {
    this.socket.on('user_connected', (user) => {
      user = {}
      user.toString()
    })
  },
}
</script>

<style lang="scss">

  .page-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .blur {
    filter: blur(4px);
  }

  .body-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    flex: 1;
  }

  .join-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #666666;
    border-radius: 6px;
    position: fixed;
    background: white;
    padding: 30px 20px;
  }

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
    width: 200px;
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

  .empty-field {
    display: flex;
    align-items: center;
    width: 100%;

    padding: 5px 10px;
    background: #e6e6e6;
    border: 1px solid #e91917;
    border-left: 3px solid #e91917;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .empty-field-text-wrapper {
    font-size: 12px;
    font-weight: 700;
    margin-left: 8px;
  }

</style>