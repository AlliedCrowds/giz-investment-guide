<template>
  <div id="app">
    <step-page-header />
    <section class="sectionMain">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="rightSideInner text-center">
              <h1
                style="font-size: 2.25rem; margin-top: 20px; margin-bottom: 55px; font-weight: 500; font-family: 'Poppins', sans-serif; color: black;"
              >
                About the Make-IT Entrepreneurs’ Guide to Investment
              </h1>
              <div class="midConScroll mCustomScrollbar">
                <div>
                  <p>
                    The aim of this guide is to help tech entrepreneurs in Kenya
                    and Nigeria learn about investors that are active in their
                    sector. The interactive guide is based on the Entrepreneurs’
                    Guide to Investment in Nigeria and the Entrepreneurs’ Guide
                    to Investment in Kenya, which were created by GIZ’s Make-IT
                    in Africa Initiative.
                  </p>
                  <p>
                    The interactive guide was designed by creative republic; it
                    was built by AlliedCrowds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { debug } from '@/util'
import StepPageHeader from './StepPage/StepPageHeader.vue'
import HomePageFooter from './HomePage/HomePageFooter.vue'

export default {
  name: 'about-page',
  components: {
    'step-page-header': StepPageHeader,
    'home-page-footer': HomePageFooter,
  },
  mounted() {
    debug(this)
  },
}
</script>
