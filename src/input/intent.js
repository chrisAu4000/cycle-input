import {path} from 'ramda'
/**
 * Selects user-events and maps it to values.
 * @param {Object} sources - Cycle driver sources.
 * @param {DOMSource} sources.DOM - Cycle DOMDriver.
 * @returns {Object} {value$ :: String}
 */
const intent = ({DOM}) => ({
  input$: DOM.select('.cycle-input').events('input').map(path(['target', 'value']))
})

export default intent
