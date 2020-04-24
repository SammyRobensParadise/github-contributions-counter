# github-contributions-counter

A simple Javascript API that will return the public github contributions history for a user based on a universal function\
<br>
![version](https://img.shields.io/npm/v/github-contributions-counter?style=for-the-badge)
## A Quick Note :)

This was not designed in affiliation with Github, Getting contribution history is not part of their API as of the creation of this package.

## Usage

```bash
npm install github-contributions-counter
```

```js
const API = require('github-contributions-counter')

API.getGitHubContributionsHistory('your_username_here').then((response) => {
  console.log(response)
})
/**
 * The expected response is an object of the following
 * (so far)
 *  response = {
 *            annualContributions: "1699"
 *           }
 * */
```

## What is in the pipeline (coming soon to a project near you)

I hope to extend the API to be able to collect additional information such as total contributions, contributions between specific dates etc...\
the future API would look something like this:

```js
getGitHubContributionsHistory(username:string, year?:string, startDate?:string, EndDate?:string)
```

### Contributing

1. Fork
2. Open Pull request with a detailed note about the changes you have made
3. It will be reviewed and (hopefully) merged!

### Contact

[Sammy Robens-Paradise | Website](https://sammyrp.com)\
[Sammy Robens-Paradise | Github](https://github.com/SammyRobensParadise)
