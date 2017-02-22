import concat from 'xstream/extra/concat'
import xs from 'xstream'
import tween from 'xstream/extra/tween'
import {curry} from 'ramda'

const tweenOpts = curry((ease, duration, from, to) => ({
  from,
  to,
  ease: ease || tween.linear.ease,
  duration
}))

const model = ({
  value$,
  placeholder$,
  visible$,
  duration$,
  easing,
  className
  }, {input$}) => {
  const tweenOpts$ = duration$.map(duration => tweenOpts(easing, duration))
  const val$ = xs.merge(value$, input$)
  const initialVis$ = visible$
    .take(1)
    .map(visible => visible === true ? 100 : 0)
  const defaultVis$ = visible$
    .drop(1)
    .map(visible =>
      visible === true ?
      tweenOpts$.map(opts => opts(0, 100)) :
      tweenOpts$.map(opts => opts(100, 0))
    )
    .flatten()
    .debug(console.log)
    .map(tween)
    .flatten()
  const vis$ = concat(initialVis$, defaultVis$)
  const state$ = xs.combine(val$, placeholder$, vis$)
    .map(([value, placeholder, transition]) => ({
      value,
      placeholder,
      transition,
      className
    }))
  return state$
}

export default model
