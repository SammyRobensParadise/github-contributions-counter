/**
 * Sammy Robens-Paradise
 * Licence: MIT
 */

// imports
const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

/**
 * @readonly
 * @param {username} string
 * @param {total} string
 * @param {byYear} string
 * @returns {object}
 */
exports.getGitHubContributionsHistory = async (username, total, byYear) => {
  /**
   * type checking to ensure that
   * the url provided is a string
   */
  if (typeof username != 'string') {
    return {
      error: `invalid args provided. expected username: string, total: string, byYear: string,
         but got:
        username: ${typeof username},
        total: ${typeof total},
        byYear: ${typeof byYear}
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
  if (total === 'total' || byYear === 'byYear') {
    let fetchedURLForUser
    try {
      fetchedURLForUser = await axios({
        method: 'get',
        url: `https://github.com/${username}`,
        responseType: 'text',
      })
    } catch (e) {
      return [{ error: e }]
    }
    /**
     * Create virtual DOM with JSDOM to parse HTML
     */
    const fetchedHTML = JSDOM.fragment(fetchedURLForUser.data)
    let DateSelectors = fetchedHTML.querySelectorAll('a')
    if (DateSelectors === null) {
      return [{ error: 'unable to process request' }]
    }
    let totalContributions = []
    for (let i = 0; i < DateSelectors.length; i++) {
      let fetchedURLForUserWithDate
      if (DateSelectors[i].id.includes('year-link')) {
        try {
          fetchedURLForUserWithDate = await axios({
            method: 'get',
            url: `https://github.com/${DateSelectors[i].href}`,
            responseType: 'text',
          })
        } catch (e) {
          return [{ error: e }]
        }
        let fetchedURLwithDate = JSDOM.fragment(fetchedURLForUserWithDate.data)
        let contributionsSeletor = fetchedURLwithDate.querySelectorAll('h2')
        let contributionsText
        contributionsSeletor.forEach((item) => {
          if (item.textContent.includes('contributions')) {
            contributionsText = item.textContent.split(' ')
          }
        })
        for (let i = 0; i < contributionsText.length; i++) {
          contributionsText[i] = parseInt(contributionsText[i].replace(/,/g, ''))
        }
        if (byYear == 'byYear') {
          totalContributions.push({
            contributions: contributionsText.filter(Boolean)[0].toString(),
            year: contributionsText.filter(Boolean)[1].toString(),
          })
        } else {
          totalContributions.push(contributionsText.filter(Boolean)[0])
        }
      }
    }
    if (total === 'total' && byYear != 'byYear') {
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
        url: `https://github.com/users/${username}/contributions`,
        responseType: 'text',
      })
    } catch (e) {
      return [{ error: e }]
    }
    /**
     * Create virtual DOM with JSDOM to parse HTML
     */
    const fetchedHTML = JSDOM.fragment(fetchedURLForUser.data).firstElementChild
    let contributionsText = fetchedHTML.querySelector('h2').textContent.split(' ')
    for (let i = 0; i < contributionsText.length; i++) {
      contributionsText[i] = parseInt(contributionsText[i].replace(/,/g, ''))
    }
    results = {
      annualContributions: contributionsText.filter(Boolean).toString(),
    }
  }
  return [results]
}
