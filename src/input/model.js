import concat from 'xstream/extra/concat'
import xs from 'xstream'
import tween from 'xstream/extra/tween'
import {curry, prop} from 'ramda'

const tweenOpts = curry((ease, duration, from, to) => {
  return {
    from,
    to,
    ease: ease || tween.linear.ease,
    duration
  }
})

const model = (props$, {input$}) => {
  const tweenOpts$ = props$
    .map(({easing, duration}) => tweenOpts(easing, duration))
  const value$ = xs.merge(
    props$.map(prop('value')),
    input$
  )
  const visible$ = props$.map(prop('visible'))
  const initialVisibility$ = visible$
    .take(1)
    .map(visible => visible === true ? 100 : 0)
  const transitionVisibility$ = visible$
    .drop(1)
    .map(visible =>
      visible === true ?
      tweenOpts$.map(opts => opts(0, 100)) :
      tweenOpts$.map(opts => opts(100, 0))
    )
    .flatten()
    .map(tween)
    .flatten()
  const transition$ = concat(initialVisibility$, transitionVisibility$)
  const placeholder$ = props$.map(prop('placeholder'))
  const className$ = props$.map(prop('className'))
  const state$ = xs.combine(value$, placeholder$, transition$, className$)
    .map(([value, placeholder, transition, className]) => ({
      value,
      placeholder,
      transition,
      className
    }))
  return state$
}

export default model
