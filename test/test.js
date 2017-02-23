import xs from 'xstream'
import streamAdapter from '@cycle/xstream-adapter'
import {mockDOMSource} from '@cycle/dom'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import fromDiagram from 'xstream/extra/fromDiagram'
import {assert} from 'chai'
import {prop} from 'ramda'
import intent from '../src/input/intent'
import model from '../src/input/model'

const assertion = (stream, fn, expected, done) => stream.addListener({
    next: x => {
      try {
        fn(x, expected)
        done && done()
      } catch(error) {
        done && done(error)
      }
    },
    error: err => done ? done(err) : console.error(err),
    complete: () => {}
  })
const testInput = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
describe('cycle-input', _ => {
  describe('intent', _ => {
    const domSource = mockDOMSource(streamAdapter, {
      '.cycle-input': {
        'input': xs.fromArray(testInput.map(val => ({ target: { value: val } })))
      }
    })
    const actions = intent({DOM: domSource})
    it('should return a stream of "h"', function(done) {
      assertion(actions.input$.take(1), assert.strictEqual, 'h', done)
    })
    it('should return a stream of "e"', function(done) {
      assertion(actions.input$.drop(1).take(1), assert.strictEqual, 'e', done)
    })
    it('should return a stream of "l"', function(done) {
      assertion(actions.input$.drop(2).take(1), assert.strictEqual, 'l', done)
    })
    it('should return a stream of "l"', function(done) {
      assertion(actions.input$.drop(3).take(1), assert.strictEqual, 'l', done)
    })
    it('should return a stream of "o"', function(done) {
      assertion(actions.input$.drop(4).take(1), assert.strictEqual, 'o', done)
    })
    it('should return a stream of " "', function(done) {
      assertion(actions.input$.drop(5).take(1), assert.strictEqual, ' ', done)
    })
    it('should return a stream of "w"', function(done) {
      assertion(actions.input$.drop(6).take(1), assert.strictEqual, 'w', done)
    })
    it('should return a stream of "o"', function(done) {
      assertion(actions.input$.drop(7).take(1), assert.strictEqual, 'o', done)
    })
    it('should return a stream of "r"', function(done) {
      assertion(actions.input$.drop(8).take(1), assert.strictEqual, 'r', done)
    })
    it('should return a stream of "l"', function(done) {
      assertion(actions.input$.drop(9).take(1), assert.strictEqual, 'l', done)
    })
    it('should return a stream of "d"', function(done) {
      assertion(actions.input$.drop(10).take(1), assert.strictEqual, 'd', done)
    })
  })
  describe('model', _ => {
    const props = {
      value:       'test',
      placeholder: 'Placeholder',
      visible:     true,
      duration:    1000,
      className:   'hello',
      easing:      tween.linear.ease
    }
    const props$ = xs.of(props)
    const state$ = model(props$, {input$: xs.empty()})
    it('should return the initial value', function(done) {
      const test$ = state$.map(prop('value'))
      assertion(test$, assert.strictEqual, 'test', done)
    })
    it('should return the Placeholder', function(done) {
      const test$ = state$.map(prop('placeholder'))
      assertion(test$, assert.strictEqual, 'Placeholder', done)
    })
    it('should return "hello"', function(done) {
      const test$ = state$.map(prop('className'))
      assertion(test$, assert.strictEqual, 'hello', done)
    })
    it('should return transition: 100', function(done) {
      const test$ = state$.map(prop('transition'))
      assertion(test$, assert.strictEqual, 100, done)
    })
  })
})
