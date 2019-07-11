<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div
          v-if="selectedProvider"
          class="rightSideInner cms_style profileMain"
        >
          <router-link
            style="float: left; background: white; margin-bottom: 25px;"
            class="btn big-btn back-btn"
            :to="{ path: getDirectoryReturnPath, params: {} }"
            >Back to Directory</router-link
          >
          <h3 class="secTitle text-center" style="float: left;">
            {{ selectedProvider.name }}
          </h3>
          <h5 class="founded pull-right">
            Founded in {{ selectedProvider.year_founded }}
          </h5>
          <div class="directoryMain midConScroll mCustomScrollbar">
            <div class="minConHeight">
              <div class="directoryInner">
                <div class="profileHead">
                  <div
                    class="card logoBox eqheight imgMain"
                    style="height: 305px;"
                  >
                    <a :href="selectedProvider.url" target="blank">
                      <img class="absoImg" :src="selectedProvider.logo" alt />
                    </a>
                  </div>
                  <div
                    class="card profileInfo eqheight"
                    style="overflow-y:scroll;"
                  >
                    <ul>
                      <li>
                        <strong>Company Website:</strong>
                        <a :href="selectedProvider.url" target="blank">{{
                          selectedProvider.url
                        }}</a>
                      </li>
                      <li v-if="focusGeo">
                        <strong>Focus Geography:</strong> {{ focusGeo }}
                      </li>
                      <li v-if="averageInvestment">
                        <strong>Average Investment Size:</strong>
                        {{ averageInvestment }}
                      </li>
                      <li v-if="sectors">
                        <strong>Sector of Interest:</strong> {{ sectors }}
                      </li>
                      <li v-if="avgTimeYears">
                        <strong>Average Time to Close Deal:</strong>
                        {{ avgTimeDays }} days
                      </li>
                      <li v-if="selectedProvider.provider_capital_types">
                        <strong>Type of Capital:</strong>
                        <tooltip-render
                          styleType="display: inline-block;"
                          :text="capitalTypes"
                        />
                      </li>
                      <li v-if="avgTimeDays">
                        <strong>Average Time to Exit:</strong>
                        {{ avgTimeYears }} years
                      </li>
                      <li v-if="exitSought">
                        <strong
                          >Type of
                          <tooltip-render
                            styleType="display: inline-block;"
                            text="Exit"
                          />
                          Sought:</strong
                        >
                        {{ exitSought }}
                      </li>
                      <li v-if="averageIRR">
                        <strong
                          >Average
                          <tooltip-render
                            styleType="display: inline-block;"
                            text="IRR"
                          />
                          Sought:</strong
                        >
                        {{ averageIRR * 100 }}%
                      </li>
                      <li v-if="managementControl">
                        <strong
                          ><tooltip-render
                            styleType="display: inline-block;"
                            text="Management Control"
                          />
                          Sought:
                        </strong>
                        {{ managementControl }}
                      </li>
                      <li v-if="additionalServices">
                        <strong>Additional Services: </strong>
                        {{ additionalServices }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card profileAbout">
                  <div
                    v-if="selectedProvider.description"
                    style="margin-bottom: 20px;"
                  >
                    <h3>Description:</h3>
                    <span v-html="format(selectedProvider.description)" />
                  </div>
                  <div v-if="investorVision" style="margin-bottom: 20px;">
                    <h3>Investor Vision:</h3>
                    <span v-html="format(investorVision)" />
                  </div>
                  <div v-if="fundingGoals" style="margin-bottom: 20px;">
                    <h3>Investor Funding Goals:</h3>
                    <span v-html="format(fundingGoals)" />
                  </div>
                  <div v-if="entrepExp" style="margin-bottom: 20px;">
                    <h3>Entrepreneurial Experience:</h3>
                    <span v-html="format(entrepExp)" />
                  </div>
                  <div v-if="techExp" style="margin-bottom: 20px;">
                    <h3>Technical Experience:</h3>
                    <span v-html="format(techExp)" />
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
            <div class="text-center bottom_btn">
              <p class="note">
                You are the institution of this profile and some data are out of
                date? Please update your profile!
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfGauyrsS7klY1nq37FNhiVZdKqZvz6rjmDY865d4YxuNe9LQ/viewform"
                  target="_blank"
                  >Click here</a
                >
                to do so.
              </p>

              <router-link
                class="btn big-btn back-btn"
                :to="{ path: getDirectoryReturnPath, params: {} }"
                >Back to Directory</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import tooltipRender from '@/components/elements/tooltipRender.vue'
import marked from 'marked'

export default {
  name: 'investor-profile-content',
  components: {
    'tooltip-render': tooltipRender,
  },
  props: {
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
    props: {
      type: Object,
    },
  },
  data: function() {
    return {
      fullDataRequestSent: false,
    }
  },
  computed: {
    ...mapGetters(['provider']),
    selectedProvider: function() {
      if (this.$store.getters.provider.id == this.$route.params.id) {
        // already have full data
        return this.$store.getters.provider
      }

      var investor = this.$store.getters.currentResults.find((provider) => {
        var id = provider.provider_id ? provider.provider_id : provider.id
        return id == this.$route.params.id
      })

      if (!investor.hasOwnProperty('id') && !this.fullDataRequestSent) {
        // search investor is only part data return but fetch
        this.fullDataRequestSent = true
        this.$store.dispatch('fetchProviderById', {
          provider_id: this.$route.params.id,
        })
        return investor
      }
      return investor
    },
    getDirectoryReturnPath: function() {
      if (
        this.$store.state.route.from &&
        this.$store.state.route.from.path.split('/').pop() == 'intro-directory'
      ) {
        return '../intro-directory'
      } else {
        return '../directory'
      }
    },
    avgTimeYears: function() {
      return this.getStat('time_to_exit_in_years')
    },
    avgTimeDays: function() {
      return this.getStat('avg_time_in_days')
    },
    investorVision: function() {
      return this.getDesc('investor_vision')
    },
    fundingGoals: function() {
      return this.getDesc('investor_funding_goals')
    },
    additionalServices: function() {
      return this.getDesc('additional_services')
    },
    exitSought: function() {
      return this.getDesc('exit_sought')
    },
    averageInvestment: function() {
      var min_inv = this.getStat('minimum_investment') || 0
      var max_inv = this.getStat('maximum_investment')
      if (typeof min_inv !== 'undefined' && typeof max_inv !== 'undefined') {
        return `$${min_inv}-$${max_inv}`
      } else {
        return null
      }
    },
    averageIRR: function() {
      return this.getStat('avg_irr_sought')
    },
    focusGeo: function() {
      return this.getDesc('region')
    },
    managementControl: function() {
      if (this.getDesc('board_seat_binary')) {
        return 'Yes'
      } else {
        return 'No'
      }
    },
    maxInv: function() {
      return this.getStat('maximum_investment')
    },
    minInv: function() {
      return this.getStat('minimum_investment')
    },

    entrepExp: function() {
      return this.getDesc('entrepreneurial_experience')
    },
    techExp: function() {
      return this.getDesc('technical_experience')
    },

    capitalTypes: function() {
      var arr = this.selectedProvider.provider_capital_types.map(
        (capitalType) => {
          return capitalType.capital_type.name
        },
      )
      return arr.join(', ')
    },
    sectors: function() {
      if (this.selectedProvider.provider_sectors) {
        var arr = this.selectedProvider.provider_sectors
          .filter((sector) => {
            return sector.sector != null
          })
          .map((sector) => {
            return sector.sector.name
          })
        return arr.join(', ')
      } else {
        return undefined
      }
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
    format(markdown) {
      if (markdown[0] == '"' && markdown[markdown.length - 1] == '"') {
        markdown = markdown.substring(1)
        markdown = markdown.substring(0, markdown.length - 1)
      }
      return markdown.replace(/\\r\\n/g, '<br>')
    },
    getStat(code) {
      if (this.selectedProvider.provider_stats) {
        return this.selectedProvider.provider_stats
          .filter((stat) => {
            return stat.stat.code == code
          })
          .map((stat) => stat.value)[0]
      }
    },
    getDesc(code) {
      if (this.selectedProvider.provider_descriptions) {
        return this.selectedProvider.provider_descriptions
          .filter((desc) => {
            return desc.description.code == code
          })
          .map((desc) => desc.value)[0]
      }
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
