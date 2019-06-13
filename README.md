# halo-client-react
A React client designed to interact with a Python-Flask API deployed to Heroku. Built using [Material-UI](https://material-ui.com/). The source code for this API can be found [here.](https://github.com/tomajohnson21/halo-server).

## Dependencies
* react
* react-router-dom
* react-text-mask
* material-ui

## Installation
If you are using [npm](https://www.npmjs.com/):

```
npm install
```

If you are using [yarn](https://yarnpkg.com/):

```
yarn install
```

## Usage

As I am currently still learning how to deal with user authentication and protected routes in React, as well as better state management, 
the UI is very finnicky, and lacks some important features, such as snackbars to alert the user of errors, or redirecting the user upon successful registration or JWT Expiration. 

### Registration

When registering, check the console logs for whether the user was created successfully or not. 

### Contact Page

In this page, the users may add contacts to a simple contact book. Upon adding them, they will immediately appear in the table. Due to the fact that authorization and protected routes are still very simplistic, the token may expire, and the client will not give any indication. Simply check the logs, and if given a **401 Authorization** error, simply click the log out button in the top left, refresh your page, and sign in once again.
