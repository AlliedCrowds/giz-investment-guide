<template>
  <div class="leftsideBar">
    <div class="progressSec">
      <div class="progressInner">
        <h2
          class="progressTitle"
          style="font-size:1.4rem"
          @click="toggleSubsections"
        >
          7 Steps to Raise Capital From Investors
        </h2>
      </div>
    </div>
    <nav class="navigation">
      <ul>
        <div v-for="section in routes">
          <li
            v-bind:class="[
              progress == section.section.progress ||
              onNavigateFromDirectoryToInvestor(section)
                ? 'sectionSelected'
                : '',
            ]"
          >
            <router-link
              :to="link(section.section.path)"
              :title="section.section.text"
            >
              <span
                v-bind:class="[
                  progress == section.section.progress ||
                  onNavigateFromDirectoryToInvestor(section)
                    ? 'navIconSelected'
                    : 'navIcon',
                ]"
              >
                <div v-if="section">
                  <img :src="getImg(section.section.img)" alt />
                </div>
              </span>
              <span
                v-bind:class="[
                  progress == section.section.progress ||
                  onNavigateFromDirectoryToInvestor(section)
                    ? 'navTitleSelected'
                    : 'navTitle',
                ]"
                @click="
                  progress == section.section.progress ||
                  onNavigateFromDirectoryToInvestor(section)
                    ? toggleSubsections()
                    : (hideSubsections = false)
                "
                v-html="section.section.text"
              >
              </span>
            </router-link>
          </li>
          <li
            v-show="progress == section.section.progress && !hideSubsections"
            v-for="subsection in section.subsections"
            v-bind:class="[
              currentRoute == subsection.path ? 'sectionSelected' : '',
            ]"
            style="background: lightblue;"
          >
            <router-link
              :to="link(subsection.path)"
              title="Investor Types"
              style="padding-left:85px; padding-right: 0px;"
            >
              <span
                v-bind:class="[
                  currentRoute == subsection.path
                    ? 'navTitleSelected'
                    : 'navTitle',
                ]"
              >
                {{ subsection.text }}
              </span>
            </router-link>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      hideSubsections: false,
    }
  },
  name: 'step-page-sidebar',
  computed: {
    ...mapGetters(['routeObject']),
    countryName() {
      const c = this.country
      return c ? c.slice(0, 1).toUpperCase() + c.slice(1) + "'s" : ''
    },
    routes() {
      return this.routeObject(this.props.groupKey)
    },
    currentRoute() {
      return this.$store.state.route.path.split('/').pop()
    },
  },
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
    props: {
      type: Object,
    },
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    toggleSubsections() {
      this.hideSubsections = !this.hideSubsections
    },
    link(page) {
      return ['', this.country, this.sector, this.fundingNeed, page].join('/')
    },
    onNavigateFromDirectoryToInvestor(section) {
      return (
        this.$store.state.route.from.path.split('/').pop() == 'directory' &&
        this.$store.state.route.path.split('/').includes('investor') &&
        section.section.path == 'directory'
      )
    },
    countrySceneLink() {
      return this.link(
        this.country === 'kenya'
          ? 'kenya-scene-intro'
          : this.country === 'nigeria'
          ? 'nigeria-scene-intro'
          : '',
      )
    },
    getImg(url) {
      return require('@assets/images/' + url)
    },
  },
}
</script>
