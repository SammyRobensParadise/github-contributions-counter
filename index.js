const axios =require('axios')
exports.getGitHubContributionsHistory = async (username, year, startDate, EndDate) => {
  const fetchedHTMLForUser = await axios.get(`https://github.com/users/${username}/contributions`)
  console.log(fetchedHTMLForUser)
}
