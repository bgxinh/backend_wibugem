# is-email-valid

[![Build status](https://travis-ci.org/fintory/is-email-valid.svg?branch=master)](https://travis-ci.org/fintory/is-email-valid)

## Why another email validator?

We at Fintory often work out sign up processes for companies we work with. In the progress of the conception of the sign up processes, we often need an email address from the user that is signing up. When validating and showing an error message, it is mandatory to have a look at what should be allowed and what not. We wanted to have a basic foundation with a simple regular expression, that validates the most important things of an email address. A non-whitespace string before and after the `@` and also one after the `.`. This is what this package is about.

## Usage

The use is really simple, just install the package via `npm` or `yarn` and you will be able to do something like this:

```js
import { isEmailValid } from 'is-email-valid'; // Please be aware of the alias `isEmail`

isEmail('nick@fintory.email'); // Returns `true`
```

It is also possible to use a callback or a promise with the library:

```js
import { isEmailValidPromise } from 'is-email-valid'; // Please be aware of the alias `isEmailPromise`

isEmail('nick@fintory.email') // Returns a promise which resolves in a boolean
  .then(valid => console.log(valid)); // Will `console.log` a true
```

## API

### isEmailValid(email[, callback]) => Boolean
### isEmail(email[, callback]) => Boolean
### isEmailValidPromise(email) => Promise(Boolean)
### isEmailPromise(email) => Promise(Boolean)

## License [(view file)](LICENSE)

```
MIT License

Copyright (c) 2017 Fintory (A venture by Kreativgebiet)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
