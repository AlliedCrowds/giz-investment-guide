<template>
  <div class="container">
    <div class="row">
      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          v-if="prev[groupKey] !== ''"
          class="btn big-btn left-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="prev[groupKey]"
        />
      </div>

      <div class="col-xs-12 col-md-10">
        <div class="rightSideInner cms_style">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <p v-if="imageName">
            <img
              class="aligncenter"
              :src="require(`@assets/images/${imageName}`)"
              alt
            />
          </p>
          <!-- <h5 class="text-center subTitle" v-html="marked(description)" /> -->
          <tooltip-render
            classType="text-center subTitle;"
            :text="marked(description)"
          />

          <div class="midConScroll mCustomScrollbar">
            <div
              style="font-size: 1.125rem; background-position: center; background-repeat: no-repeat; background-size: cover; margin-top: 25px; margin-left: 60px; margin-right: 60px;"
            >
              <tooltip-render
                v-if="list"
                class="minConHeight double_list"
                :text="list"
              />
              <div v-if="linkedList" class="minConHeight">
                <ul class="row">
                  <li v-for="(item, index) of linkedList" :key="index">
                    <div
                      class="col-md-5"
                      :class="{
                        'col-md-offset-1': index % 2 == 1,
                        'fixed-height': item['path'],
                      }"
                      style="padding: 10px; margin-bottom: 10px; color: white;;"
                    >
                      <img
                        class="center"
                        v-if="item['path']"
                        :src="
                          require('@assets/images/' +
                            item['path'] +
                            '-icon.svg')
                        "
                        alt
                      />
                      <div
                        class="row"
                        style="background: #307586; padding: 20px; height: 250px; position: relative;"
                      >
                        <h5 style="color: white;">{{ item['linkText'] }}</h5>
                        <tooltip-render :text="item['text']" />
                        <div style="text-align: right; margin-top: 20px;">
                          <router-link
                            v-if="item['path']"
                            :to="{ path: item['path'], params: {} }"
                            style="color: white; text-decoration: underline; position: absolute; bottom: 15px; right: 15px;"
                            >More Information</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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
      <!-- hidden-md hidden-lg hidden-xl -->
      <div class="bottom_btn text-center hidden-md hidden-lg hidden-xl">
        <router-link
          v-if="prev[groupKey] !== ''"
          class="btn big-btn back-btn"
          :to="prev[groupKey]"
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
  name: 'list-content',
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
    list: {
      type: String,
      required: false,
    },
    linkedList: {
      type: Array,
      required: false,
    },
    imageName: {
      type: String,
      required: false,
    },
    backgroundImageName: {
      type: String,
      required: false,
    },
  },
  computed: {
    backGroundImageStyleObject() {
      if (this.backgroundImageName) {
        return (
          'background-image: url("' +
          require(`@assets/images/${this.backgroundImageName}`) +
          '");'
        )
      } else {
        return ''
      }
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
  },
}
</script>

<style scoped>
.fixed-height {
  height: 450px;
}
.center {
  margin: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
.double_list {
  list-style-type: disc;
  -webkit-columns: 2;
  -moz-columns: 2;
  columns: 2;
  list-style-position: inside; //this is important addition
}
</style>
