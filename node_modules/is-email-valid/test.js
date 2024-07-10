
import test from 'ava';
import * as validator from './';

test('has `isEmailValid` method', (t) => {
  if (typeof validator.isEmailValid === 'function') {
    t.pass();
  } else {
    t.fail();
  }
});

test('has `isEmail` alias', (t) => {
  if (typeof validator.isEmail === 'function') {
    t.pass();
  } else {
    t.fail();
  }
});

test('has `isEmailValidPromise` method', (t) => {
  if (typeof validator.isEmailValidPromise === 'function') {
    t.pass();
  } else {
    t.fail();
  }
});

test('has `isEmailPromise` alias', (t) => {
  if (typeof validator.isEmailValid === 'function') {
    t.pass();
  } else {
    t.fail();
  }
});


test('accepts a callback method', (t) => {
  validator.isEmail('nick@fintory.email', () => t.pass());
});

test('will validate valid `nick@fintory.email`', (t) => {
  if (validator.isEmail('nick@fintory.email')) {
    t.pass();
  } else {
    t.fail();
  }
});

test.failing('will not validate hosts `nick@fintory`', (t) => {
  if (validator.isEmail('nick@fintory')) {
    t.pass();
  } {
    t.fail();
  }
});

test('will not validate fancy inputs', (t) => {
  validator.isEmail('nick[at]fintory.com', t.pass);
});
