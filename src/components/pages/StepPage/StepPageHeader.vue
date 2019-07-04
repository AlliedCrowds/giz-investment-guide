<template>
  <header
    class="headerMain flex flex-row flex-justify-space-around flex-align-center"
  >
    <div class="pull-left headLeft"><german-cooperation-header-link /></div>
    <div class="pull-right">
      <giz-header-link />
      <make-it-header-link />
      <router-link class="btn" :to="{ name: 'home' }" title="Back to start">
        <i class="fa fa-caret-left" aria-hidden="true"></i> &nbsp; Back to start
      </router-link>
      <router-link
        class="small_btn"
        :to="{ name: 'home' }"
        title="Back to start"
      >
        <i class="fa fa-caret-left" aria-hidden="true"></i> &nbsp;
      </router-link>
    </div>
  </header>
</template>
<script>
import GermanCooperationHeaderLink from '@/components/elements/GermanCooperationHeaderLink.vue'
import GizHeaderLink from '@/components/elements/GizHeaderLink.vue'
import MakeITHeaderLink from '@/components/elements/MakeITHeaderLink.vue'

export default {
  name: 'step-page-header',
  components: {
    'german-cooperation-header-link': GermanCooperationHeaderLink,
    'giz-header-link': GizHeaderLink,
    'make-it-header-link': MakeITHeaderLink,
  },
}
</script>

<style scoped>
.small_btn {
  display: none;
  vertical-align: top;
  padding: 5px 7px;
  color: #04749c;
  border: 2px solid #04749c;
  border-radius: 30px;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  position: relative;
  margin-top: 15px;
}

@media only screen and (max-width: 640px) {
  .small_btn {
    display: inline-block;
  }
}
</style>
