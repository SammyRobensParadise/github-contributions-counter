/**
 * Sammy Robens-Paradise
 * Licence: MIT
 */

// imports
const axios = require('axios')
const cheerio = require('cheerio')

/**
 * @readonly
 * @param {config:{total, byYear, proxy}}
 * @returns {object}
 */
exports.getGitHubContributionsHistory = async (username, config) => {
  let useProxy = false
  if (config.proxy && typeof config.proxy === 'boolean') {
    useProxy = 'https://cors-anywhere.herokuapp.com/'
  } else if (config.proxy) {
    useProxy = config.proxy
  } else {
    useProxy = false
  }
  /**
   * type checking to ensure that
   * the url provided is a string
   */
  if (typeof username != 'string') {
    return {
      error: `invalid args provided. expected username: string, total: string, byYear: string,\
         but got: \
        username: ${typeof username},\
        total: ${typeof config.total},\
        byYear: ${typeof config.byYear}
          `,
    }
  }
  /**
   * set initial results
   */
  let results = {
    annualContributions: '0',
  }
  /**
   * if the user wants either the total or total by year
   */
  if (config.total === 'total' || config.byYear === 'byYear') {
    let fetchedURLForUser
    try {
      fetchedURLForUser = await axios({
        method: 'get',
        url: useProxy
          ? `${useProxy}https://github.com/${username}`
          : `https://github.com/${username}`,
        responseType: 'text',
      })
    } catch (e) {
      return [{ error: e }]
    }
    /**
     * Create virtual DOM with JSDOM to parse HTML
     */
    const $ = cheerio.load(fetchedURLForUser.data)
    let DateSelectors = $("a[id*='year-link']")
    if (DateSelectors === null) {
      return [{ error: 'unable to process request' }]
    }
    let totalContributions = []
    for (let i = 0; i < DateSelectors.length; i++) {
      let fetchedURLForUserWithDate
      try {
        fetchedURLForUserWithDate = await axios({
          method: 'get',
          url: useProxy
            ? `${useProxy}https://github.com/${DateSelectors[i].attribs.href}`
            : `https://github.com/${DateSelectors[i].attribs.href}`,
          responseType: 'text',
        })
      } catch (e) {
        return [{ error: e }]
      }
      const $fetchedURLwithDate = cheerio.load(fetchedURLForUserWithDate.data)
      let contributionsSeletor = $fetchedURLwithDate('h2:contains(contributions)').text()
      let contributionsText = contributionsSeletor.split(' ')
      for (let i = 0; i < contributionsText.length; i++) {
        contributionsText[i] = parseInt(contributionsText[i].replace(/,/g, ''))
      }
      if (config.byYear == 'byYear') {
        totalContributions.push({
          contributions: contributionsText.filter(Boolean)[0].toString(),
          year: contributionsText.filter(Boolean)[1].toString(),
        })
      } else {
        totalContributions.push(contributionsText.filter(Boolean)[0])
      }
    }
    if (config.total === 'total' && config.byYear != 'byYear') {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      /**
       * if just looking for the year return total contributions by year as
       * an object
       */
      return [{ totalContributions: totalContributions.reduce(reducer).toString() }]
    } else {
      /**
       * return an object of contributions by year
       */
      return totalContributions
    }
  } else {
    /**
     * Just fetch the total contributions
     * for a give user
     */
    let fetchedURLForUser
    try {
      fetchedURLForUser = await axios({
        method: 'get',
        url: useProxy
          ? `${useProxy}https://github.com/users/${username}/contributions`
          : `https://github.com/users/${username}/contributions`,
        responseType: 'text',
      })
    } catch (e) {
      return [{ error: e }]
    }
    /**
     * Create virtual DOM with JSDOM to parse HTML
     */
    const $fetchedHTML = cheerio.load(fetchedURLForUser.data)
    let contributionsText = $fetchedHTML('h2:contains(contributions)').text().split(' ')
    for (let i = 0; i < contributionsText.length; i++) {
      contributionsText[i] = parseInt(contributionsText[i].replace(/,/g, ''))
    }
    results = {
      annualContributions: contributionsText.filter(Boolean).toString(),
    }
  }
  return [results]
}
