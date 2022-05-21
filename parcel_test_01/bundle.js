function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire86bb"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire86bb"] = parcelRequire;
}
parcelRequire.register("dQbyk", function(module, exports) {
module.exports = {
    sayHelloBrowser: function(x) {
        console.log('Hello from browserOnly.js with parameter', x);
    }
};

});

parcelRequire.register("cctqs", function(module, exports) {
module.exports = {
    sayHelloServer: function(x) {
        console.log('Hello from serverOnly.js with parameter', x);
    }
};

});

var $6c51d0d699e4fbf7$exports = {};
$6c51d0d699e4fbf7$exports = {
    sayHelloBSC: function(x) {
        console.log('[ exampleBSC ] Hello from index-browser.js with parameter', x);
    }
};


const $4cd8e2da403a2c6f$var$IS_BROWSER_FROM_GLOBAL_CONFIG = true;
function $4cd8e2da403a2c6f$var$requireNodeOrBrowser(valueForNode, valueForBrowser) {
    if ($4cd8e2da403a2c6f$var$IS_BROWSER_FROM_GLOBAL_CONFIG) return valueForBrowser;
    else return valueForNode;
}
const $4cd8e2da403a2c6f$var$K = $4cd8e2da403a2c6f$var$requireNodeOrBrowser('@kmu/kcore', 'dupa');
console.log($4cd8e2da403a2c6f$var$K);


// Conditional require.
if ($4cd8e2da403a2c6f$var$IS_BROWSER_FROM_GLOBAL_CONFIG) {
    const browserOnly = (parcelRequire("dQbyk"));
    browserOnly.sayHelloBrowser(1234);
    console.log('Hello from browser!');
} else {
    const serverOnly = (parcelRequire("cctqs"));
    serverOnly.sayHelloServer(5678);
    console.log('Hello from server!');
}
(/*@__PURE__*/$parcel$interopDefault($6c51d0d699e4fbf7$exports)).sayHelloBSC(9002);


//# sourceMappingURL=bundle.js.map
