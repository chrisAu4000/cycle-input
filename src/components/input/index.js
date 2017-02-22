import xs from 'xstream'
import {prop} from 'ramda'
import intent from './intent'
import model from './model'
import view from './view'

/**
 * Displays a Input which can be animated to disapear.
 * @param {Object} sources - Source streams.
 * @param {DOMSource} sources.DOM - DOMDriver to select elements and invoke events.
 * @param {Object} props - Contains the initial state of the HttpButton.
 * @param {Stream} props.value$ - Stream of Strings that will be the inital value of the input.
 * @param {Stream} props.placeholder$ - Stream of Strings that will be the placeholder of the input.
 * @param {Stream} props.duration$ - Transition duration.
 * @param {Stream} props.visible$ - Stream of Booleans that can be emitted to hide or show the input.
 * @param {String} [props.className] - Additional className.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
 * @returns {Object} {
 *    DOM :: vtree,
 *    value$ :: Stream
 * }
 * @example <caption>app.js</caption>
 * import {run} from '@cycle/xstream-run'
 * import {makeDOMDriver} from '@cycle/dom'
 * import xs from 'xstream'
 * import delay from 'xstream/extra/delay'
 * import tween from 'xstream/extra/tween'
 *
 * function main (sources) {
 *   const duration = 250
 *   const visibility$ // some stream that emits a boolean
 *   const props = {
 *     value$:       xs.of('Hi'),
 *     placeholder$: xs.of('Placeholder'),
 *     visible$:     xs.merge(xs.of(true), visibility$),
 *     duration$:    xs.of(duration),
 *     easing:       tween.power2.easeIn
 *   }
 *   const input = Input(sources, props)
 *   return {
 *     DOM: input.DOM
 *   }
 * }
 *
 * const drivers = {
 *   DOM: makeDOMDriver('#app')
 * }
 *
 * run(main, drivers)
 *
 * @example <caption>index.html</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 *   <meta charset="utf-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1">
 *   <link rel="icon" href="icon.ico" sizes="16x16" type="image/vnd.microsoft.icon">
 *   <link rel="stylesheet" href="/build/main.css">
 *   <title>Title</title>
 * </head>
 * <body>
 *   <div id="app"></div>
 * </body>
 * <script src="app.js"></script>
 * </html>
**/
const Input = (sources, props) => {
  const actions = intent(sources)
  const state$ = model(props, actions)
  return {
    DOM: view(state$),
    value$: state$.map(prop('value'))
  }
}

export default Input
