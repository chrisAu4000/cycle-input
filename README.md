<a name="Input"></a>

## Input(sources, props) ⇒ <code>Object</code>
Displays a Input which can be animated to disapear.
Installation:
```bash
$ npm install --save git+https://github.com/chrisAu4000/cycle-input.git
```

**Kind**: global function  
**Returns**: <code>Object</code> - {
   DOM :: vtree,
   value$ :: Stream
}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sources | <code>Object</code> |  | Source streams. |
| sources.DOM | <code>DOMSource</code> |  | DOMDriver to select elements and invoke events. |
| props | <code>Stream</code> |  | Contains the initial state of the HttpButton. |
| props.value$ | <code>String</code> |  | Stream of Strings that will be the inital value of the input. |
| props.placeholder$ | <code>String</code> |  | Stream of Strings that will be the placeholder of the input. |
| props.duration$ | <code>Number</code> |  | Transition duration in ms. |
| props.visible$ | <code>Boolean</code> |  | Stream of Booleans that can be emitted to hide or show the input. |
| [props.className] | <code>String</code> |  | Additional className. |
| [props.easing] | <code>function</code> | <code>linear ease</code> | xstream/extra/tween easing function. |

**Example** *(app.js)*  
```js
import {run} from '@cycle/xstream-run'
import {makeDOMDriver, div} from '@cycle/dom'
import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'

function main (sources) {
  const props = {
    value:       'Value',
    placeholder: 'Placeholder',
    visible:     true,
    duration:    250,
    easing:      tween.power2.easeIn
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
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
```
