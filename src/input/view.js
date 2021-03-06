import {input, div} from '@cycle/dom'

const view = (state$) => {
  return state$.map(({value, placeholder, transition, className}) => {
    const cName = className ? '.' + className : ''
    return div('.cycle-input-wrapper', [
      input('.cycle-input' + cName, {
        attrs: {
          type: 'text',
          placeholder: placeholder,
          value: value,
        },
        style: {
          height: transition + '%',
          width: transition + '%',
          opacity: transition < 30 ? transition / 30 : 1,
        },
      })
    ])
  })
}
export default view
