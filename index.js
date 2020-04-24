const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
exports.getGitHubContributionsHistory = async (username, year, startDate, EndDate) => {
  const fetchedURLForUser = await axios({
    method: 'get',
    url: `https://github.com/users/${username}/contributions`,
    responseType: 'text',
  })
  const fetchedHTML = JSDOM.fragment(fetchedURLForUser.data).firstElementChild
  let contrubutionsText = fetchedHTML.querySelector('h2').textContent.split(' ')
  for (let i = 0; i < contrubutionsText.length; i++) {
    contrubutionsText[i] = parseInt(contrubutionsText[i].replace(/,/g, ''))
  }
  const results = {
    annualContributions: contrubutionsText.filter(Boolean).toString(),
  }
  return results
}
