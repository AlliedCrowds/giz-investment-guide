<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div class="rightSideInner cms_style">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <h5 class="subTitle text-center">
            These are the investors that might be of interest. Click on them to
            get more information.<span v-if="next[groupKey] !== ''">
              Before you approach them, see the
              <router-link v-if="next[groupKey] !== ''" :to="next[groupKey]"
                >7 different steps to raise capital from investors</router-link
              >.</span
            >
          </h5>
          <div class="directoryMain midConScroll mCustomScrollbar">
            <div class="selectList selectListDropdown">
              <jquery-select
                name="capitalType"
                :options="options.filterValue"
                placeholder="Capital Type"
                @change="onCapitalTypeSelectChange"
              />
            </div>

            <div class="minConHeight">
              <div class="directoryInner">
                <div class="directoryList">
                  <h4
                    class="directoryTitle"
                    style="width:30%; margin-top:16px; float: left; display: inline-block;"
                  >
                    Investors:
                  </h4>
                  <table class="directoryTable">
                    <template
                      v-for="(number, index) of Array(
                        Math.ceil(
                          filterByCapitalType(currentResults).length / 3,
                        ),
                      )"
                    >
                      <tr>
                        <investor-profile-card
                          v-for="(investor, index) of filterByCapitalType(
                            currentResults,
                          ).slice(index * 3, (index + 1) * 3)"
                          :provider="investor"
                          :key="index"
                        />

                        <td
                          v-if="
                            (Math.ceil(
                              filterByCapitalType(currentResults).length / 3,
                            ) -
                              1 ==
                              index) &
                              (filterByCapitalType(currentResults).length % 3 !=
                                0)
                          "
                          v-for="blanks of Array(
                            3 -
                              (filterByCapitalType(currentResults).length % 3),
                          )"
                          class="blank"
                        >
                          &nbsp;
                        </td>
                      </tr>
                    </template>
                  </table>
                </div>
              </div>
            </div>
            <div class="bottom_btn text-center">
              <p>
                Is your company profile missing? Add it
                <a href="https://forms.gle/2SsbcGCJXufqStJZ9" target="_blank"
                  >here</a
                >.
              </p>

              <p style="margin-top:25px;">
                Check out the different steps you should take before you contact
                investors directly
              </p>
              <router-link
                v-if="next[groupKey] !== ''"
                class="btn big-btn next-btn"
                :to="next[groupKey]"
                >CONTINUE</router-link
              >
              <router-link
                v-if="prev[groupKey] !== ''"
                class="btn big-btn back-btn"
                :to="prev[groupKey]"
                >BACK</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import investorProfileCard from './investorProfileCard.vue'
import JQuerySelect from '@/components/elements/JQuerySelect.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'directory-content',
  components: {
    'investor-profile-card': investorProfileCard,
    'jquery-select': JQuerySelect,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    prev: {
      type: Object,
      required: true,
    },
    next: {
      type: Object,
      required: true,
    },
    groupKey: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ...mapGetters([
      'capitalTypeSelected',
      'providerTypeSelected',
      'countrySelected',
      'sectorSelected',
      'currentResults',
    ]),
    options() {
      return {
        filterValue: [
          { value: undefined, label: 'All' },
          {
            value: 'equity',
            label: 'Equity',
            title: 'ownership stake in a company',
          },
          {
            value: 'lending',
            label: 'Lending',
            title:
              'accepting capital with the promise of repaying the principal and interest',
          },
          {
            value: 'grant',
            label: 'Grant',
            title:
              'type of funding that typically does not obligate the recipient to repay the funds; usually, the money can only be used in the way agreed to prior to disbursement',
          },
        ],
      }
    },
  },
  data: function() {
    return {
      investors: this.$store.getters.investors,
    }
  },
  methods: {
    onCapitalTypeSelectChange: function(filterValue) {
      this.$store.commit('setCapitalType', filterValue)
    },
    filterByCapitalType: function(results) {
      var selectedCapitalType = this.$store.state.capitalType
      if (selectedCapitalType) {
        return results.filter((provider) => {
          if (provider.capital_type_code) {
            return (
              provider.capital_type_code.toLowerCase() == selectedCapitalType
            )
          } else {
            var capitalTypes = provider.provider_capital_types.map(
              (capitalType) => {
                return capitalType.capital_type.code.toLowerCase()
              },
            )
            return capitalTypes.includes(selectedCapitalType)
          }
        })
      } else {
        return results
      }
    },
  },
}
</script>

<style>
.selectListDropdown {
  float: right;
  width: 30%;
  margin-bottom: 16px;
  margin-top: 0px;
  position: relative;
  z-index: 3;
}

@media only screen and (max-width: 400px) {
  .selectList {
    width: 100%;
    max-width: 100%;
  }
}
table {
  overflow: scroll;
}

.blank {
  background-color: white !important;
  cursor: auto !important;
}
</style>
