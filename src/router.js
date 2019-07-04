/**
 * Routing
 */

// Import package dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'
// Register vue-router with vue
Vue.use(VueRouter)

// Import local dependencies
import HomePage from '@/components/pages/HomePage/HomePage.vue'
import StepPage from '@/components/pages/StepPage/StepPage.vue'
import NotFoundPage from '@/components/pages/NotFoundPage.vue'

import CapitalTypeContent from '@/components/content/CapitalType.vue'
import DirectoryContent from '@/components/content/Directory.vue'
import FundingTypeContent from '@/components/content/FundingType.vue'
import IntroContent from '@/components/content/Intro.vue'
import InvestorProfileContent from '@/components/content/InvestorProfile.vue'
import ListContent from '@/components/content/List.vue'
import LinksContent from '@/components/content/Links.vue'
import GridContent from '@/components/content/Grid.vue'
import TextContent from '@/components/content/Text.vue'
import VideoContent from '@/components/content/Video.vue'

import About from '@/components/pages/about.vue'

import store from './stores'

const stepPageRoutes = []
const investorProfileRoutes = []

const getRenderedComponentByPageType = (pageType) => {
  switch (pageType) {
    case 'capitalType':
      return CapitalTypeContent
    case 'directory':
      return DirectoryContent
    case 'fundingType':
      return FundingTypeContent
    case 'links':
      return LinksContent
    case 'intro':
      return IntroContent
    case 'grid':
      return GridContent
    case 'list':
      return ListContent
    case 'text':
      return TextContent
    case 'video':
      return VideoContent
    case 'investorProfile':
      return InvestorProfileContent
    default:
      return undefined
  }
}

const fundingGroupKey = (fundingGroupSlug) =>
  `group_${store.getters.fundingNeeds.indexOf(fundingGroupSlug) + 1}`

// Compute the routes for all combinations of country, sector, funding need and content page

for (const country of store.getters.countriesNames) {
  // Fetches the set of pages for the country
  const pages = store.getters[country]
  for (const sector of store.getters.sectorsPaths) {
    for (const fundingNeed of store.getters.fundingNeeds) {
      // Add investor page route with param
      const groupKey = fundingGroupKey(fundingNeed)

      investorProfileRoutes.push({
        path: ['', country, sector, fundingNeed, 'investor/:id'].join('/'),
        component: StepPage,
        props: {
          props: {
            groupKey,
          },
          country,
          progress: 0,
          sector,
          groupKey,
          fundingNeed,
          renderedComponent: InvestorProfileContent,
        },
      })
      // Determine the group_${n} key for the previous / next buttons
      // const groupKey = fundingGroupKey(fundingNeed)
      for (const pageType of Object.keys(pages)) {
        // Determine the type rendered component
        const renderedComponent = getRenderedComponentByPageType(pageType)
        const subPages = store.getters[country][pageType]
        for (const subPage of Object.values(subPages)) {
          const props = { groupKey, ...subPage }
          const progress = subPage.progress
          stepPageRoutes.push({
            path: ['', country, sector, fundingNeed, subPage.path].join('/'),
            component: StepPage,
            props: {
              country,
              progress,
              sector,
              fundingNeed,
              renderedComponent,
              props,
            },
          })
        }
      }
    }
  }
}

/** Route configuration */
const routes = [
  // Home
  { path: '', component: HomePage, name: 'home' },

  ...stepPageRoutes,

  // ...directoryPageRoutes,

  ...investorProfileRoutes,

  // about

  { path: '/about', component: About, name: 'about' },

  // Sample step page routes

  // prettier-ignore
  { path: '/step/intro', component: StepPage, name: 'step-intro', props: { renderedComponent: IntroContent } },
  // prettier-ignore
  { path: '/step/capital-type', component: StepPage, name: 'step-capital-types', props: { renderedComponent: CapitalTypeContent } },
  // prettier-ignore
  { path: '/step/directory', component: StepPage, name: 'step-directory', props: { renderedComponent: DirectoryContent } },
  // prettier-ignore
  { path: '/step/funding-type', component: StepPage, name: 'step-funding-types', props: { renderedComponent: FundingTypeContent } },
  // prettier-ignore
  { path: '/step/investor-profile', component: StepPage, name: 'step-investor-profile', props: { renderedComponent: InvestorProfileContent } },
  // prettier-ignore
  { path: '/step/list', component: StepPage, name: 'step-list', props: { renderedComponent: ListContent } },
  // prettier-ignore
  { path: '/step/links', component: StepPage, name: 'step-links', props: { renderedComponent: LinksContent } },
  // prettier-ignore
  { path: '/step/grid', component: StepPage, name: 'step-grid', props: { renderedComponent: GridContent } },
  // prettier-ignore
  { path: '/step/text', component: StepPage, name: 'step-text', props: { renderedComponent: TextContent } },
  // prettier-ignore
  { path: '/step/videos', component: StepPage, name: 'step-videos', props: { renderedComponent: VideoContent } },

  // Not found route
  { path: '*', component: NotFoundPage, name: 'not-found' },
]

/** Router */
const router = new VueRouter({
  // mode: 'history',
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

// onInit().then(()=>{
//   // build all routes
//   router.addRoutes(workRoutes)
// })

export default router
