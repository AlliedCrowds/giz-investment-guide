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
                    />
                    <div class="infoBox col-md-4 col-xs-12">
                      <h3 class="infoTitle">
                        INFORMATION
                      </h3>
                      <ul>
                        <li>
                          <strong>Funding instrument:</strong>
                          <tooltip-render :text="funding_instrument" />
                        </li>
                        <li>
                          <strong>Amounts:</strong>
                          <div v-html="amounts"></div>
                        </li>
                        <li><strong>Benefits:</strong> {{ benefits }}</li>
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
                        style="width: 190px;"
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
      <div class="bottom_btn text-center hidden-md hidden-lg hidden-xl">
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
  name: 'funding-type-content',
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
    funding_instrument: {
      type: String,
      required: true,
    },
    amounts: {
      type: String,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    backgroundImageName: {
      type: String,
      required: false,
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
  },
}
</script>
