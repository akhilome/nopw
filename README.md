# Passwordless Auth

[![CircleCI](https://circleci.com/gh/akhilome/nopw/tree/develop.svg?style=svg)](https://circleci.com/gh/akhilome/nopw/tree/develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a8a8dd60bbb17ff5d3cf/maintainability)](https://codeclimate.com/github/akhilome/nopw/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a8a8dd60bbb17ff5d3cf/test_coverage)](https://codeclimate.com/github/akhilome/nopw/test_coverage)

The general idea with this project is to build out a fullstack web app with a "passwordless" authentication system.

Technologies which would be used for buliding out the features are not clear at the moment, but the following tech is certain:

- [x] Typescript
- [x] ~~Postgres databse~~ &rarr; switched over to using **MySQL**
- [x] Node/Express
- [x] REST API
- [x] Unit/Integration Tests w/ Jest (mostly integration)
- [x] CIrcle CI &rarr; continuous deployment setup to deploy `develop` to heroku upon successful build
- [ ] Angular [or/and] React frontend(s)

~~Most of the other details are still very blurry to me, but I'll just get started first.~~

## What I Ended Up Building

I built a "passwordless auth" system alright, it is, however, still an API at this point.

## How it Works

The flow is simple:

- One signs up, then,
- the person receives an email containing an auth link
- once the link in the email is clicked, the user receives a JWT which can then be used to access protected resources

### Worth Mentioning

- Very minimal validations have been implemented (for now).
- The link sent to the mail for both login and sign up is only valid for **15 minutes**
- The mailing service being used is a free one, hence mails may get delivered to `Spam`/`Junk` or bounce entirely. Gmail accounts seem to work fine, though
- This is still work in progress
- This was done for learning.

## How Do I Make Use of It?

Since, it's still just an API, you would have to access it using a tool like Postman, Insomnia or cUrl.

### Sign Up

```
POST https://nopw-api.herokuapp.com/api/v1/users/signup
```

#### Required Data

```json
body: {
  "firstName": "<your_first_name>",
  "lastName": "<your_last_name>",
  "email": "<your_email_address>"
}
```

#### Example (with cUrl)

```sh
curl -d '{"firstName":"Kizito", "lastName":"Akhilome", "email":"kizito@akhilo.me"}' -H "Content-Type: application/json" -X POST https://nopw-api.herokuapp.com/api/v1/users/signup
```

### Log In

```
POST https://nopw-api.herokuapp.com/api/v1/users/login
```

#### Required Data

```json
body: {
  "email": "<your_email_address>"
}
```

#### Example (with cUrl)

```sh
curl -d '{"email":"kizito@akhilo.me"}' -H "Content-Type: application/json" -X POST https://nopw-api.herokuapp.com/api/v1/users/login
```

### Authenticate With Google

```
GET https://nopw-api.herokuapp.com/api/v1/auth/google
```

#### Example

Just hit `https://nopw-api.herokuapp.com/api/v1/auth/google` from your browser and authenticate with your Google Account.

### Authenticate With Github

```
GET https://nopw-api.herokuapp.com/api/v1/auth/github
```

#### Example

Just hit `https://nopw-api.herokuapp.com/api/v1/auth/github` from your browser and authenticate with your Github Account.

### View Profile

```
GET https://nopw-api.herokuapp.com/api/v1/profile
```

#### Required Data

```json
headers: {
  "Authorization": "<valid-auth-token-gotten-after-login>"
}
```

#### Example (with cUrl)

```sh
curl -H "Authorization: your_token_here" https://nopw-api.herokuapp.com/api/v1/profile
```
