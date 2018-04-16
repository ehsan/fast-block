# FastBlock: Make your browsing faster by blocking slow trackers

This is an extension based on [Ghostery](https://github.com/ghostery/ghostery-extension) which enables Ghostery's Smart Blocking feature only.

## Installation
```sh
# Install local npm packages
$ npm install
```

## Building
```sh
# Build all sources
$ npm run build.dev
```

```sh
# Build for production
$ npm run build.prod
```

```sh
# Build and watch for changes
$ npm run build.watch
```

## Enable Debugging / Logging
```javascript
// In manifest.json set
"debug": true,
"log": true,
```

## Testing and Linting
```sh
# Run unit tests
$ npm run test.unit
```

```sh
# Run linter over the ./app and ./src folders
$ npm run lint
```

```sh
# Lint a specific file
$ npm run lint.raw -- src/utils/matcher.js
```

## Build Docs
```sh
# Build JSDoc files to ./docs
$ npm run docs
```
## License
[MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/) Copyright 2018 Ghostery, Inc. All rights reserved.

See [LICENSE](LICENSE)

## Tracker Databases
The [databases](/databases) folder contains JSON skeletons to show the schema expected by the extension pattern [matcher](/src/utils/matcher.js). See the [Database README](/databases/README.md) for more information.
Ghostery's production tracker databases have been purposely excluded from this project, as they remain proprietary to Ghostery, Inc. Which leads us to this grim, yet obligatory...

**Copyright Notice**

The proprietary databases are the intellectual property of Ghostery, Inc. and are protected by copyright and other applicable laws. All rights to them are expressly reserved by Ghostery, Inc. You may not use these databases or any portion thereof for any purpose that is not expressly granted in writing by Ghostery, Inc. All inquires should be sent to [legal@ghostery.com](legal@ghostery.com).  Ghostery, Inc. retains the sole discretion in determining whether or not to grant permission to use the databases. Unauthorized use of the databases, or any portion of them, will cause irreparable harm to Ghostery, Inc. and may result in legal proceedings against you, seeking monetary damages and an injunction against you, including the payment of legal fees and costs.

[![Ghostery](https://www.ghostery.com/wp-content/themes/ghostery/images/github/ghosty_coder.jpg)](https://www.ghostery.com)
