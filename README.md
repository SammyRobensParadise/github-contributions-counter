# github-contributions-counter

A simple Javascript API that will return the public Github contributions history for a user based on a universal function

![githhub-contributions-counter](https://i.ibb.co/tq8VpG9/github-contributions-counter-logo.png)

<br>

![version](https://img.shields.io/npm/v/github-contributions-counter?style=for-the-badge)

<br>

## A Quick Note 👀

This was not designed in affiliation with Github, Getting contribution history is not part of their API as of the creation of this package. It essentially scrapes information from a Github profile. All within the browser!

## Getting Started

### Install

Via NPM

```bash
npm i github-contributions-counter
```

Via Yarn

```bash
yarn add github-contributions-counter
```

### Demo

[Code Sandbox](https://codesandbox.io/s/github-contributions-counter-2x0ev?file=/index.html)

## Usage

```jsx
import { getGithubContributions } from 'github-contributions-counter'
// can use a commonjs require as well
/**
 *  Can also be used with await
 */
getGithubContributions({
  username: 'github_username',
  config: { partition: 'current' }
}).then((r) => {
  console.log(r)
})
```

## API

### Interface

| Parameter | Description | Status | Type |
| --- | --- | --- | --- |
| `username` | A valid github username. Organization names are not currently supported | Required | string |
| `config` | A optional configuration object named `config` that accepts an optional `partition` type, an optional `proxy` and optional `logs`. | Optional | Object |

### Config

An optional `config` object can be added as a second parameter to customize behavior.

| Key | Description | Default Value | Type |
| --- | --- | --- | --- |
| `proxy` | A `string` proxy url. Since data is being scraped from within the browser a proxy is required to handle CORS errors. If no proxy is required a fallback proxy is used. However it is intentionally rate limited to 50 calls every 30 seconds. For this reason, the usage of a custom proxy is recommended. You can follow [this example](https://github.com/Rob--W/cors-anywhere) to quickly standup your own CORS proxy. | `null` | string |
| `partition` | A `string` partition to upon which to categorize data. - `"year"`: Group contributions by year. - `"all"`: The Sum of all contributions for that user since account creation. - `"current"`: The Current default contributions displayed on the user's Github Profile (the past 365 days). | `"all"` | string |
| `logs` | A `string` log level that can be specified for log levels. - `"error:`: Throw an `Error` whenever a failure is detected - `"warning"`: Log warnings in the console but do not throw an error - `"none"`: Do not throw any errors or log anything to the console | `"none"` | string |

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
