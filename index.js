const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
exports.getGitHubContributionsHistory = async (username, total, byYear) => {
  let results = {
    annualContributions: '0',
  }
  if (total === 'total') {
    const fetchedURLForUser = await axios({
      method: 'get',
      url: `https://github.com/${username}`,
      responseType: 'text',
    })
    const fetchedHTML = JSDOM.fragment(fetchedURLForUser.data)
    let DateSelectors = fetchedHTML.getElementById('year-list-container').querySelectorAll('a')
    let totalContributions = []
    for (let i = 0; i < DateSelectors.length; i++) {
      const fetchedURLForUserWithDate = await axios({
        method: 'get',
        url: `https://github.com/${DateSelectors[i].href}`,
        responseType: 'text',
      })
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
        totalContributions.push(contributionsText.filter(Boolean)[0].toString())
      }
    }
    
    console.log(totalContributions)
  } else {
    const fetchedURLForUser = await axios({
      method: 'get',
      url: `https://github.com/users/${username}/contributions`,
      responseType: 'text',
    })
    const fetchedHTML = JSDOM.fragment(fetchedURLForUser.data).firstElementChild
    let contributionsText = fetchedHTML.querySelector('h2').textContent.split(' ')
    for (let i = 0; i < contributionsText.length; i++) {
      contributionsText[i] = parseInt(contributionsText[i].replace(/,/g, ''))
    }
    results = {
      annualContributions: contributionsText.filter(Boolean).toString(),
    }
  }
  return results
}
