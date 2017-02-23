import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import Input from '../src/input'
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

  const props = {
    value:       'Hi',
    placeholder: 'Placeholder',
    visible:     true,
    duration:    duration,
    easing:      tween.power2.easeIn,
    className:   'hello'
  }
  const props$ = sources.DOM.select('.collaps')
    .events('click')
    .mapTo(false)
    .fold((acc, curr) => !acc, true)
    .map(visible => Object.assign({}, props, {
      visible,
      easing: visible ? tween.power2.easeOut : tween.power2.easeIn
    }))

  const input = Input(sources, props$)
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
