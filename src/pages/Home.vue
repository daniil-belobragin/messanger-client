<template>
  <div class="page-wrapper">
    <div class="authorized" v-if="isLoggedIn">

    </div>
    <div class="unauthorized" v-else>
      <div class="authorization-wrapper">
        <div class="authorization-header">
          <span class="authorization-type" :class="{active: authorizationType === 'signup'}"
                @click="authorizationTypeChanged('signup')">SignUp</span>
          <span class="authorization-type" v-bind:class="{ active: authorizationType === 'signin'}"
                @click="authorizationTypeChanged('signin')">SignIn</span>
        </div>
        <div class="authorization" v-if="authorizationType === 'signup'" :class="{signup: authorizationType === 'signup'}">
          <input-component input-label="Name" :input-changed="nameChanged" :clear-function="authorizationTypeChanged"/>
          <input-component input-label="Email" input-type="email" :input-changed="emailChanged"
                           :clear-function="authorizationTypeChanged"/>
          <input-component input-label="Password" input-type="password" :input-changed="passwordChanged"
                           :clear-function="authorizationTypeChanged"/>
          <input-component input-label="Repeat password" input-type="password" :input-changed="repeatPasswordChanged"/>
        </div>
        <div class="authorization" v-else :class="{ signin: authorizationType === 'signin'}">
          <input-component input-label="Email" input-type="email" :input-changed="emailChanged"/>
          <input-component input-label="Password" input-type="password" :input-changed="passwordChanged"/>
        </div>
        <filled-button button-label="Confirm" :method="confirm"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SessionManager } from "@/util/session";
import InputComponent from "@/components/InputComponent.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import { signIn } from "@/api/session";

@Component({
  components: {FilledButton, InputComponent}
})
export default class Home extends Vue {
  private authorizationType: string = ""
  private name: string = ""
  private email: string = ""
  private password: string = ""
  private repeatPassword: string = ""

  get isLoggedIn (): boolean {
    return SessionManager.isLoggedIn()
  }

  public nameChanged (value: string): void {
    this.name = value
  }
  public emailChanged (value: string): void {
    this.email = value
  }
  public passwordChanged (value: string): void {
    this.password = value
  }
  public repeatPasswordChanged (value: string): void {
    this.repeatPassword = value
  }
  public authorizationTypeChanged (value: string): void {
    this.name = ""
    this.email = ""
    this.password = ""
    this.repeatPassword = ""
    this.authorizationType = value
  }
  public confirm(): void {
    if (this.authorizationType === 'signin') {
      signIn(this.email, this.password, (response: any) => {
        SessionManager.setSession(response.data.data.access_token, response.data.data.refresh_token)
        SessionManager.setLoggedIn(true)
      }, (error: any) => {
        console.log(error)
      })
    }
  }

  created () {
    if (SessionManager.isLoggedIn()) {
      this.authorizationType = "signin"
    } else {
      this.authorizationType = "signup"
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/style/style";

  .page-wrapper {
    width: 100vmax;
  }

  .authorization-wrapper {
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border: 1px solid #6b7782;
    border-radius: 10px;
  }

  .authorization-header {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .authorization-type {
    color: #6faff4;
    border-radius: 4px 4px 0 0;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-bottom: 2px solid #18212b;
  }

  .active {
    border-bottom: 2px solid #6faff4;
  }

  .authorization-type:hover {
    background: #1e293a;
  }

  .authorization {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
  }

</style>