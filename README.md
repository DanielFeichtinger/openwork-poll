# OpenWork Poll

## Overview

OpenWork Poll is an app for teams to make decisions by voting on polls. It uses DAML for the backend, and React for the UI. Take a look at `daml/Main.daml` for the backend code, and `ui-js/src/pages/default` for the app.

## Prerequisites

* [Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [DAML SDK](https://docs.daml.com/getting-started/installation.html)

## Quick Start

Build the DAML project:

    daml build

Start the sandbox ledger:

    daml start --start-navigator 'no'

Generate the Typescript code:

    daml codegen ts -o daml2ts -p package.json .daml/dist/*.dar

Install the Javascript dependencies:

    yarn install

Build the UI code:

    yarn workspaces run build

Start up the development server:

    cd ui-js && yarn start

This opens a browser page pointing to `http://localhost:3000/#/login`. Note that the development server serves content via http and should not be exposed as is to a public-facing network.

Login as `Alice` (case sensitive), leaving the password blank.

## Deploying to DABL

Deploying to the hosted DAML platform project:DABL is quite simple. Log into your DABL account, create a new ledger and upload your DAML models and your UI.

To upload the DAML models, compile them into a DAR by executing

```bash
daml build -o openwork-poll.dar
```

at the root of your repository. Afterwards, open to the DABL website, select the ledger you want to deploy to, go to the "DAML" selection and upload the DAR `openwork-poll.dar` you have just created.

To upload the UI, create a ZIP file containing all your UI assets. First build all projects:

```bash
daml build
daml codegen ts .daml/dist/openwork-poll-0.0.1.dar -o daml2ts -p package.json
yarn workspaces run build
```

Then, zip either the Javascript build output:

```bash
(cd ui-js && zip -r ../openwork-poll.zip build)
```

Or the Typescript build output:

```bash
(cd ui-ts && zip -r ../openwork-poll.zip build)
```

Afterwards, select the "UI Assets" tab of your chosen ledger on the DABL website, upload the ZIP file `openwork-poll.zip` you have just created and publish it.

To see your deployed instance of create-daml-app in action, follow the "Visit site" link at the top right corner of your "UI Assets" page.
