const IS_BROWSER_FROM_GLOBAL_CONFIG = true

function requireNodeOrBrowser(valueForNode, valueForBrowser) {
  if (IS_BROWSER_FROM_GLOBAL_CONFIG) {
    return valueForBrowser
  } else {
    return valueForNode
  }
}

const K = requireNodeOrBrowser('@kmu/kcore', 'dupa')

console.log(K);

// Conditional require.
if (IS_BROWSER_FROM_GLOBAL_CONFIG) {
  const browserOnly = require('./browserOnly.js')
  browserOnly.sayHelloBrowser(1234)
  console.log('Hello from browser!')

} else {
  const serverOnly = require('./serverOnly.js')
  serverOnly.sayHelloServer(5678)
  console.log('Hello from server!')
}

/*
// Conditional import.
//#if _IS_BROWSER_FROM_JSCC_PLUGIN
  import browserOnly from './browserOnly.js'
  browserOnly.sayHelloBrowser(9000)
//#else
  import serverOnly from './serverOnly.js'
  serverOnly.sayHelloServer(9001)
//#endif
*/

// Import polimorphic module.
// Browser and server code should be distinguish basing on main/browser
// entries in package.json of imported module.
// https://stackoverflow.com/questions/70162144/parceljs-does-not-bundle-imported-js-library
import exampleBSC from 'exampleBSC'
exampleBSC.sayHelloBSC(9002)