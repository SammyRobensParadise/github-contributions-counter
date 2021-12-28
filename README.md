# github-contributions-counter

A simple Javascript API that will return the public Github contributions history for a user based on a universal function

![github-contributions-counter](https://i.ibb.co/tq8VpG9/github-contributions-counter-logo.png)

<br>

![version](https://img.shields.io/npm/v/github-contributions-counter?style=for-the-badge)

<br>

## A Quick Note 👀

This is a simple REST API wrapper around GitHubs API/V4 contributions graphQL api. Prior to the implementation of the V4 api this package scraped contribution data from GitHub profiles.

## Getting Started

### Install

Via `npm`

```bash
npm i github-contributions-counter
```

Via `yarn`

```bash
yarn add github-contributions-counter
```

### Demo

[Demo](https://sammy.world/github-stats)

## Usage

```jsx
import { getGithubContributions } from 'github-contributions-counter'

getGithubContributions({
  username: 'github_username',
  token: 'github_token' // secret
}).then((r) => {
  console.log(r)
})
```

## API

### Interface

| Parameter | Description | Status | Type |
| --- | --- | --- | --- |
| `username` | A valid GitHub username. Organization names are not currently supported | Required | string |
| `token` | A valid GitHub PAT with `read:usr` permissions. You can find instructions on how to generate a PAT [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). | Required | string |

## Issue Tracker

[Issues](https://github.com/SammyRobensParadise/github-contributions-counter/issues)

## Contributing

Contributions are welcomed and encouraged! Refer to [Contribution Guidelines](docs/CONTRIBUTING.md)

## Development

1. Clone

```bash
git clone git@github.com:SammyRobensParadise/github-contributions-counter.git
```

2. Install

```bash
npm install
# or
yarn install
```

3. Develop 💻

4. Build using `rollup.js`

```bash
npm run build
# or
yarn run build
```

## Info

Author: Sammy Robens-Paradise. [sammy.world](https://sammy.world)
