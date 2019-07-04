<template>
  <div class="container">
    <div class="row">
      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          class="btn big-btn left-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="prev[groupKey]"
        />
      </div>

      <div class="col-xs-12 col-md-10">
        <div class="rightSideInner cms_style">
          <h3 class="secTitle bigTitle text-center">
            {{ title }}
          </h3>
          <div class="midConScroll mCustomScrollbar">
            <div class="minConHeight">
              <div class="capitalMain">
                <div class="container">
                  <div class="row">
                    <tooltip-render
                      :text="marked(description)"
                      class="capitaleft col-md-8"
                      style="background-position: center; background-repeat: no-repeat; background-size: cover;"
                    />
                    <div class="infoBox col-md-4 col-xs-12">
                      <h3 class="infoTitle">
                        ADVANTAGES
                      </h3>
                      <ul>
                        <li v-for="advantage of advantages" :key="advantage">
                          {{ advantage }}
                        </li>
                      </ul>
                      <h3 class="infoTitle">
                        DISADVANTAGES
                      </h3>
                      <ul>
                        <li
                          v-for="disadvantage of disadvantages"
                          :key="disadvantage"
                        >
                          {{ disadvantage }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-md-12 text-center hide-on-mobile"
                      style="margin-top: 20px;"
                    >
                      <img
                        class="hide-on-mobile"
                        style=" margin-top: 30px; width: 125px;"
                        :src="require('@assets/images/' + iconName)"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          class="btn big-btn right-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="next[groupKey]"
        />
      </div>
    </div>
    <div class="row">
      <div class="bottom_btn text-center hidden-lg hidden-xl hidden-md">
        <router-link class="btn big-btn back-btn" :to="prev[groupKey]"
          >BACK</router-link
        >
        <router-link class="btn big-btn next-btn" :to="next[groupKey]"
          >NEXT</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import tooltipRender from '@/components/elements/tooltipRender.vue'

export default {
  name: 'capital-type-content',
  components: {
    'tooltip-render': tooltipRender,
  },
  props: {
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    advantages: {
      type: Array,
      required: true,
    },
    disadvantages: {
      type: Array,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
  },
}
</script>
