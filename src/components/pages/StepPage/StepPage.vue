<template>
  <div id="app">
    <step-page-header />
    <section class="sectionMain">
      <div class="overlay" />
      <step-page-sidebar
        :progress="progress"
        :country="country"
        :sector="sector"
        :fundingNeed="fundingNeed"
        :props="props"
      />
      <div class="rightSide">
        <component :is="renderedComponent" v-bind="props" />
      </div>
    </section>
  </div>
</template>
<script>
import StepPageHeader from './StepPageHeader.vue'
import StepPageSidebar from './StepPageSidebar.vue'

export default {
  components: {
    'step-page-header': StepPageHeader,
    'step-page-sidebar': StepPageSidebar,
  },
  name: 'step-page',
  props: {
    country: {
      type: String,
    },
    sector: {
      type: String,
    },
    fundingNeed: {
      type: String,
    },
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
    renderedComponent: {
      type: Object,
      required: false,
    },
    props: {
      type: Object,
    },
  },
  created() {
    var params = this.$route.path.split('/')
    params = params.splice(1)
    params.pop()
    if (
      this.$store.state.country != params[0] ||
      this.$store.state.sector != params[1] ||
      this.$store.getters.currentResults.length == 0
    ) {
      this.$store.commit('setState', {
        country: params[0],
        sector: params[1],
        fundingNeed: params[2],
      })
      this.$store.dispatch('search', {
        embed: [
          'provider_capital_types',
          'provider_capital_types.capital_type',
          'provider_sectors',
          'provider_sectors.sector',
          'provider_stats',
          'provider_stats.stat',
          'provider_descriptions',
          'provider_descriptions.description',
        ],
      })
    }
  },
}
</script>
