[safira]: https://github.com/cesium/safira
[nativemoon]: https://github.com/cesium/nativemoon
[travis]: https://travis-ci.org/cesium/opal-node
[license]: LICENSE.txt

# Opal

[![Build Status](https://travis-ci.org/cesium/opal.svg?branch=master)](https://travis-ci.org/cesium/opal)

NextJS Web App for the Badge Platform for CeSIUM's Computer Engineering Week
event.

This is a collaborative project alongside the [Safira][safira] backend platform
and the [nativemoon][nativemoon] mobile app.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Prerequisites

- [nodejs](https://nodejs.org/en/download/)

### Installing

Installing npm dependecies.

```shell
npm install
```

### Development

Starting the development server.

```shell
npm run dev
```

Format the code accordingly to common guide lines.

```shell
npm run format
```

Lint your code with eslint.

```shell
npm run lint
```

### Deployment

Builds and exports the app for production.

```shell
npm run deploy
```

### Usage

#### Sign-up

The sign-up page is intended to be accessed exclusively by users who have received
a custom sign-up link in their emails.

For development purposes, you can craft a sign-up link by following the template:

        YOUR_DOMAIN/signup?id=SAFIRA_UUID

## Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) and
[CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details on our code of conduct and
the process for submitting pull requests to us.

## License

<img src=".github/brand/cesium-DARK.svg#gh-light-mode-only" width="300">
<img src=".github/brand/cesium-LIGHT.svg#gh-dark-mode-only" width="300">

Copyright (c) 2019-2022, CeSIUM.

This project is licensed under the MIT License - see the [LICENSE][license]
file for details.
