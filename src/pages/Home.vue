<template>
  <div class="page-wrapper">
    <div class="wrapper" v-bind:class="{blur: !isJoined}">
      <header-block />
      <div class="body-wrapper">
      </div>

    </div>
    <div class="join-wrapper" v-show="!isJoined">
      <div class="empty-field" v-show="emptyUsername || emptyRoom">
        <image-component :image-path="require('../assets/image/block.svg')" image-alt="block" image-size="16px" />
        <div class="empty-field-text-wrapper">
          <span v-if="emptyUsername">Username</span>
          <span v-else-if="emptyRoom">Room</span>
          <span> field missed</span>
        </div>
      </div>
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
      <filled-button button-title="Join" :method="click" />
    </div>
  </div>
</template>

<script>
import ImageComponent from "@/components/ImageComponent";
const io = require("socket.io-client")
import { uuid } from "vue-uuid"

import FilledButton from "@/components/buttons/FilledButton";
import HeaderBlock from "@/components/HeaderBlock";
export default {
  name: "Home",

  components: {ImageComponent, HeaderBlock, FilledButton},

  data () {
    return {
      isJoined: false,
      socket: io("localhost:1488"),
      userName: "",
      userNamePlaceholder: this.initPlaceholder("username"),
      roomName: "",
      roomNamePlaceholder: this.initPlaceholder("room"),
      emptyUsername: null,
      emptyRoom: null
    }
  },

  methods: {
    click () {

      !this.userName ? this.emptyUsername = true : ""
      !this.roomName ? this.emptyRoom = true : ""

      if (!this.userName) {
        this.emptyUsername = true
      }
      else if (!this.roomName) {
        this.emptyRoom = true
      }

      let user = this.initUser()

      this.socket.emit('connect_user', user)
    },
    initPlaceholder (label) {
      return "Type " + label.toLowerCase() + " here"
    },
    initUser () {
      return {
        uid: uuid.v1(),
        username: this.userName,
        room: this.roomName
      }
    }
  },

  mounted() {
    this.socket.on('user_connected', (user) => {
      user = {}
      user.toString()
    })
  },

  watch: {
    userName (val) {
      this.userName = val
      this.userName ? this.emptyUsername = false : ""
    },
    roomName (val) {
      this.roomName = val
      this.roomName ? this.emptyRoom = false : ""
    }
  }
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