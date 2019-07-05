/**
 * Main application store
 */

/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import kenyaData from './kenya-data'
import nigeriaData from './nigeria-data'
import sharedData from './shared-data'

//
// Data
//

import install from '@alliedcrowds/capital-finder-vuex'

const cfStore = install({
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  resultsPerPage: 50,
  maxResults: 10000000,
})

// Plugin that mocks the return countries filtered by token access
const cfPlugin = (cfStore) => {
  const maketItCountries = [
    {
      name: 'Kenya',
      code: 'KE',
      path: 'kenya',
    },
    {
      name: 'Nigeria',
      code: 'NG',
      path: 'nigeria',
    },
  ]

  const sectorsMap = {
    eagriculture: {
      name: 'Agritech',
      code: '976f8e58-a99e-4422-912d-d7acbe359f2d',
    },
    ehealth: {
      name: 'eHealth',
      code: '7658f8aa-5023-4a34-b135-8a048546d93f',
    },
    'clean-energy': {
      name: 'Clean Energy',
      code: 'ee846082-babc-4ef7-932f-182132b1cfa2',
    },
    manufacturing: {
      name: 'Manufacturing',
      code: '3fd8830d-4735-48e5-8bf8-58b4d445cd3c',
    },
    fintech: {
      name: 'Fintech',
      code: 'c630d7ee-d677-48dc-b06c-87e60999930c',
    },
    edutech: {
      name: 'Edutech',
      code: '348a986a-e5ee-4d97-84fd-475543cc2550',
    },
    'other-tech': {
      name: 'Other Technology',
      code: '55b414ee-a944-46e7-bc88-220a76b9d584',
    },
  }

  cfStore.subscribe((mutation, state) => {
    if (mutation.type == 'setState') {
      var countryParam = maketItCountries.filter(
        (country) => country.path == mutation.payload.country,
      )
      store.commit('setCountriesParam', ...countryParam)
      store.commit('setSectorsParam', sectorsMap[mutation.payload.sector])

      // if (mutation.payload.capitalType) {
      //   store.commit('setCapitalTypesParam', {
      //     code: mutation.payload.capitalType,
      //   })
      // }
    }
  })
}

const store = new Vuex.Store({
  state: {
    country: null,
    sector: null,
    fundingNeed: null,
    capitalType: null,
    progress: 0,
  },
  modules: {
    cfStore: cfStore,
  },
  getters: {
    kenya() {
      return { ...kenyaData, ...sharedData }
    },
    nigeria() {
      return { ...nigeriaData, ...sharedData }
    },
    progress(state) {
      return state.progress
    },
    isValid(state) {
      return (
        state.country !== null &&
        state.sector !== null &&
        state.fundingNeed !== null
      )
    },
    countriesNames(state, getters, rootState, rootGetters) {
      return ['nigeria', 'kenya']
    },
    sectorsPaths() {
      return [
        'eagriculture',
        'ehealth',
        'clean-energy',
        'manufacturing',
        'fintech',
        'edutech',
        'other-tech',
      ]
    },
    stages() {
      return ['ideation', 'building', 'prototype', 'proof-of-concept', 'growth']
    },
    fundingNeeds() {
      return [
        'up-to-10k',
        'up-to-50k',
        'up-to-150k',
        'up-to-500k',
        'up-to-1m',
        'more-than-1m',
      ]
    },
    routeObject: (state, getters) => (groupKey) => {
      if (state.country == null) return null
      var pageTypes = getters[state.country]
      var pages = []
      Object.keys(pageTypes).map(function(key1, index) {
        Object.keys(pageTypes[key1]).map(function(key2, index) {
          pages[pageTypes[key1][key2]['path']] = {
            ...pageTypes[key1][key2]['next'],
            title: pageTypes[key1][key2]['title'],
            currentPath: pageTypes[key1][key2]['path'],
          }
        })
      })

      return recursiveNavBuild(
        groupKey,
        pages['funding-instruments-intro'],
        pages,
        [],
      )
    },
  },
  mutations: {
    setState(state, { country, sector, fundingNeed, capitalType }) {
      state.country = country
      state.sector = sector
      state.fundingNeed = fundingNeed
      state.capitalType = capitalType
    },
    setCapitalType(state, capitalType) {
      state.capitalType = capitalType
    },
  },
  plugins: [cfPlugin],
})

function recursiveNavBuild(groupKey, currentPage, pages, routeList) {
  var nextPath = currentPage[groupKey]

  var nameMap = {
    'funding-instruments-intro': {
      text: '1. Understand Funding Instruments',
      img: 'nav-01.svg',
    },
    'investor-types-intro': {
      text: '2. Learn About Investor Types',
      img: 'nav-02.svg',
    },
    'startup-101-intro': {
      text: '3. Grasp what Investors Look For',
      img: 'nav-03.svg',
    },
    'pitch-deck-intro': {
      text: '4. Get Your Pitch Deck Ready',
      img: 'nav-05.svg',
    },
    valuation: {
      text: '5. Find Out How Much Your Company Is Worth',
      img: 'nav-08.svg',
    },
    'kenya-scene-intro': {
      text: '6. Listen to Tips from Successful Local Entrepreneurs',
      img: 'nav-04.svg',
    },
    'nigeria-scene-intro': {
      text: '6. Listen to Tips from Successful Local Entrepreneurs',
      img: 'nav-04.svg',
    },
    directory: {
      text: '7. Contact Investors',
      img: 'nav-07.svg',
    },
  }

  var adaptations = {
    'Legal Considerations for Start-ups': 'Legal Considerations',
    'Intellectual Property Protection': 'Protecting Your IP',
    'Local vs. International Investors': 'Local or Foreign Funders',
    'Key to Raising Money Successfully: Telling Your Story':
      'How to Tell Your Story',
    'Entrepreneurship Programs in Nigeria': 'University Programs',
    'Tips on Negotiating With Investors': 'Tips on Negotiating',
    'Putting Together a Board of Directors': 'Putting Together a Board',
    'Start-ups, Your Valuation Matters!': 'Valuation Matters!',
    'DCF (Discounted Cash Flow) Model': 'DCF Model',
    'What to Bring to a Pitch Meeting': 'What to Bring to a Pitch',
  }

  const adaptTitle = (name) =>
    Object.keys(adaptations).includes(name) ? adaptations[name] : name
  // const adaptTitle = (name) => name

  if (
    [
      'directory',
      'funding-instruments-intro',
      'investor-types-intro',
      'startup-101-intro',
      'pitch-deck-intro',
      'valuation',
      'kenya-scene-intro',
      'nigeria-scene-intro',
      'resources',
    ].includes(currentPage['currentPath'])
  ) {
    routeList.push({
      section: {
        path: currentPage['currentPath'],
        progress: routeList.length + 1,
        text: nameMap[currentPage['currentPath']]['text'],
        img: nameMap[currentPage['currentPath']]['img'],
      },
      subsections: [],
    })
  } else {
    var currentSections = routeList[routeList.length - 1]
    currentSections['subsections'].push({
      path: currentPage['currentPath'],
      progress: currentSections['subsections'].length,
      text: adaptTitle(currentPage['title']),
    })
  }

  if (currentPage[groupKey] == '') {
    return routeList
  } else {
    return recursiveNavBuild(groupKey, pages[nextPath], pages, routeList)
  }
}

export default store
