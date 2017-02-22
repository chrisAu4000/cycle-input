import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import Input from './components/input'
import {div} from '@cycle/dom'
/**
 * Props:
 * {Stream} value$: Stream of Strings that will be displayed as button text.
 * {Stream} placeholder$: Stream of Booleans true if button is in loading state.
 * {Stream} visible: Additional className.
 * {Stream} duration$: Transition duration.
 * {Function} [easing]: xstream/extra/tween easing function.
 * {String} [className]: Additional class.
 */
function main(sources) {
  const duration = 250
  const click$ = sources.DOM.select('.collaps')
    .events('click')
    .mapTo(false)
    .fold((acc, curr) => !acc, true)
  const props = {
    value$:       xs.of('Hi'),
    placeholder$: xs.of('Placeholder'),
    visible$:     xs.merge(xs.of(true), click$),
    duration$:    xs.of(duration),
    easing:       tween.power2.easeIn,
    className:    'hello'
  }
  const input = Input(sources, props)
  return {
    DOM: input.DOM.map(input =>
       div([
         input,
         div('.collaps', {style: {
           width: '100px',
           height: '50px',
           'background-color': 'grey'
         }}, 'Collaps')
       ]))
  }
}

export default main
