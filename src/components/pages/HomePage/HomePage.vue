<template>
  <div id="app" class="flex flex-column width-100 min-height-100vh">
    <home-page-header />
    <div class="homePage flex-expand width-100">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <div class="homeCont">
              <h1>Guide to Investment for African Entrepreneurs!</h1>
              <p>
                Find out which investors are a good fit for your business, and
                learn how to best approach them for funding!
              </p>
              <center><span class="divider"></span></center>
              <h2>
                To begin, choose the options that best fit your tech startup:
              </h2>
              <div class="row selectList">
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div
                    v-tooltip="{
                      autoHide: false,
                      content:
                        'To contribute information for other African countries, please email us <a style=\'color:white; text-decoration:underline;\' href=mailto:make-it@giz.de>make-it@giz.de</a>',
                    }"
                  >
                    <jquery-select
                      name="country"
                      :options="options.countries"
                      placeholder="Country"
                      @change="onCountrySelectChange"
                    />
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <jquery-select
                    name="sector"
                    :disabled="
                      selected.country === null ||
                        selected.country === 'Country'
                    "
                    :options="options.sectors"
                    placeholder="Sector"
                    @change="onSectorSelectChange"
                  />
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div
                    v-if="
                      !(
                        selected.sector === null || selected.sector === 'Sector'
                      )
                    "
                  >
                    <jquery-select
                      name="stage"
                      :disabled="false"
                      :options="options.stages"
                      placeholder="Company stage"
                      @change="onStageSelectChange"
                    />
                  </div>
                  <div
                    v-if="
                      selected.sector === null || selected.sector === 'Sector'
                    "
                  >
                    <jquery-select
                      name="stage"
                      :disabled="true"
                      :options="options.stages"
                      placeholder="Company stage"
                      @change="onStageSelectChange"
                    />
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <jquery-select
                    name="need"
                    :disabled="
                      selected.stage === null ||
                        selected.stage === 'Company Stage'
                    "
                    :options="options.fundingNeeds"
                    placeholder="Funding need"
                    @change="onFundingNeedsSelectChange"
                  />
                </div>
              </div>
              <div class="bottomBtn">
                <button
                  class="btn_new"
                  @click="onSubmitButtonClick"
                  :disabled="!selectionIsValid"
                >
                  <span>Raise capital for</span> <br />
                  <span>your business</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <home-page-footer />
  </div>
</template>

<script>
import { debug } from '@/util'
import HomePageHeader from './HomePageHeader.vue'
import HomePageFooter from './HomePageFooter.vue'
import JQuerySelect from '@/components/elements/JQuerySelect.vue'

export default {
  name: 'HomePage',
  components: {
    'home-page-header': HomePageHeader,
    'home-page-footer': HomePageFooter,
    'jquery-select': JQuerySelect,
  },
  computed: {
    options() {
      return {
        countries: [
          {
            value: 'kenya',
            label: 'Kenya',
            title:
              'To contribute information for other African countries, please email us at make-it@giz.de',
          },
          {
            value: 'nigeria',
            label: 'Nigeria',
            title:
              'To contribute information for other African countries, please email us at make-it@giz.de',
          },
        ],

        sectors: [
          { value: 'eagriculture', label: 'Agritech' },
          { value: 'ehealth', label: 'eHealth' },
          { value: 'clean-energy', label: 'Clean Energy' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'fintech', label: 'Fintech' },
          { value: 'edutech', label: 'Edutech' },
          { value: 'other-tech', label: 'Other' },
        ],

        stages: [
          {
            value: 'ideation',
            label: 'Ideation',
            title: 'Pre-product and revenue, only idea',
          },
          {
            value: 'building',
            label: 'Building',
            title: 'Working on developing a product or service, hiring team',
          },
          {
            value: 'prototype',
            label: 'Prototype',
            title: 'Finished prototype in users’ hands, getting feedback',
          },
          {
            value: 'proof-of-concept',
            label: 'Proof of Concept',
            title: 'Refining product, reaching larger audience',
          },
          {
            value: 'growth',
            label: 'Growth',
            title: 'Early market success, expansion and growth',
          },
        ],

        fundingNeeds: [
          {
            value: 'up-to-10k',
            label: 'Up to $10,000',
            disabled:
              !this.selected ||
              ['ideation', 'building'].indexOf(this.selected.stage) === -1,
          },
          {
            value: 'up-to-50k',
            label: '$10,000 - $50,000',
            disabled:
              !this.selected ||
              ['ideation', 'building', 'prototype'].indexOf(
                this.selected.stage,
              ) === -1,
          },
          {
            value: 'up-to-150k',
            label: '$50,000 - $150,000',
            disabled:
              !this.selected ||
              ['building', 'prototype', 'proof-of-concept'].indexOf(
                this.selected.stage,
              ) === -1,
          },
          {
            value: 'up-to-500k',
            label: '$150,000 - $500,000',
            disabled:
              !this.selected ||
              ['prototype', 'proof-of-concept', 'growth'].indexOf(
                this.selected.stage,
              ) === -1,
          },
          {
            value: 'up-to-1m',
            label: '$500,000 - $1,000,000',
            disabled:
              !this.selected ||
              ['proofOfConcept', 'growth'].indexOf(this.selected.stage) === -1,
          },
          {
            value: 'more-than-1m',
            label: '$1,000,000 and above',
            disabled:
              !this.selected || ['growth'].indexOf(this.selected.stage) === -1,
          },
        ],
      }
    },
    selectionIsValid() {
      return (
        this.selected.country !== null &&
        this.selected.sector !== null &&
        this.selected.stage !== null &&
        this.selected.fundingNeed !== null
      )
    },
  },
  data() {
    return {
      selected: {
        country: null,
        sector: null,
        capitalType: null,
        stage: null,
        fundingNeed: null,
      },
    }
  },
  methods: {
    onSubmitButtonClick() {
      debug('submitting', this.selectionIsValid)
      if (this.selectionIsValid) {
        const { country, sector, fundingNeed, capitalType } = this.selected
        debug(this.$store)
        this.$store.commit('setState', {
          country,
          sector,
          fundingNeed,
        })
        this.$store.commit('setCapitalType', capitalType)
        const path = ['', country, sector, fundingNeed, 'intro-directory'].join(
          '/',
        )
        this.$router.push({ path })
      }
    },
    onCountrySelectChange(value) {
      this.selected.country = debug(value)
    },
    onSectorSelectChange(value) {
      this.selected.sector = debug(value)
    },
    onCapitalTypeSelectChange(value) {
      this.selected.capitalType = debug(value)
    },
    onStageSelectChange(value) {
      this.selected.stage = debug(value)
    },
    onFundingNeedsSelectChange(value) {
      this.selected.fundingNeed = debug(value)
    },
  },
}
</script>

<style scoped></style>
