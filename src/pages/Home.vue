<template>
  <div class="page-wrapper">
    <div class="authorized" v-if="isLoggedIn">

    </div>
    <div class="unauthorized" v-else>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {SessionManager} from "../util/session";

export default  @Component class Home extends Vue {

  get isLoggedIn(): boolean {
    return SessionManager.isLoggedIn()
  }
}
</script>

<style lang="scss">
  @import "../assets/style/style";

  .api-error {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: #dc143c;
    position: fixed;
    top: 100px
  }

</style>