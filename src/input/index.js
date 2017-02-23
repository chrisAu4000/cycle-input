import xs from 'xstream'
import {prop} from 'ramda'
import intent from './intent'
import model from './model'
import view from './view'

/**
 * Displays a Input which can be animated to disapear.
 * Installation:
 * ```bash
 * $ npm install --save git+https://github.com/chrisAu4000/cycle-input.git
 * ```
 * @kind function
 * @param {Object} sources - Source streams.
 * @param {DOMSource} sources.DOM - DOMDriver to select elements and invoke events.
 * @param {Stream} props - Contains the initial state of the HttpButton.
 * @param {String} props.value$ - Stream of Strings that will be the inital value of the input.
 * @param {String} props.placeholder$ - Stream of Strings that will be the placeholder of the input.
 * @param {Number} props.duration$ - Transition duration in ms.
 * @param {Boolean} props.visible$ - Stream of Booleans that can be emitted to hide or show the input.
 * @param {String} [props.className] - Additional className.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
 * @returns {Object} {
 *    DOM :: vtree,
 *    value$ :: Stream
 * }
 * @example <caption>app.js</caption>
 * import {run} from '@cycle/xstream-run'
 * import {makeDOMDriver, div} from '@cycle/dom'
 * import xs from 'xstream'
 * import delay from 'xstream/extra/delay'
 * import tween from 'xstream/extra/tween'
 *
 * function main (sources) {
 *   const props = {
 *     value:       'Value',
 *     placeholder: 'Placeholder',
 *     visible:     true,
 *     duration:    250,
 *     easing:      tween.power2.easeIn
 *   }
 *   const props$ = sources.DOM.select('.collaps')
 *    .events('click')
 *    .mapTo(false)
 *    .fold((acc, curr) => !acc, true)
 *    .map(visible => Object.assign({}, props, {
 *     visible,
 *      easing: visible ? tween.power2.easeOut : tween.power2.easeIn
 *    }))
 *   const input = Input(sources, props$)
 *   return {
 *     DOM: input.DOM.map(input =>
 *       div([
 *         input,
 *         div('.collaps', {style: {
 *           width: '100px',
 *           height: '50px',
 *           'background-color': 'grey'
 *         }}, 'Collaps')
 *       ])
 *     )
 *   }
 * }
 *
 * const drivers = {
 *   DOM: makeDOMDriver('#app')
 * }
 *
 * run(main, drivers)
**/
const Input = (sources, props$) => {
  const actions = intent(sources)
  const state$ = model(props$, actions)
  return {
    DOM: view(state$),
    value$: state$.map(prop('value'))
  }
}

export default Input
