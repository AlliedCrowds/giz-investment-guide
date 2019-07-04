<template>
  <header
    class="headerMain flex flex-row flex-justify-space-around flex-align-center"
  >
    <div class="pull-left headLeft"><german-cooperation-header-link /></div>
    <div class="pull-right">
      <giz-header-link />
      <make-it-header-link />
    </div>
  </header>
</template>
<script>
import GermanCooperationHeaderLink from '@/components/elements/GermanCooperationHeaderLink.vue'
import GizHeaderLink from '@/components/elements/GizHeaderLink.vue'
import MakeITHeaderLink from '@/components/elements/MakeITHeaderLink.vue'

export default {
  name: 'home-page-header',
  components: {
    'german-cooperation-header-link': GermanCooperationHeaderLink,
    'giz-header-link': GizHeaderLink,
    'make-it-header-link': MakeITHeaderLink,
  },
}
</script>
