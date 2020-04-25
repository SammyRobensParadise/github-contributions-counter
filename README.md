# github-contributions-counter

A simple Javascript API that will return the public Github contributions history for a user based on a universal function\
<br>
![version](https://img.shields.io/npm/v/github-contributions-counter?style=for-the-badge)

#### A Quick Note 👀

This was not designed in affiliation with Github, Getting contribution history is not part of their API as of the creation of this package.

## Getting Started
### Install via [npm github-contributions-counter](https://www.npmjs.com/package/github-contributions-counter)
```bash
npm install github-contributions-counter
```
### Usage
```js
// normal js require
const API = require('github-contributions-counter')

API.getGitHubContributionsHistory('your_username_here').then((response) => {
  console.log(response)
})
/**
 * The expected response is an array of objects of the following:
 *
 * response = [{ annualContributions: "1699" }]
 *
 * */

API.getGitHubContributionsHistory('your_username_here', 'total').then((response) => {
  console.log(response)
})
/**
 * The expected response is an array of objects of the following:
 *
 * response = [{ totalContributions: '2027' }]
 *
 * */

API.getGitHubContributionsHistory('your_username_here', 'total', 'byYear').then((response) => {
  console.log(response)
})
/**
 * The expected response is an array of objects of the following:
 *
 * response = [
 *       { contributions: '768', year: '2020' },
 *       { contributions: '1090', year: '2019' },
 *        { contributions: '167', year: '2018' },
 *       { contributions: '2', year: '2017' }
 *      ]
 *
 * */
```
Show off your contributions 🤟💻🦾
## API

```js
getGitHubContributionsHistory(username:string, total?:string, byYear?:string)
```
### Issues
Given that this API is scraping Github webpages for the desired data, it is a) not the fastest; and b) dependent on the DOM nodes for Github user profiles not changing to a large extent. If it stops working, open an issue on the Github and i'll fit it asap! :)
### Contributing

1. Fork
2. Open Pull request with a detailed note about the changes you have made
3. It will be reviewed and (hopefully) merged!

### Contact

[Sammy Robens-Paradise | Website](https://sammyrp.com)\
[Sammy Robens-Paradise | Github](https://github.com/SammyRobensParadise)
