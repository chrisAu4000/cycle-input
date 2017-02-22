<a name="Input"></a>

## Input(sources, props) ⇒ <code>Object</code>
Displays a Input which can be animated to disapear.

**Kind**: global function  
**Returns**: <code>Object</code> - {
   DOM :: vtree,
   value$ :: Stream
}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sources | <code>Object</code> |  | Source streams. |
| sources.DOM | <code>DOMSource</code> |  | DOMDriver to select elements and invoke events. |
| props | <code>Object</code> |  | Contains the initial state of the HttpButton. |
| props.value$ | <code>Stream</code> |  | Stream of Strings that will be the inital value of the input. |
| props.placeholder$ | <code>Stream</code> |  | Stream of Strings that will be the placeholder of the input. |
| props.duration$ | <code>Stream</code> |  | Transition duration. |
| props.visible$ | <code>Stream</code> |  | Stream of Booleans that can be emitted to hide or show the input. |
| [props.className] | <code>String</code> |  | Additional className. |
| [props.easing] | <code>function</code> | <code>linear ease</code> | xstream/extra/tween easing function. |

**Example** *(app.js)*  
```js
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'

function main (sources) {
  const duration = 250
  const visibility$ // some stream that emits a boolean
  const props = {
    value$:       xs.of('Hi'),
    placeholder$: xs.of('Placeholder'),
    visible$:     xs.merge(xs.of(true), visibility$),
    duration$:    xs.of(duration),
    easing:       tween.power2.easeIn
  }
  const input = Input(sources, props)
  return {
    DOM: input.DOM
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
```
**Example** *(index.html)*  
```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="icon.ico" sizes="16x16" type="image/vnd.microsoft.icon">
  <link rel="stylesheet" href="/build/main.css">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
</body>
<script src="app.js"></script>
</html>
```
