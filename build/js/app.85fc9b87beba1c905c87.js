/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 307:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


/***/ }),

/***/ 102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 588:
/***/ (function(module) {

/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function(root, factory) {
  if ( true && module.exports) {
    module.exports = factory();
  } else {
    root.Toastify = factory();
  }
})(this, function(global) {
  // Object initialization
  var Toastify = function(options) {
      // Returning a new init object
      return new Toastify.lib.init(options);
    },
    // Library version
    version = "1.12.0";

  // Set the default global options
  Toastify.defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: undefined,
    duration: 3000,
    selector: undefined,
    callback: function () {
    },
    destination: undefined,
    newWindow: false,
    close: false,
    gravity: "toastify-top",
    positionLeft: false,
    position: '',
    backgroundColor: '',
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function () {
    },
    offset: {x: 0, y: 0},
    escapeMarkup: true,
    ariaLive: 'polite',
    style: {background: ''}
  };

  // Defining the prototype of the object
  Toastify.lib = Toastify.prototype = {
    toastify: version,

    constructor: Toastify,

    // Initializing the object with required parameters
    init: function(options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      }

      // Creating the options object
      this.options = {};

      this.toastElement = null;

      // Validating the options
      this.options.text = options.text || Toastify.defaults.text; // Display message
      this.options.node = options.node || Toastify.defaults.node;  // Display content as node
      this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
      this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
      this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
      this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
      this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
      this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
      this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
      this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
      this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
      this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
      this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
      this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
      this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
      this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
      this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
      this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
      this.options.style = options.style || Toastify.defaults.style;
      if(options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      }

      // Returning the current object for chaining functions
      return this;
    },

    // Building the DOM element
    buildToast: function() {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      }

      // Creating the DOM object
      var divElement = document.createElement("div");
      divElement.className = "toastify on " + this.options.className;

      // Positioning toast to left or right or center
      if (!!this.options.position) {
        divElement.className += " toastify-" + this.options.position;
      } else {
        // To be depreciated in further versions
        if (this.options.positionLeft === true) {
          divElement.className += " toastify-left";
          console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
        } else {
          // Default position
          divElement.className += " toastify-right";
        }
      }

      // Assigning gravity of element
      divElement.className += " " + this.options.gravity;

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      }

      // Loop through our style object and apply styles to divElement
      for (var property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      }

      // Announce the toast to screen readers
      if (this.options.ariaLive) {
        divElement.setAttribute('aria-live', this.options.ariaLive)
      }

      // Adding the toast message/node
      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node)
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          var avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;

          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left" || this.options.positionLeft === true) {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("button");
        closeElement.type = "button";
        closeElement.setAttribute("aria-label", "Close");
        closeElement.className = "toast-close";
        closeElement.innerHTML = "&#10006;";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this)
        );

        //Calculating screen width
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px
        if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      }

      // Clear timeout while toast is focused
      if (this.options.stopOnFocus && this.options.duration > 0) {
        var self = this;
        // stop countdown
        divElement.addEventListener(
          "mouseover",
          function(event) {
            window.clearTimeout(divElement.timeOutValue);
          }
        )
        // add back the timeout
        divElement.addEventListener(
          "mouseleave",
          function() {
            divElement.timeOutValue = window.setTimeout(
              function() {
                // Remove the toast from DOM
                self.removeElement(divElement);
              },
              self.options.duration
            )
          }
        )
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this)
        );
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this)
        );
      }

      // Adding offset
      if(typeof this.options.offset === "object") {

        var x = getAxisOffsetAValue("x", this.options);
        var y = getAxisOffsetAValue("y", this.options);

        var xOffset = this.options.position == "left" ? x : "-" + x;
        var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;

        divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";

      }

      // Returning the generated element
      return divElement;
    },

    // Displaying the toast
    showToast: function() {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast();

      // Getting the root element to with the toast needs to be added
      var rootElement;
      if (typeof this.options.selector === "string") {
        rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || (typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)) {
        rootElement = this.options.selector;
      } else {
        rootElement = document.body;
      }

      // Validating if root element is present in DOM
      if (!rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
      rootElement.insertBefore(this.toastElement, elementToInsert);

      // Repositioning the toasts in case multiple toasts are present
      Toastify.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          function() {
            // Remove the toast from DOM
            this.removeElement(this.toastElement);
          }.bind(this),
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    },

    hideToast: function() {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this.removeElement(this.toastElement);
    },

    // Removing the element from the DOM
    removeElement: function(toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        function() {
          // remove options node if any
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }

          // Remove the element from the DOM, only when the parent node was not removed before.
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          Toastify.reposition();
        }.bind(this),
        400
      ); // Binding `this` for function invocation
    },
  };

  // Positioning the toasts on the DOM
  Toastify.reposition = function() {

    // Top margins with gravity
    var topLeftOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var topRightOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var offsetSize = {
      top: 15,
      bottom: 15,
    };

    // Get all toast messages on the DOM
    var allToasts = document.getElementsByClassName("toastify");

    var classUsed;

    // Modifying the position of each toast element
    for (var i = 0; i < allToasts.length; i++) {
      // Getting the applied gravity
      if (containsClass(allToasts[i], "toastify-top") === true) {
        classUsed = "toastify-top";
      } else {
        classUsed = "toastify-bottom";
      }

      var height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length-1)
      // Spacing between toasts
      var offset = 15;

      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      // Show toast in center if screen with less than or equal to 360px
      if (width <= 360) {
        // Setting the position
        allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";

        offsetSize[classUsed] += height + offset;
      } else {
        if (containsClass(allToasts[i], "toastify-left") === true) {
          // Setting the position
          allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";

          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          // Setting the position
          allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";

          topRightOffsetSize[classUsed] += height + offset;
        }
      }
    }

    // Supporting function chaining
    return this;
  };

  // Helper function to get offset.
  function getAxisOffsetAValue(axis, options) {

    if(options.offset[axis]) {
      if(isNaN(options.offset[axis])) {
        return options.offset[axis];
      }
      else {
        return options.offset[axis] + 'px';
      }
    }

    return '0px';

  }

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (
      elem.className &&
      elem.className
        .trim()
        .split(/\s+/gi)
        .indexOf(yourClass) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Setting up the prototype for the init object
  Toastify.lib.init.prototype = Toastify.lib;

  // Returning the Toastify function to be assigned to the window object/module
  return Toastify;
});


/***/ }),

/***/ 217:
/***/ ((module) => {

"use strict";

module.exports = function (str) {
	return !isNaN(Date.parse(str));
};


/***/ }),

/***/ 508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./btn.css": 102,
	"./burger.css": 227,
	"./title.css": 30
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 508;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/utils/requireAll.js
function requireAll(r) {
	r.keys().forEach(r)
}

;// CONCATENATED MODULE: ./src/css/ui/index.js

requireAll(__webpack_require__(508))

;// CONCATENATED MODULE: ./src/css/index.js









;// CONCATENATED MODULE: ./node_modules/ssr-window/ssr-window.esm.js
/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
    return (obj !== null &&
        typeof obj === 'object' &&
        'constructor' in obj &&
        obj.constructor === Object);
}
function extend(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined')
            target[key] = src[key];
        else if (isObject(src[key]) &&
            isObject(target[key]) &&
            Object.keys(src[key]).length > 0) {
            extend(target[key], src[key]);
        }
    });
}

const ssrDocument = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: '',
    },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return {
            initEvent() { },
        };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
};
function ssr_window_esm_getDocument() {
    const doc = typeof document !== 'undefined' ? document : {};
    extend(doc, ssrDocument);
    return doc;
}

const ssrWindow = {
    document: ssrDocument,
    navigator: {
        userAgent: '',
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { },
    },
    CustomEvent: function CustomEvent() {
        return this;
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle() {
        return {
            getPropertyValue() {
                return '';
            },
        };
    },
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia() {
        return {};
    },
    requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
            callback();
            return null;
        }
        return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
            return;
        }
        clearTimeout(id);
    },
};
function ssr_window_esm_getWindow() {
    const win = typeof window !== 'undefined' ? window : {};
    extend(win, ssrWindow);
    return win;
}



;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/getCSSTransformValues/index.js

/**
 * Gets an object with `x`, `y`, `z` values of CSS3 transform
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @return {{x: number, y: number, z: number}}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 * @example
 * // How to get `translate3d` values of a `div`?
 * // <div id="block" style="transform: translate3d(10px, 15px, 35px);"></div>
 * const block = document.getElementById("block");
 * const values = getCSSTransformValues(block);
 * console.log(values); // => { x: 10, y: 15, z: 35 }
 */const getCSSTransformValues=el=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:`The object must be node`}))));const style=getWindow().getComputedStyle(el);const matrix=style.transform;const matrixType=matrix==="none"?"none":matrix.includes("3d")?"3d":"2d";const getValues=index=>{const val=matrix.match(/matrix.*\((.+)\)/);return val?val[1].split(", ")[index]:0};switch(matrixType){case"2d":return{x:getValues(4),y:getValues(5),z:0};case"3d":return{x:getValues(12),y:getValues(13),z:getValues(14)};case"none":default:return{x:0,y:0,z:0}}};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/getCSSValue/index.js

/**
 * Gets a calculated CSS property of an DOM-element
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param prop{String} - CSS property
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @return {string}
 * @example
 * // How to get "height" prop of div from JS?
 * const block = document.querySelector("#myBlock");
 * getCSSValue(block, "height");
 */const getCSSValue_getCSSValue=(el,prop)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:`The object must be node`}))));ow(prop,ow.string.not.empty);switch(prop){case"width":return`${el.offsetWidth}px`;case"height":return`${el.offsetHeight}px`;default:return getWindow().getComputedStyle(el).getPropertyValue(prop)}};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/getCSSVar/index.js

/**
 * Gets value of CSS variable
 * @param el{HTMLElement|Node|Element|Document} - source DOM element
 * @param variable{String} - variable name
 * @param isNumberFormat{Boolean=} - whether to return a number rather than a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @return {string|number}
 * @example
 * // How to get CSS3 variable value from element?
 * const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">
 * getCSSVar(block, "--myVar"); // or just "myVar"
 */const getCSSVar=(el,variable,isNumberFormat=false)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:`The object must be node`}))));ow(variable,ow.string.not.empty);ow(isNumberFormat,ow.optional.boolean);const prefix="--";const prop=variable.startsWith(prefix)?variable:prefix+variable;const value=getCSSValue(el,prop);return isNumberFormat?parseFloat(value):value};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/isMediaQuery/index.js

/**
 * Gets result of testing of a CSS media query
 * @param str{String} - source media query string
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries
 * @example
 * // How to check if user device has portrait or landscape orientation?
 * const mediaQuery = "(orientation: portrait)";
 * const isPortrait = isMediaQuery(mediaQuery);
 * console.log(isPortrait); // => false
 */const isMediaQuery=str=>{ow(str,ow.string.not.empty);return getWindow().matchMedia(str)?.matches??false};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/isSelectorValid/index.js

/**
 * Checks if string is valid CSS selector
 * @param str{String} - source selector
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
 * @example
 * // How to check if CSS selector is valid?
 * const selector = "#myElement";
 * const isValid = isSelectorValid(selector);
 * console.log(isValid); // => true
 */const isSelectorValid=str=>{ow(str,ow.string.not.empty);try{getDocument().createDocumentFragment().querySelector(str)}catch{return false}return true};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/ow/node_modules/callsites/index.js
function callsites() {
	const _prepareStackTrace = Error.prepareStackTrace;
	try {
		let result = [];
		Error.prepareStackTrace = (_, callSites) => {
			const callSitesWithoutCurrent = callSites.slice(1);
			result = callSitesWithoutCurrent;
			return callSitesWithoutCurrent;
		};

		new Error().stack; // eslint-disable-line unicorn/error-message, no-unused-expressions
		return result;
	} finally {
		Error.prepareStackTrace = _prepareStackTrace;
	}
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/infer-label.browser.js
const inferLabel = () => { };

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/base-predicate.js
/**
@hidden
*/
const testSymbol = Symbol('test');
/**
@hidden
*/
const isPredicate = (value) => Boolean(value?.[testSymbol]);

;// CONCATENATED MODULE: ./node_modules/@sindresorhus/is/dist/index.js
const typedArrayTypeNames = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
];
function isTypedArrayName(name) {
    return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
    'Function',
    'Generator',
    'AsyncGenerator',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'AsyncFunction',
    'Observable',
    'Array',
    'Buffer',
    'Blob',
    'Object',
    'RegExp',
    'Date',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'WeakRef',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Promise',
    'URL',
    'FormData',
    'URLSearchParams',
    'HTMLElement',
    'NaN',
    ...typedArrayTypeNames,
];
function isObjectTypeName(name) {
    return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
    'null',
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
];
function isPrimitiveTypeName(name) {
    return primitiveTypeNames.includes(name);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType(type) {
    return (value) => typeof value === type;
}
const { toString: dist_toString } = Object.prototype;
const getObjectType = (value) => {
    const objectTypeName = dist_toString.call(value).slice(8, -1);
    if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return 'HTMLElement';
    }
    if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    if (value === null) {
        return 'null';
    }
    switch (typeof value) {
        case 'undefined': {
            return 'undefined';
        }
        case 'string': {
            return 'string';
        }
        case 'number': {
            return Number.isNaN(value) ? 'NaN' : 'number';
        }
        case 'boolean': {
            return 'boolean';
        }
        case 'function': {
            return 'Function';
        }
        case 'bigint': {
            return 'bigint';
        }
        case 'symbol': {
            return 'symbol';
        }
        default:
    }
    if (is.observable(value)) {
        return 'Observable';
    }
    if (is.array(value)) {
        return 'Array';
    }
    if (is.buffer(value)) {
        return 'Buffer';
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return 'Object';
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.positiveNumber = (value) => is.number(value) && value > 0;
is.negativeNumber = (value) => is.number(value) && value < 0;
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
// eslint-disable-next-line @typescript-eslint/ban-types
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion) => {
    if (!Array.isArray(value)) {
        return false;
    }
    if (!is.function_(assertion)) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return value.every(element => assertion(element));
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
is.buffer = (value) => value?.constructor?.isBuffer?.(value) ?? false;
is.blob = (value) => isObjectOfType('Blob')(value);
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value); // eslint-disable-line @typescript-eslint/ban-types
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value)); // eslint-disable-line @typescript-eslint/ban-types
is.iterable = (value) => is.function_(value?.[Symbol.iterator]);
is.asyncIterable = (value) => is.function_(value?.[Symbol.asyncIterator]);
is.generator = (value) => is.iterable(value) && is.function_(value?.next) && is.function_(value?.throw);
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType('Promise')(value);
const hasPromiseApi = (value) => is.function_(value?.then)
    && is.function_(value?.catch);
is.promise = (value) => is.nativePromise(value) || hasPromiseApi(value);
is.generatorFunction = isObjectOfType('GeneratorFunction');
is.asyncGeneratorFunction = (value) => getObjectType(value) === 'AsyncGeneratorFunction';
is.asyncFunction = (value) => getObjectType(value) === 'AsyncFunction';
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType('RegExp');
is.date = isObjectOfType('Date');
is.error = isObjectOfType('Error');
is.map = (value) => isObjectOfType('Map')(value);
is.set = (value) => isObjectOfType('Set')(value);
is.weakMap = (value) => isObjectOfType('WeakMap')(value); // eslint-disable-line @typescript-eslint/ban-types
is.weakSet = (value) => isObjectOfType('WeakSet')(value); // eslint-disable-line @typescript-eslint/ban-types
is.weakRef = (value) => isObjectOfType('WeakRef')(value); // eslint-disable-line @typescript-eslint/ban-types
is.int8Array = isObjectOfType('Int8Array');
is.uint8Array = isObjectOfType('Uint8Array');
is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
is.int16Array = isObjectOfType('Int16Array');
is.uint16Array = isObjectOfType('Uint16Array');
is.int32Array = isObjectOfType('Int32Array');
is.uint32Array = isObjectOfType('Uint32Array');
is.float32Array = isObjectOfType('Float32Array');
is.float64Array = isObjectOfType('Float64Array');
is.bigInt64Array = isObjectOfType('BigInt64Array');
is.bigUint64Array = isObjectOfType('BigUint64Array');
is.arrayBuffer = isObjectOfType('ArrayBuffer');
is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
is.dataView = isObjectOfType('DataView');
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType('URL')(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch {
        return false;
    }
};
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value); // eslint-disable-line unicorn/prefer-native-coercion-functions
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
is.typedArray = (value) => isTypedArrayName(getObjectType(value));
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.tupleLike = (value, guards) => {
    if (is.array(guards) && is.array(value) && guards.length === value.length) {
        return guards.every((guard, index) => guard(value[index]));
    }
    return false;
};
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const NODE_TYPE_ELEMENT = 1;
// eslint-disable-next-line @typescript-eslint/naming-convention
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue',
];
is.domElement = (value) => is.object(value)
    && value.nodeType === NODE_TYPE_ELEMENT
    && is.string(value.nodeName)
    && !is.plainObject(value)
    && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
is.observable = (value) => {
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native, @typescript-eslint/no-unsafe-call
    if (value === value[Symbol.observable]?.()) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (value === value['@@observable']?.()) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
// eslint-disable-next-line unicorn/no-array-callback-reference
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
// eslint-disable-next-line unicorn/no-array-callback-reference
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
// eslint-disable-next-line unicorn/no-array-callback-reference
is.emptyMap = (value) => is.map(value) && value.size === 0;
// eslint-disable-next-line unicorn/no-array-callback-reference
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
// `PropertyKey` is any value that can be used as an object key (string, number, or symbol)
is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
is.formData = (value) => isObjectOfType('FormData')(value);
is.urlSearchParams = (value) => isObjectOfType('URLSearchParams')(value);
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {}) => {
    if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues
            ? `received values of types ${[
                ...new Set(value.map(singleValue => `\`${is(singleValue)}\``)),
            ].join(', ')}`
            : `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
    }
};
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
const assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), 'undefined', value),
    string: (value) => assertType(is.string(value), 'string', value),
    number: (value) => assertType(is.number(value), 'number', value),
    positiveNumber: (value) => assertType(is.positiveNumber(value), "positive number" /* AssertionTypeDescription.positiveNumber */, value),
    negativeNumber: (value) => assertType(is.negativeNumber(value), "negative number" /* AssertionTypeDescription.negativeNumber */, value),
    bigint: (value) => assertType(is.bigint(value), 'bigint', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), 'Function', value),
    null_: (value) => assertType(is.null_(value), 'null', value),
    class_: (value) => assertType(is.class_(value), "Class" /* AssertionTypeDescription.class_ */, value),
    boolean: (value) => assertType(is.boolean(value), 'boolean', value),
    symbol: (value) => assertType(is.symbol(value), 'symbol', value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* AssertionTypeDescription.numericString */, value),
    array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), 'Array', value);
        if (assertion) {
            // eslint-disable-next-line unicorn/no-array-for-each, unicorn/no-array-callback-reference
            value.forEach(assertion);
        }
    },
    buffer: (value) => assertType(is.buffer(value), 'Buffer', value),
    blob: (value) => assertType(is.blob(value), 'Blob', value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* AssertionTypeDescription.nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), 'Object', value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* AssertionTypeDescription.iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* AssertionTypeDescription.asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), 'Generator', value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* AssertionTypeDescription.nativePromise */, value),
    promise: (value) => assertType(is.promise(value), 'Promise', value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), 'GeneratorFunction', value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), 'AsyncGeneratorFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), 'AsyncFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), 'Function', value),
    regExp: (value) => assertType(is.regExp(value), 'RegExp', value),
    date: (value) => assertType(is.date(value), 'Date', value),
    error: (value) => assertType(is.error(value), 'Error', value),
    map: (value) => assertType(is.map(value), 'Map', value),
    set: (value) => assertType(is.set(value), 'Set', value),
    weakMap: (value) => assertType(is.weakMap(value), 'WeakMap', value),
    weakSet: (value) => assertType(is.weakSet(value), 'WeakSet', value),
    weakRef: (value) => assertType(is.weakRef(value), 'WeakRef', value),
    int8Array: (value) => assertType(is.int8Array(value), 'Int8Array', value),
    uint8Array: (value) => assertType(is.uint8Array(value), 'Uint8Array', value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
    int16Array: (value) => assertType(is.int16Array(value), 'Int16Array', value),
    uint16Array: (value) => assertType(is.uint16Array(value), 'Uint16Array', value),
    int32Array: (value) => assertType(is.int32Array(value), 'Int32Array', value),
    uint32Array: (value) => assertType(is.uint32Array(value), 'Uint32Array', value),
    float32Array: (value) => assertType(is.float32Array(value), 'Float32Array', value),
    float64Array: (value) => assertType(is.float64Array(value), 'Float64Array', value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), 'BigInt64Array', value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), 'BigUint64Array', value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
    dataView: (value) => assertType(is.dataView(value), 'DataView', value),
    enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), 'EnumCase', value),
    urlInstance: (value) => assertType(is.urlInstance(value), 'URL', value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* AssertionTypeDescription.urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* AssertionTypeDescription.truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* AssertionTypeDescription.falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* AssertionTypeDescription.nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* AssertionTypeDescription.primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* AssertionTypeDescription.integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* AssertionTypeDescription.safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* AssertionTypeDescription.plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* AssertionTypeDescription.typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* AssertionTypeDescription.arrayLike */, value),
    tupleLike: (value, guards) => assertType(is.tupleLike(value, guards), "tuple-like" /* AssertionTypeDescription.tupleLike */, value),
    domElement: (value) => assertType(is.domElement(value), "HTMLElement" /* AssertionTypeDescription.domElement */, value),
    observable: (value) => assertType(is.observable(value), 'Observable', value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* AssertionTypeDescription.nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* AssertionTypeDescription.infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* AssertionTypeDescription.emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* AssertionTypeDescription.nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* AssertionTypeDescription.emptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* AssertionTypeDescription.emptyStringOrWhitespace */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* AssertionTypeDescription.nonEmptyString */, value),
    nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace" /* AssertionTypeDescription.nonEmptyStringAndNotWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* AssertionTypeDescription.emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* AssertionTypeDescription.nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* AssertionTypeDescription.emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* AssertionTypeDescription.nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* AssertionTypeDescription.emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* AssertionTypeDescription.nonEmptyMap */, value),
    propertyKey: (value) => assertType(is.propertyKey(value), 'PropertyKey', value),
    formData: (value) => assertType(is.formData(value), 'FormData', value),
    urlSearchParams: (value) => assertType(is.urlSearchParams(value), 'URLSearchParams', value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* AssertionTypeDescription.evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* AssertionTypeDescription.oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* AssertionTypeDescription.directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* AssertionTypeDescription.inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* AssertionTypeDescription.any */, values, { multipleValues: true }),
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* AssertionTypeDescription.all */, values, { multipleValues: true }),
};
/* eslint-enable @typescript-eslint/no-confusing-void-expression */
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_,
    },
    function: {
        value: is.function_,
    },
    null: {
        value: is.null_,
    },
});
Object.defineProperties(assert, {
    class: {
        value: assert.class_,
    },
    function: {
        value: assert.function_,
    },
    null: {
        value: assert.null_,
    },
});
/* harmony default export */ const dist = (is);

// EXTERNAL MODULE: ./node_modules/vali-date/index.js
var vali_date = __webpack_require__(217);
;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/generate-stack.js
/**
Generates a useful stacktrace that points to the user's code where the error happened on platforms without the `Error.captureStackTrace()` method.

@hidden
*/
const generateStackTrace = () => {
    const stack = new RangeError('INTERNAL_OW_ERROR').stack;
    return stack;
};

;// CONCATENATED MODULE: ./node_modules/ow/dist/argument-error.js

const wrapStackTrace = (error, stack) => `${error.name}: ${error.message}\n${stack}`;
/**
@hidden
*/
class ArgumentError extends Error {
    constructor(message, context, errors = new Map()) {
        super(message);
        Object.defineProperty(this, "validationErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ArgumentError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, context);
        }
        else {
            this.stack = wrapStackTrace(this, generateStackTrace());
        }
        this.validationErrors = errors;
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/random-id.js
const randomId = () => Math.random().toString(16).slice(2);
/* harmony default export */ const random_id = (randomId);

;// CONCATENATED MODULE: ./node_modules/ow/dist/operators/not.js


/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
const not = (predicate) => {
    const originalAddValidator = predicate.addValidator;
    predicate.addValidator = (validator) => {
        const { validator: fn, message, negatedMessage } = validator;
        const placeholder = random_id();
        validator.message = (value, label) => (negatedMessage
            ? negatedMessage(value, label)
            : message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label));
        validator.validator = (value) => !fn(value);
        predicate[validatorSymbol].push(validator);
        predicate.addValidator = originalAddValidator;
        return predicate;
    };
    return predicate;
};

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/generate-argument-error-message.js
/**
Generates a complete message from all errors generated by predicates.

@param errors - The errors generated by the predicates.
@param isAny - If this function is called from the any argument.
@hidden
*/
const generateArgumentErrorMessage = (errors, isAny = false) => {
    const message = [];
    const errorArray = [...errors.entries()];
    const anyErrorWithoutOneItemOnly = errorArray.some(([, array]) => array.size !== 1);
    // If only one error "key" is present, enumerate all of those errors only.
    if (errorArray.length === 1) {
        const [, returnedErrors] = errorArray[0];
        if (!isAny && returnedErrors.size === 1) {
            const [errorMessage] = returnedErrors;
            return errorMessage;
        }
        for (const entry of returnedErrors) {
            message.push(`${isAny ? '  - ' : ''}${entry}`);
        }
        return message.join('\n');
    }
    // If every predicate returns just one error, enumerate them as is.
    if (!anyErrorWithoutOneItemOnly) {
        return errorArray.map(([, [item]]) => `  - ${item}`).join('\n');
    }
    // Else, iterate through all the errors and enumerate them.
    for (const [key, value] of errorArray) {
        message.push(`Errors from the "${key}" predicate:`);
        for (const entry of value) {
            message.push(`  - ${entry}`);
        }
    }
    return message.join('\n');
};

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/predicate.js





/**
@hidden
*/
const validatorSymbol = Symbol('validators');
/**
@hidden
*/
class Predicate {
    constructor(type, options = {}) {
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: type
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                validators: [],
            }
        });
        this.context = {
            ...this.context,
            ...this.options,
        };
        const typeString = this.type.charAt(0).toLowerCase() + this.type.slice(1);
        this.addValidator({
            message: (value, label) => {
                // We do not include type in this label as we do for other messages, because it would be redundant.
                const label_ = label?.slice(this.type.length + 1);
                // TODO: The NaN check can be removed when `@sindresorhus/is` is fixed: https://github.com/sindresorhus/ow/issues/231#issuecomment-1047100612
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                return `Expected ${label_ || 'argument'} to be of type \`${this.type}\` but received type \`${Number.isNaN(value) ? 'NaN' : dist(value)}\``;
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            validator: value => dist[typeString](value),
        });
    }
    /**
    @hidden
    */
    [testSymbol](value, main, label, idLabel) {
        // Create a map of labels -> received errors.
        const errors = new Map();
        for (const { validator, message } of this.context.validators) {
            if (this.options.optional === true && value === undefined) {
                continue;
            }
            let result;
            try {
                result = validator(value);
            }
            catch (error) {
                // Any errors caught means validators couldn't process the input.
                result = error;
            }
            if (result === true) {
                continue;
            }
            const label2 = dist.function_(label) ? label() : label;
            const labelWithTick = (label2 && idLabel) ? `\`${label2}\`` : label2;
            const label_ = labelWithTick
                ? `${this.type} ${labelWithTick}`
                : this.type;
            const mapKey = label2 || this.type;
            // Get the current errors encountered for this label.
            const currentErrors = errors.get(mapKey);
            // Pre-generate the error message that will be reported to the user.
            const errorMessage = message(value, label_, result);
            // If we already have any errors for this label.
            if (currentErrors) {
                // If we don't already have this error logged, add it.
                currentErrors.add(errorMessage);
            }
            else {
                // Set this label and error in the full map.
                errors.set(mapKey, new Set([errorMessage]));
            }
        }
        // If we have any errors to report, throw.
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = generateArgumentErrorMessage(errors);
            throw new ArgumentError(message, main, errors);
        }
    }
    /**
    @hidden
    */
    get [validatorSymbol]() {
        return this.context.validators;
    }
    /**
    Invert the following validators.
    */
    get not() {
        return not(this);
    }
    /**
    Test if the value matches a custom validation function. The validation function should return an object containing a `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message. If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.

    @param customValidator - Custom validation function.
    */
    validate(customValidator) {
        return this.addValidator({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            message: (_, label, error) => typeof error === 'string'
                ? `(${label}) ${error}`
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                : error(label),
            validator(value) {
                const { message, validator } = customValidator(value);
                if (validator) {
                    return true;
                }
                return message;
            },
        });
    }
    /**
    Test if the value matches a custom validation function. The validation function should return `true` if the value passes the function. If the function either returns `false` or a string, the function fails and the string will be used as error message.

    @param validator - Validation function.
    */
    is(validator) {
        return this.addValidator({
            message: (value, label, error) => (error
                ? `(${label}) ${error}`
                : `Expected ${label} \`${value}\` to pass custom validation function`),
            validator,
        });
    }
    /**
    Provide a new error message to be thrown when the validation fails.

    @param newMessage - Either a string containing the new message or a function returning the new message.

    @example
    ```
    ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
    //=> ArgumentError: Expected unicorn, got rainbow
    ```

    @example
    ```
    ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
    //=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
    ```
    */
    message(newMessage) {
        const { validators } = this.context;
        validators[validators.length - 1].message = (value, label) => {
            if (typeof newMessage === 'function') {
                return newMessage(value, label);
            }
            return newMessage;
        };
        return this;
    }
    /**
    Register a new validator.

    @param validator - Validator to register.
    */
    addValidator(validator) {
        this.context.validators.push(validator);
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/string.js



class StringPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('string', options);
    }
    /**
    Test a string to have a specific length.

    @param length - The length of the string.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value}\``,
            validator: value => value.length === length,
        });
    }
    /**
    Test a string to have a minimum length.

    @param length - The minimum length of the string.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value}\``,
        });
    }
    /**
    Test a string to have a maximum length.

    @param length - The maximum length of the string.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value}\``,
        });
    }
    /**
    Test a string against a regular expression.

    @param regex - The regular expression to match the value with.
    */
    matches(regex) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to match \`${regex}\`, got \`${value}\``,
            validator: value => regex.test(value),
        });
    }
    /**
    Test a string to start with a specific value.

    @param searchString - The value that should be the start of the string.
    */
    startsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchString}\`, got \`${value}\``,
            validator: value => value.startsWith(searchString),
        });
    }
    /**
    Test a string to end with a specific value.

    @param searchString - The value that should be the end of the string.
    */
    endsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchString}\`, got \`${value}\``,
            validator: value => value.endsWith(searchString),
        });
    }
    /**
    Test a string to include a specific value.

    @param searchString - The value that should be included in the string.
    */
    includes(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include \`${searchString}\`, got \`${value}\``,
            validator: value => value.includes(searchString),
        });
    }
    /**
    Test if the string is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message(value, label) {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got \`${value}\``;
            },
            validator: value => list.includes(value),
        });
    }
    /**
    Test a string to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${value}\``,
            validator: value => value === '',
        });
    }
    /**
    Test a string to contain at least 1 non-whitespace character.
    */
    get nonBlank() {
        return this.addValidator({
            message(value, label) {
                // Unicode's formal substitute characters can be barely legible and may not be easily recognized.
                // Hence this alternative substitution scheme.
                const madeVisible = value
                    .replace(/ /g, '·')
                    .replace(/\f/g, '\\f')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t')
                    .replace(/\v/g, '\\v');
                return `Expected ${label} to not be only whitespace, got \`${madeVisible}\``;
            },
            validator: value => value.trim() !== '',
        });
    }
    /**
    Test a string to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value !== '',
        });
    }
    /**
    Test a string to be equal to a specified string.

    @param expected - Expected value to match.
    */
    equals(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
            validator: value => value === expected,
        });
    }
    /**
    Test a string to be alphanumeric.
    */
    get alphanumeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphanumeric, got \`${value}\``,
            validator: value => /^[a-z\d]+$/i.test(value),
        });
    }
    /**
    Test a string to be alphabetical.
    */
    get alphabetical() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphabetical, got \`${value}\``,
            validator: value => /^[a-z]+$/gi.test(value),
        });
    }
    /**
    Test a string to be numeric.
    */
    get numeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be numeric, got \`${value}\``,
            validator: value => /^[+-]?\d+$/i.test(value),
        });
    }
    /**
    Test a string to be a valid date.
    */
    get date() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a date, got \`${value}\``,
            validator: vali_date,
        });
    }
    /**
    Test a non-empty string to be lowercase. Matching both alphabetical & numbers.
    */
    get lowercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be lowercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toLowerCase(),
        });
    }
    /**
    Test a non-empty string to be uppercase. Matching both alphabetical & numbers.
    */
    get uppercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be uppercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toUpperCase(),
        });
    }
    /**
    Test a string to be a valid URL.
    */
    get url() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a URL, got \`${value}\``,
            validator: dist.urlString,
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/number.js


class NumberPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('number', options);
    }
    /**
    Test a number to be in a specified range.

    @param start - Start of the range.
    @param end - End of the range.
    */
    inRange(start, end) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be in range [${start}..${end}], got ${value}`,
            validator: value => dist.inRange(value, [start, end]),
        });
    }
    /**
    Test a number to be greater than the provided value.

    @param number - Minimum value.
    */
    greaterThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than ${number}, got ${value}`,
            validator: value => value > number,
        });
    }
    /**
    Test a number to be greater than or equal to the provided value.

    @param number - Minimum value.
    */
    greaterThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than or equal to ${number}, got ${value}`,
            validator: value => value >= number,
        });
    }
    /**
    Test a number to be less than the provided value.

    @param number - Maximum value.
    */
    lessThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than ${number}, got ${value}`,
            validator: value => value < number,
        });
    }
    /**
    Test a number to be less than or equal to the provided value.

    @param number - Minimum value.
    */
    lessThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than or equal to ${number}, got ${value}`,
            validator: value => value <= number,
        });
    }
    /**
    Test a number to be equal to a specified number.

    @param expected - Expected value to match.
    */
    equal(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to ${expected}, got ${value}`,
            validator: value => value === expected,
        });
    }
    /**
    Test if a number is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message(value, label) {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got ${value}`;
            },
            validator: value => list.includes(value),
        });
    }
    /**
    Test a number to be an integer.
    */
    get integer() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer, got ${value}`,
            validator: value => dist.integer(value),
        });
    }
    /**
    Test a number to be finite.
    */
    get finite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be finite, got ${value}`,
            validator: value => !dist.infinite(value),
        });
    }
    /**
    Test a number to be infinite.
    */
    get infinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be infinite, got ${value}`,
            validator: value => dist.infinite(value),
        });
    }
    /**
    Test a number to be positive.
    */
    get positive() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be positive, got ${value}`,
            validator: value => value > 0,
        });
    }
    /**
    Test a number to be negative.
    */
    get negative() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be negative, got ${value}`,
            validator: value => value < 0,
        });
    }
    /**
    Test a number to be an integer or infinite.
    */
    get integerOrInfinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer or infinite, got ${value}`,
            validator: value => dist.integer(value) || dist.infinite(value),
        });
    }
    /**
    Test a number to be in a valid range for a 8-bit unsigned integer.
    */
    get uint8() {
        return this.integer.inRange(0, 255);
    }
    /**
    Test a number to be in a valid range for a 16-bit unsigned integer.
    */
    get uint16() {
        return this.integer.inRange(0, 65535);
    }
    /**
    Test a number to be in a valid range for a 32-bit unsigned integer.
    */
    get uint32() {
        return this.integer.inRange(0, 4294967295);
    }
    /**
    Test a number to be in a valid range for a 8-bit signed integer.
    */
    get int8() {
        return this.integer.inRange(-128, 127);
    }
    /**
    Test a number to be in a valid range for a 16-bit signed integer.
    */
    get int16() {
        return this.integer.inRange(-32768, 32767);
    }
    /**
    Test a number to be in a valid range for a 32-bit signed integer.
    */
    get int32() {
        return this.integer.inRange(-2147483648, 2147483647);
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/bigint.js

class BigIntPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('bigint', options);
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/boolean.js

class BooleanPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('boolean', options);
    }
    /**
    Test a boolean to be true.
    */
    get true() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be true, got ${value}`,
            validator: value => value,
        });
    }
    /**
    Test a boolean to be false.
    */
    get false() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be false, got ${value}`,
            validator: value => !value,
        });
    }
}

// EXTERNAL MODULE: ./node_modules/lodash.isequal/index.js
var lodash_isequal = __webpack_require__(307);
;// CONCATENATED MODULE: ./node_modules/ow/dist/test.js

/**
Validate the value against the provided predicate.

@hidden

@param value - Value to test.
@param label - Label which should be used in error messages.
@param predicate - Predicate to test to value against.
@param idLabel - If true, the label is a variable or type. Default: true.
*/
function test(value, label, predicate, idLabel = true) {
    predicate[testSymbol](value, test, label, idLabel);
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/match-shape.js



/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function partial(object, shape, parent) {
    try {
        for (const key of Object.keys(shape)) {
            const label = parent ? `${parent}.${key}` : key;
            if (isPredicate(shape[key])) {
                test(object[key], label, shape[key]);
            }
            else if (dist.plainObject(shape[key])) {
                const result = partial(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}
/**
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function exact(object, shape, parent, isArray) {
    try {
        const objectKeys = new Set(Object.keys(object));
        for (const key of Object.keys(shape)) {
            objectKeys.delete(key);
            const label = parent ? `${parent}.${key}` : key;
            if (isPredicate(shape[key])) {
                test(object[key], label, shape[key]);
            }
            else if (dist.plainObject(shape[key])) {
                if (!Object.prototype.hasOwnProperty.call(object, key)) {
                    return `Expected \`${label}\` to exist`;
                }
                const result = exact(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        if (objectKeys.size > 0) {
            const firstKey = [...objectKeys.keys()][0];
            const label = parent ? `${parent}.${firstKey}` : firstKey;
            return `Did not expect ${isArray ? 'element' : 'property'} \`${label}\` to exist, got \`${object[firstKey]}\``;
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/of-type.js

/**
Test all the values in the collection against a provided predicate.

@hidden
@param source Source collection to test.
@param name The name to call the collection of values, such as `values` or `keys`.
@param predicate Predicate to test every item in the source collection against.
*/
const ofType = (source, name, predicate) => {
    try {
        for (const item of source) {
            test(item, name, predicate, false);
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
};
/* harmony default export */ const of_type = (ofType);

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/array.js




class ArrayPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('array', options);
    }
    /**
    Test an array to have a specific length.

    @param length - The length of the array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length,
        });
    }
    /**
    Test an array to have a minimum length.

    @param length - The minimum length of the array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``,
        });
    }
    /**
    Test an array to have a maximum length.

    @param length - The maximum length of the array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``,
        });
    }
    /**
    Test an array to start with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the start of the array.
    */
    startsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
            validator: value => value[0] === searchElement,
        });
    }
    /**
    Test an array to end with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the end of the array.
    */
    endsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
            validator: value => value[value.length - 1] === searchElement,
        });
    }
    /**
    Test an array to include all the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includes(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.every(element => value.includes(element)),
        });
    }
    /**
    Test an array to include any of the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includesAny(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.some(element => value.includes(element)),
        });
    }
    /**
    Test an array to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
            validator: value => value.length === 0,
        });
    }
    /**
    Test an array to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value.length > 0,
        });
    }
    /**
    Test an array to be deeply equal to the provided array.

    @param expected - Expected value to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => lodash_isequal(value, expected),
        });
    }
    /**
    Test all elements in the array to match to provided predicate.

    @param predicate - The predicate that should be applied against every individual item.

    @example
    ```
    ow(['a', 1], ow.array.ofType(ow.any(ow.string, ow.number)));
    ```
    */
    ofType(predicate) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: value => of_type(value, 'values', predicate),
        });
    }
    /**
    Test if the elements in the array exactly matches the elements placed at the same indices in the predicates array.

    @param predicates - Predicates to test the array against. Describes what the tested array should look like.

    @example
    ```
    ow(['1', 2], ow.array.exactShape([ow.string, ow.number]));
    ```
    */
    exactShape(predicates) {
        const shape = predicates;
        return this.addValidator({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            message: (_, label, message) => `${message.replace('Expected', 'Expected element')} in ${label}`,
            validator: object => exact(object, shape, undefined, true),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/dot-prop/index.js
const dot_prop_isObject = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor',
]);

const digits = new Set('0123456789');

function getPathSegments(path) {
	const parts = [];
	let currentSegment = '';
	let currentPart = 'start';
	let isIgnoring = false;

	for (const character of path) {
		switch (character) {
			case '\\':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (isIgnoring) {
					currentSegment += character;
				}

				currentPart = 'property';
				isIgnoring = !isIgnoring;
				break;

			case '.':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'property';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (disallowedKeys.has(currentSegment)) {
					return [];
				}

				parts.push(currentSegment);
				currentSegment = '';
				currentPart = 'property';
				break;

			case '[':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'index';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (currentPart === 'property') {
					if (disallowedKeys.has(currentSegment)) {
						return [];
					}

					parts.push(currentSegment);
					currentSegment = '';
				}

				currentPart = 'index';
				break;

			case ']':
				if (currentPart === 'index') {
					parts.push(Number.parseInt(currentSegment, 10));
					currentSegment = '';
					currentPart = 'indexEnd';
					break;
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				// Falls through

			default:
				if (currentPart === 'index' && !digits.has(character)) {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (currentPart === 'start') {
					currentPart = 'property';
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += '\\';
				}

				currentSegment += character;
		}
	}

	if (isIgnoring) {
		currentSegment += '\\';
	}

	switch (currentPart) {
		case 'property': {
			if (disallowedKeys.has(currentSegment)) {
				return [];
			}

			parts.push(currentSegment);

			break;
		}

		case 'index': {
			throw new Error('Index was not closed');
		}

		case 'start': {
			parts.push('');

			break;
		}
	// No default
	}

	return parts;
}

function isStringIndex(object, key) {
	if (typeof key !== 'number' && Array.isArray(object)) {
		const index = Number.parseInt(key, 10);
		return Number.isInteger(index) && object[index] === object[key];
	}

	return false;
}

function assertNotStringIndex(object, key) {
	if (isStringIndex(object, key)) {
		throw new Error('Cannot use string index');
	}
}

function getProperty(object, path, value) {
	if (!dot_prop_isObject(object) || typeof path !== 'string') {
		return value === undefined ? object : value;
	}

	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return value;
	}

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		if (isStringIndex(object, key)) {
			object = index === pathArray.length - 1 ? undefined : null;
		} else {
			object = object[key];
		}

		if (object === undefined || object === null) {
			// `object` is either `undefined` or `null` so we want to stop the loop, and
			// if this is not the last bit of the path, and
			// if it didn't return `undefined`
			// it would return `null` if `object` is `null`
			// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
			if (index !== pathArray.length - 1) {
				return value;
			}

			break;
		}
	}

	return object === undefined ? value : object;
}

function setProperty(object, path, value) {
	if (!dot_prop_isObject(object) || typeof path !== 'string') {
		return object;
	}

	const root = object;
	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			object[key] = value;
		} else if (!dot_prop_isObject(object[key])) {
			object[key] = typeof pathArray[index + 1] === 'number' ? [] : {};
		}

		object = object[key];
	}

	return root;
}

function deleteProperty(object, path) {
	if (!dot_prop_isObject(object) || typeof path !== 'string') {
		return false;
	}

	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			delete object[key];
			return true;
		}

		object = object[key];

		if (!dot_prop_isObject(object)) {
			return false;
		}
	}
}

function hasProperty(object, path) {
	if (!dot_prop_isObject(object) || typeof path !== 'string') {
		return false;
	}

	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return false;
	}

	for (const key of pathArray) {
		if (!dot_prop_isObject(object) || !(key in object) || isStringIndex(object, key)) {
			return false;
		}

		object = object[key];
	}

	return true;
}

function escapePath(path) {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return path.replace(/[\\.[]/g, '\\$&');
}

// The keys returned by Object.entries() for arrays are strings
function entries(value) {
	if (Array.isArray(value)) {
		return value.map((value, index) => [index, value]);
	}

	return Object.entries(value);
}

function stringifyPath(pathSegments) {
	let result = '';

	for (let [index, segment] of entries(pathSegments)) {
		if (typeof segment === 'number') {
			result += `[${segment}]`;
		} else {
			segment = escapePath(segment);
			result += index === 0 ? segment : `.${segment}`;
		}
	}

	return result;
}

function * deepKeysIterator(object, currentPath = []) {
	if (!dot_prop_isObject(object)) {
		if (currentPath.length > 0) {
			yield stringifyPath(currentPath);
		}

		return;
	}

	for (const [key, value] of entries(object)) {
		yield * deepKeysIterator(value, [...currentPath, key]);
	}
}

function deepKeys(object) {
	return [...deepKeysIterator(object)];
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/has-items.js
/**
Retrieve the missing values in a collection based on an array of items.

@hidden

@param source - Source collection to search through.
@param items - Items to search for.
@param maxValues - Maximum number of values after the search process is stopped. Default: 5.
*/
const hasItems = (source, items, maxValues = 5) => {
    const missingValues = [];
    for (const value of items) {
        if (source.has(value)) {
            continue;
        }
        missingValues.push(value);
        if (missingValues.length === maxValues) {
            return missingValues;
        }
    }
    return missingValues.length === 0 ? true : missingValues;
};
/* harmony default export */ const has_items = (hasItems);

;// CONCATENATED MODULE: ./node_modules/ow/dist/utils/of-type-deep.js


const ofTypeDeep = (object, predicate) => {
    if (!dist.plainObject(object)) {
        test(object, 'deep values', predicate, false);
        return true;
    }
    return Object.values(object).every(value => ofTypeDeep(value, predicate));
};
/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
const ofTypeDeepSafe = (object, predicate) => {
    try {
        return ofTypeDeep(object, predicate);
    }
    catch (error) {
        return error.message;
    }
};
/* harmony default export */ const of_type_deep = (ofTypeDeepSafe);

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/object.js








class ObjectPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('object', options);
    }
    /**
    Test if an Object is a plain object.
    */
    get plain() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to be a plain object`,
            validator: object => dist.plainObject(object),
        });
    }
    /**
    Test an object to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
            validator: object => Object.keys(object).length === 0,
        });
    }
    /**
    Test an object to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: object => Object.keys(object).length > 0,
        });
    }
    /**
    Test all the values in the object to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => of_type(Object.values(object), 'values', predicate),
        });
    }
    /**
    Test all the values in the object deeply to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    deepValuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => of_type_deep(object, predicate),
        });
    }
    /**
    Test an object to be deeply equal to the provided object.

    @param expected - Expected object to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
            validator: object => lodash_isequal(object, expected),
        });
    }
    /**
    Test an object to be of a specific instance type.

    @param instance - The expected instance type of the object.
    */
    instanceOf(instance) {
        return this.addValidator({
            message(object, label) {
                let { name } = object?.constructor ?? {};
                if (!name || name === 'Object') {
                    name = JSON.stringify(object);
                }
                return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
            },
            validator: object => object instanceof instance,
        });
    }
    /**
    Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that should be present in the object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: object => has_items({
                has: item => hasProperty(object, item),
            }, keys),
        });
    }
    /**
    Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that could be a key in the object.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: object => keys.some(key => hasProperty(object, key)),
        });
    }
    /**
    Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    const object = {
        unicorn: '🦄',
        rainbow: '🌈'
    };

    ow(object, ow.object.partialShape({
        unicorn: ow.string
    }));
    ```
    */
    partialShape(shape) {
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => partial(object, shape),
        });
    }
    /**
    Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    ow({unicorn: '🦄'}, ow.object.exactShape({
        unicorn: ow.string
    }));
    ```
    */
    exactShape(shape) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => exact(object, shape),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/date.js

class DatePredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('date', options);
    }
    /**
    Test a date to be before another date.

    @param date - Maximum value.
    */
    before(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be before ${date.toISOString()}`,
            validator: value => value.getTime() < date.getTime(),
        });
    }
    /**
    Test a date to be before another date.

    @param date - Minimum value.
    */
    after(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be after ${date.toISOString()}`,
            validator: value => value.getTime() > date.getTime(),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/error.js

class ErrorPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('error', options);
    }
    /**
    Test an error to have a specific name.

    @param expected - Expected name of the Error.
    */
    name(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} to have name \`${expected}\`, got \`${error.name}\``,
            validator: error => error.name === expected,
        });
    }
    /**
    Test an error to have a specific message.

    @param expected - Expected message of the Error.
    */
    message(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to be \`${expected}\`, got \`${error.message}\``,
            validator: error => error.message === expected,
        });
    }
    /**
    Test the error message to include a specific message.

    @param message - Message that should be included in the error.
    */
    messageIncludes(message) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to include \`${message}\`, got \`${error.message}\``,
            validator: error => error.message.includes(message),
        });
    }
    /**
    Test the error object to have specific keys.

    @param keys - One or more keys which should be part of the error object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} message to have keys \`${keys.join('`, `')}\``,
            validator: error => keys.every(key => Object.prototype.hasOwnProperty.call(error, key)),
        });
    }
    /**
    Test an error to be of a specific instance type.

    @param instance - The expected instance type of the error.
    */
    instanceOf(instance) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} \`${error.name}\` to be of type \`${instance.name}\``,
            validator: error => error instanceof instance,
        });
    }
    /**
    Test an Error to be a TypeError.
    */
    get typeError() {
        return this.instanceOf(TypeError);
    }
    /**
    Test an Error to be an EvalError.
    */
    get evalError() {
        return this.instanceOf(EvalError);
    }
    /**
    Test an Error to be a RangeError.
    */
    get rangeError() {
        return this.instanceOf(RangeError);
    }
    /**
    Test an Error to be a ReferenceError.
    */
    get referenceError() {
        return this.instanceOf(ReferenceError);
    }
    /**
    Test an Error to be a SyntaxError.
    */
    get syntaxError() {
        return this.instanceOf(SyntaxError);
    }
    /**
    Test an Error to be a URIError.
    */
    get uriError() {
        return this.instanceOf(URIError);
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/map.js




class MapPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Map', options);
    }
    /**
    Test a Map to have a specific size.

    @param size - The size of the Map.
    */
    size(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have size \`${size}\`, got \`${map.size}\``,
            validator: map => map.size === size,
        });
    }
    /**
    Test an Map to have a minimum size.

    @param size - The minimum size of the Map.
    */
    minSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size >= size,
            negatedMessage: (map, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${map.size}\``,
        });
    }
    /**
    Test an Map to have a maximum size.

    @param size - The maximum size of the Map.
    */
    maxSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size <= size,
            negatedMessage: (map, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${map.size}\``,
        });
    }
    /**
    Test a Map to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the Map.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => has_items(map, keys),
        });
    }
    /**
    Test a Map to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the Map.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key)),
        });
    }
    /**
    Test a Map to include all the provided values. The values are tested by identity, not structure.

    @param values - The values that should be a value in the Map.
    */
    hasValues(...values) {
        return this.addValidator({
            message: (_, label, missingValues) => `Expected ${label} to have values \`${JSON.stringify(missingValues)}\``,
            validator: map => has_items(new Set(map.values()), values),
        });
    }
    /**
    Test a Map to include any of the provided values. The values are tested by identity, not structure.

    @param values - The values that could be a value in the Map.
    */
    hasAnyValues(...values) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any value of \`${JSON.stringify(values)}\``,
            validator(map) {
                const valueSet = new Set(map.values());
                return values.some(key => valueSet.has(key));
            },
        });
    }
    /**
    Test all the keys in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every key in the Map.
    */
    keysOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => of_type(map.keys(), 'keys', predicate),
        });
    }
    /**
    Test all the values in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the Map.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => of_type(map.values(), 'values', predicate),
        });
    }
    /**
    Test a Map to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...map])}\``,
            validator: map => map.size === 0,
        });
    }
    /**
    Test a Map to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: map => map.size > 0,
        });
    }
    /**
    Test a Map to be deeply equal to the provided Map.

    @param expected - Expected Map to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...map])}\``,
            validator: map => lodash_isequal(map, expected),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/weak-map.js


class WeakMapPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakMap', options);
    }
    /**
    Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the WeakMap.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => has_items(map, keys),
        });
    }
    /**
    Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the WeakMap.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key)),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/set.js




class SetPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Set', options);
    }
    /**
    Test a Set to have a specific size.

    @param size - The size of the Set.
    */
    size(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have size \`${size}\`, got \`${set.size}\``,
            validator: set => set.size === size,
        });
    }
    /**
    Test a Set to have a minimum size.

    @param size - The minimum size of the Set.
    */
    minSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size >= size,
            negatedMessage: (set, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${set.size}\``,
        });
    }
    /**
    Test a Set to have a maximum size.

    @param size - The maximum size of the Set.
    */
    maxSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size <= size,
            negatedMessage: (set, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${set.size}\``,
        });
    }
    /**
    Test a Set to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the Set.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => has_items(set, items),
        });
    }
    /**
    Test a Set to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the Set.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item)),
        });
    }
    /**
    Test all the items in the Set to match the provided predicate.

    @param predicate - The predicate that should be applied against every item in the Set.
    */
    ofType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: set => of_type(set, 'values', predicate),
        });
    }
    /**
    Test a Set to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...set])}\``,
            validator: set => set.size === 0,
        });
    }
    /**
    Test a Set to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: set => set.size > 0,
        });
    }
    /**
    Test a Set to be deeply equal to the provided Set.

    @param expected - Expected Set to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...set])}\``,
            validator: set => lodash_isequal(set, expected),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/weak-set.js


class WeakSetPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakSet', options);
    }
    /**
    Test a WeakSet to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the WeakSet.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => has_items(set, items),
        });
    }
    /**
    Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the WeakSet.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item)),
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/typed-array.js

class TypedArrayPredicate extends Predicate {
    /**
    Test a typed array to have a specific byte length.

    @param byteLength - The byte length of the typed array.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength,
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param byteLength - The minimum byte length of the typed array.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``,
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param length - The minimum byte length of the typed array.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``,
        });
    }
    /**
    Test a typed array to have a specific length.

    @param length - The length of the typed array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length,
        });
    }
    /**
    Test a typed array to have a minimum length.

    @param length - The minimum length of the typed array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``,
        });
    }
    /**
    Test a typed array to have a maximum length.

    @param length - The maximum length of the typed array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``,
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/array-buffer.js

class ArrayBufferPredicate extends Predicate {
    /**
    Test an array buffer to have a specific byte length.

    @param byteLength - The byte length of the array buffer.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength,
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param byteLength - The minimum byte length of the array buffer.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``,
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param length - The minimum byte length of the array buffer.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``,
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/data-view.js

class DataViewPredicate extends Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('DataView', options);
    }
    /**
    Test a DataView to have a specific byte length.

    @param byteLength - The byte length of the DataView.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength,
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param byteLength - The minimum byte length of the DataView.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``,
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param length - The minimum byte length of the DataView.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``,
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates/any.js



/**
@hidden
*/
class AnyPredicate {
    constructor(predicates, options = {}) {
        Object.defineProperty(this, "predicates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: predicates
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    [testSymbol](value, main, label, idLabel) {
        const errors = new Map();
        for (const predicate of this.predicates) {
            try {
                main(value, label, predicate, idLabel);
                return;
            }
            catch (error) {
                if (value === undefined && this.options.optional === true) {
                    return;
                }
                // If we received an ArgumentError, then..
                if (error instanceof ArgumentError) {
                    // Iterate through every error reported.
                    for (const [key, value] of error.validationErrors.entries()) {
                        // Get the current errors set, if any.
                        const alreadyPresent = errors.get(key);
                        // Add all errors under the same key
                        errors.set(key, new Set([...alreadyPresent ?? [], ...value]));
                    }
                }
            }
        }
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = generateArgumentErrorMessage(errors, true);
            throw new ArgumentError(`Any predicate failed with the following errors:\n${message}`, main, errors);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/ow/dist/predicates.js

















const predicates = (object, options) => {
    Object.defineProperties(object, {
        string: {
            get: () => new StringPredicate(options),
        },
        number: {
            get: () => new NumberPredicate(options),
        },
        bigint: {
            get: () => new BigIntPredicate(options),
        },
        boolean: {
            get: () => new BooleanPredicate(options),
        },
        undefined: {
            get: () => new Predicate('undefined', options),
        },
        null: {
            get: () => new Predicate('null', options),
        },
        nullOrUndefined: {
            get: () => new Predicate('nullOrUndefined', options),
        },
        nan: {
            get: () => new Predicate('nan', options),
        },
        symbol: {
            get: () => new Predicate('symbol', options),
        },
        array: {
            get: () => new ArrayPredicate(options),
        },
        object: {
            get: () => new ObjectPredicate(options),
        },
        date: {
            get: () => new DatePredicate(options),
        },
        error: {
            get: () => new ErrorPredicate(options),
        },
        map: {
            get: () => new MapPredicate(options),
        },
        weakMap: {
            get: () => new WeakMapPredicate(options),
        },
        set: {
            get: () => new SetPredicate(options),
        },
        weakSet: {
            get: () => new WeakSetPredicate(options),
        },
        function: {
            get: () => new Predicate('Function', options),
        },
        buffer: {
            get: () => new Predicate('Buffer', options),
        },
        regExp: {
            get: () => new Predicate('RegExp', options),
        },
        promise: {
            get: () => new Predicate('Promise', options),
        },
        typedArray: {
            get: () => new TypedArrayPredicate('TypedArray', options),
        },
        int8Array: {
            get: () => new TypedArrayPredicate('Int8Array', options),
        },
        uint8Array: {
            get: () => new TypedArrayPredicate('Uint8Array', options),
        },
        uint8ClampedArray: {
            get: () => new TypedArrayPredicate('Uint8ClampedArray', options),
        },
        int16Array: {
            get: () => new TypedArrayPredicate('Int16Array', options),
        },
        uint16Array: {
            get: () => new TypedArrayPredicate('Uint16Array', options),
        },
        int32Array: {
            get: () => new TypedArrayPredicate('Int32Array', options),
        },
        uint32Array: {
            get: () => new TypedArrayPredicate('Uint32Array', options),
        },
        float32Array: {
            get: () => new TypedArrayPredicate('Float32Array', options),
        },
        float64Array: {
            get: () => new TypedArrayPredicate('Float64Array', options),
        },
        arrayBuffer: {
            get: () => new ArrayBufferPredicate('ArrayBuffer', options),
        },
        sharedArrayBuffer: {
            get: () => new ArrayBufferPredicate('SharedArrayBuffer', options),
        },
        dataView: {
            get: () => new DataViewPredicate(options),
        },
        iterable: {
            get: () => new Predicate('Iterable', options),
        },
        any: {
            value: (...predicates) => new AnyPredicate(predicates, options),
        },
    });
    return object;
};
/* harmony default export */ const dist_predicates = (predicates);

















;// CONCATENATED MODULE: ./node_modules/ow/dist/modifiers.js

const modifiers = (object) => {
    Object.defineProperties(object, {
        optional: {
            get: () => dist_predicates({}, { optional: true }),
        },
    });
    return object;
};
/* harmony default export */ const dist_modifiers = (modifiers);

;// CONCATENATED MODULE: ./node_modules/ow/dist/index.js






const dist_ow = (value, labelOrPredicate, predicate) => {
    if (!isPredicate(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
        throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
    }
    if (isPredicate(labelOrPredicate)) {
        // If the second argument is a predicate, infer the label
        const stackFrames = callsites();
        test(value, () => inferLabel(stackFrames), labelOrPredicate);
        return;
    }
    test(value, labelOrPredicate, predicate);
};
Object.defineProperties(dist_ow, {
    isValid: {
        value(value, predicate) {
            try {
                test(value, '', predicate);
                return true;
            }
            catch {
                return false;
            }
        },
    },
    create: {
        value: (labelOrPredicate, predicate) => (value, label) => {
            if (isPredicate(labelOrPredicate)) {
                const stackFrames = callsites();
                test(value, label ?? (() => inferLabel(stackFrames)), labelOrPredicate);
                return;
            }
            test(value, label ?? (labelOrPredicate), predicate);
        },
    },
});
// Can't use `export default predicates(modifiers(ow)) as Ow` because the variable needs a type annotation to avoid a compiler error when used:
// Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)
// See https://github.com/microsoft/TypeScript/issues/36931 for more details.
const _ow = dist_predicates(dist_modifiers(dist_ow));
/* harmony default export */ const ow_dist = (_ow);




;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/dom/isNode/index.js
/**
 * Checks whether the specified object is a DOM element
 * @param el{*} - source object
 * @return {boolean}
 * @example
 * // How to check if object is dom node?
 * const isMyElNode = isNode(document.getElementById("test"));
 * console.log(isMyElNode) // => boolean
 */
const isNode_isNode=el=>el instanceof Element||el instanceof HTMLDocument;
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/setCSSVar/index.js

/**
 * Sets CSS3 variable to specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} - DOM element
 * @param variable{String} - variable name
 * @param value{String|Number|Boolean=} - variable value
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @example
 * // How to set CSS variable to div?
 * // <div id="myBlock"></div>
 * const block = document.getElementById("myBlock");
 * setCSSVar(block, "myVar", 10);
 * // <div id="myBlock" style="--myVar: 10"></div>
 */const setCSSVar=(el=ssr_window_esm_getDocument().documentElement,variable,value="")=>{ow_dist(el,ow_dist.object.validate((value=>({validator:isNode_isNode(value),message:`The object must be node`}))));ow_dist(variable,ow_dist.string.not.empty);ow_dist(value,ow_dist.any(ow_dist.string,ow_dist.number,ow_dist.boolean));el.style.setProperty(variable.startsWith("--")?variable:`--${variable}`,value+"")};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/css/index.js

//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./src/js/scrollManagement.js


//Класс помощник для контроля скрола страницы. Если надо где-либо запретить скрол - lock(), разрешить снова unscroll()
// ВАЖНО! иметь следующие стили в css, чтобы все корректно работало
// html.noscroll {
// 	position: fixed;
// 	overflow-y: scroll;
// 	width: 100%;
// 	top: var(--st);
// }
class ScrollManagement {
	static instance
	constructor() {
		if (!ScrollManagement.instance) {
			ScrollManagement.instance = this
		}

		this.state = {
			isLocked: false,
		}

		this.cssVars = {
			st: "--st",
		}

		this.lastPosition = 0

		return ScrollManagement.instance
	}

	lock() {
		this.state.isLocked = true
		setCSSVar(
			document.documentElement,
			this.cssVars.st,
			-1 * document.documentElement.scrollTop + "px"
		)
		this.lastPosition = document.documentElement.scrollTop
		document.documentElement.classList.add("noscroll")
	}

	unlock() {
		this.state.isLocked = false
		document.documentElement.classList.remove("noscroll")
		window.scrollTo(0, this.lastPosition)
	}

	get isLocked() {
		return this.state.isLocked
	}
}
;// CONCATENATED MODULE: ./src/components/overlay/index.js


class Overlay {
	static instance
	constructor() {
		if (!Overlay.instance) {
			Overlay.instance = this
		}

		this.state = {
			isActive: false,
		}

		this.selectors = {
			overlay: `[data-js="overlay"]`,
		}

		this.stateClasses = {
			isActive: "isActive",
		}

		this.extraClasses = []

		this.findElements()

		return Overlay.instance
	}

	findElements() {
		this.overlay = document.querySelector(this.selectors.overlay)
	}

	checkElements() {
		return this.overlay ? true : false
	}

	show(...extraClasses) {
		if (this.checkElements()) {
			this.state.isActive = true
			this.overlay.classList.add(this.stateClasses.isActive)
			if (extraClasses.length !== 0) {
				extraClasses.forEach((className) => {
					this.extraClasses.push(className)
					this.overlay.classList.add(className)
				})
			}
		}
	}

	hide() {
		if (this.checkElements()) {
			this.state.isActive = false
			this.overlay.classList.remove(this.stateClasses.isActive)
			if (this.extraClasses.length !== 0) {
				this.extraClasses.forEach((className) => {
					this.overlay.classList.remove(className)
				})
			}
		}
	}
}

;// CONCATENATED MODULE: ./src/components/sidebar/index.js





class Sidebar {
	static instance
	constructor() {
		if (!Sidebar.instance) {
			Sidebar.instance = this
		}
		this.state = {
			isActive: false,
		}
		this.selectors = {
			burger: `[data-js-sidebar-burger-btn]`,
			sidebarMenu: `[data-js-sidebar-menu]`,
		}
		this.stateClasses = {
			isActive: "isActive",
		}

		this.firstInit()
		this.acceptEvents()

		return Sidebar.instance
	}

	firstInit() {
		this.burger = document.querySelector(this.selectors.burger)
		this.sidebarMenu = document.querySelector(this.selectors.sidebarMenu)
	}

	checkElements() {
		return this.burger && this.sidebarMenu ? true : false
	}

	open() {
		if (this.checkElements()) {
			this.state.isActive = true
			this.burger.classList.add(this.stateClasses.isActive)
			this.sidebarMenu.classList.add(this.stateClasses.isActive)
			Overlay.instance.show("z-index2")
			ScrollManagement.instance.lock()
		}
	}

	hide() {
		if (this.checkElements()) {
			this.state.isActive = false
			this.burger.classList.remove(this.stateClasses.isActive)
			this.sidebarMenu.classList.remove(this.stateClasses.isActive)
			Overlay.instance.hide()
			ScrollManagement.instance.unlock()
		}
	}

	toggleMenu(e) {
		//на случай если у кнопки не будет type=button
		e.preventDefault()

		e.stopPropagation()
		this.state.isActive = !this.state.isActive
		this.state.isActive ? this.open() : this.hide()
	}

	handleKeydownClick(e) {
		if (this.state.isActive) {
			if (e.key === "Escape") {
				this.toggleMenu(e)
			}
		}
	}

	//"клик" вне области sidebar
	handleClosure(e) {
		if (this.state.isActive) {
			!this.sidebarMenu.contains(e.target) && this.hide()
		}
	}

	acceptEvents() {
		if (this.checkElements()) {
			window.addEventListener("click", (e) => {
				this.handleClosure(e)
			})
			this.burger.addEventListener("click", (e) => {
				this.toggleMenu(e)
			})
			document.addEventListener("keydown", (e) => {
				this.handleKeydownClick(e)
			})
		}
	}
}

;// CONCATENATED MODULE: ./src/components/modal/index.js





/**
 * Класс для создания модальных окон.
 * Элементу, которые должен открывать определенное модальное окно необходимо повесить атрибут data-js-modal-trigger="имя_модального_окна"
 * Элементу, который будет модальным окном, необходимо повесить атрибут data-js-modal="имя_модального_окна"
 * Внутри элемента модального окна должен быть элемент, закрывающий его, с атрибутом data-js-close-modal-btn
 */
class Modal {
	static instance
	constructor() {
		if (!Modal.instance) {
			Modal.instance = this
		}
		this.state = {
			isActive: "isActive",
		}

		this.selectors = {
			trigger: `data-js-modal-trigger`,
			modal: `data-js-modal`,
			closeModalBtn: "data-js-close-modal-btn",
			flowContainer: "data-js-flowContainer",
			sidebarMenu: `data-js-sidebar-menu`,
		}

		this.stateClasses = {
			isActive: "isActive",
		}

		this.currentOpenModal
		this.init()
		this.acceptEvents()

		return Modal.instance
	}

	init() {
		this.triggers = document.querySelectorAll(`[${this.selectors.trigger}]`)
		this.modals = document.querySelectorAll(`[${this.selectors.modal}]`)
		this.closeModalsBtns = document.querySelectorAll(
			`[${this.selectors.closeModalBtn}]`
		)
		this.flowContainer = document.querySelector(
			`[${this.selectors.flowContainer}]`
		)
		this.sidebarMenu = document.querySelector(`[${this.selectors.sidebarMenu}]`)
	}

	checkElements() {
		return this.triggers && this.modals && this.closeModalsBtns ? true : false
	}

	open(e) {
		//на случай, если у триггера будет какой-нибудь условный submit
		e.preventDefault()

		e.stopPropagation()
		this.createInert()
		const modalName = e.target.getAttribute(this.selectors.trigger)
		this.modals.forEach((modal) => {
			if (modal.getAttribute(this.selectors.modal) === modalName) {
				modal.classList.add(this.stateClasses.isActive)
				this.state.isActive = true
				Overlay.instance.show("z-index4")
				ScrollManagement.instance.lock()
				this.currentOpenModal = modal
			}
		})
	}

	hide() {
		this.state.isActive = false
		if (this.currentOpenModal) {
			this.currentOpenModal.classList.remove(this.stateClasses.isActive)
			this.currentOpenModal = null
		}
		this.removeInert()
		Overlay.instance.hide()
		ScrollManagement.instance.unlock()
	}

	//"клик" вне области Modal окна
	handleClosure(e) {
		if (this.state.isActive && this.currentOpenModal) {
			!this.currentOpenModal.contains(e.target) && this.hide()
		}
	}

	//esc - закрыть модалку
	handleKeydown(e) {
		if (this.state.isActive) {
			if (e.key === "Escape") {
				this.hide(e)
			}
		}
	}

	//inert атрибут для flowContainer и для sidebarmenu
	createInert() {
		if (this.flowContainer && this.sidebarMenu) {
			this.flowContainer.setAttribute("inert", "")
			this.sidebarMenu.setAttribute("inert", "")
		}
	}

	removeInert() {
		if (this.flowContainer && this.sidebarMenu) {
			this.flowContainer.removeAttribute("inert")
			this.sidebarMenu.removeAttribute("inert")
		}
	}

	acceptEvents() {
		if (this.checkElements()) {
			window.addEventListener("click", (e) => {
				this.handleClosure(e)
			})

			window.addEventListener("keydown", (e) => {
				this.handleKeydown(e)
			})

			this.triggers.forEach((trigger) => {
				trigger.addEventListener("click", (e) => {
					this.open(e)
				})
			})
			this.closeModalsBtns.forEach((closeBtn) => {
				closeBtn.addEventListener("click", (e) => {
					this.hide(e)
				})
			})
		}
	}

	get isActive() {
		return this.state.isActive
	}
}

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/dom/getElSiblings/index.js

/**
 * Gets array of all siblings of given node
 * @param el{Node|Element|HTMLElement} - node
 * @return {Array}
 * @example
 * // How to get all siblings of `li` DOM-element with specific ID?
 * // <ul>
 * //   <li id="item1">One</li>
 * //   <li id="item2">Two</li>
 * //   <li id="item3">Three</li>
 * // <ul>
 * const secondItem = document.getElementById("item2");
 * getElSiblings(secondItem).filter(item => item !== secondItem) // [ li#item1, li#utem3 ]
 */const getElSiblings=el=>{ow_dist(el,ow_dist.object.validate((value=>({validator:isNode_isNode(value),message:`The object must be node`}))));const siblings=[];let sibling=el?.parentNode?.firstChild;while(sibling){if(sibling.nodeType===1&&sibling!==el)siblings.push(sibling);sibling=sibling.nextSibling}return siblings};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/dom/getElWrapper/index.js

/**
 * Gets a wrapper for specific element
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param str{String} - string of wrapper HTML layout (supports nested blocks)
 * @return {ChildNode}
 * @example
 * // How to wrap content to the few nested `div` blocks?
 * // <div id="block">My Element</div>
 * const wrapperLayout = `
 *  <div class="wrapper">
 *    <div class="wrapper__inner"></div>
 *  </div>
 * `;
 * const el = document.getElementById("block");
 * const wrapped = getElWrapper(el, wrapperLayout);
 * console.log(wrapped.outerHTML); // => `<div class="wrapper"><div class="wrapper__inner"><div id="block">My Element</div></div></div>`
 */const getElWrapper=(el,str)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:`The object must be node`}))));ow(str,ow.string.not.empty);const temp=getDocument().createElement("div");const parent=el.parentNode;const insertWhere=el.previousSibling;let target;temp.innerHTML=str;target=temp.firstChild;while(target.firstChild)target=target.firstChild;target.appendChild(el);parent.insertBefore(temp.firstChild,insertWhere?insertWhere.nextSibling:parent.firstChild);return target};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/dom/index.js

//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/json/getJSONFromStr/index.js

/**
 * Gets safely parsed JSON from string
 * @param str{String} - source string
 * @param reviver{Function=} - reviver function
 * @param onError{Function=} - error callback
 * @return {Object}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * @example
 * // How convert string to JSON?
 * const json = getJSONFromStr('{ "hello": "world" }');
 * console.log(json.hello) // => "world"
 */const getJSONFromStr=(str,reviver,onError)=>{ow_dist(str,ow_dist.string);ow_dist(reviver,ow_dist.optional.function);ow_dist(onError,ow_dist.optional.function);let json={};try{json=JSON.parse(str,reviver)}catch(err){if(typeof onError==="function")onError(err)}return json};
//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/toastify-js/src/toastify.js
var toastify = __webpack_require__(588);
var toastify_default = /*#__PURE__*/__webpack_require__.n(toastify);
;// CONCATENATED MODULE: ./src/js/utils/utils.js



/**
 * Функция задержки
 * @param {number} ms - миллисекунды для задержки
 * @returns {Promise}
 */
function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
function createSuccessfulToast(text) {
	toastify_default()({
		text: text ?? "Данные успешно отправлены. Мы свяжемся с вами 🚀",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_success",
		onClick: function () {}, // Callback after click
	}).showToast()
}
/**
 * Функция создания уведомления о неудаче или ошибке.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {string | undefined} text - Текст сообщения, если не отправим, будет дефолтное уведомление
 * @returns {undefined}
 */
function createErrorToast(text) {
	Toastify({
		text: text ?? "Что-то пошло не так, попробуйте позже 🤨",
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "bottom", // `top` or `bottom`
		position: "center", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "toast_error",
		style: {
			background: "rgba(121,9,9,1)",
		},
		onClick: function () {}, // Callback after click
	}).showToast()
}

/**
 * Функция создания уведомления о неудаче или ошибке.
 * Обертка над классом Toastify из библиотеки toastify-js
 * @param {any} functionToCheck - Функция или любой другой объект
 * @returns {boolean}
 */
function isFunction(functionToCheck) {
	return (
		functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
	)
}
;// CONCATENATED MODULE: ./src/components/form/index.js







class FormValidator {
	static instance
	defaultState = {}
	constructor() {
		if (!FormValidator.instance) {
			FormValidator.instance = this
		}

		this.state = {
			isPending: false,
		}

		this.stateClasses = {
			errorValidate: "form-contact__error-validate",
			goodValidate: "form-contact__good-validate",
		}

		this.selectors = {
			formData: "data-js-form",
			form: "data-js-form-name",
			errorMessage: "data-js-form-validate-message",
			input: "data-js-form-input",
			submitBtn: "data-js-form-submit-btn",
			inputType: "data-js-input-type",
		}

		//храним различные формы у станицы
		//this.forms = {"имя_формы": {form: DOMElement, "inputs": {0:{input:DOMElement, statusValidate: false}}, "submitBtn", DOMElement}}
		this.forms = {}

		this.EMAIL_REGEXP =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

		this.init()
		this.acceptSubmits()
		return FormValidator.instance
	}

	init() {
		document.querySelectorAll(`[${this.selectors.form}]`).forEach((form) => {
			const key = form.getAttribute(this.selectors.form)
			const inputs = [...form.querySelectorAll(`[${this.selectors.input}]`)]
			const submitBtn = form.querySelector(`[${this.selectors.submitBtn}]`)

			const inputsStatus = inputs.map((input) => {
				return {
					input,
					statusValidate: false,
				}
			})
			if (key && inputs && submitBtn) {
				this.forms[key] = {
					form,
					inputs: inputsStatus,
					submitBtn,
				}
			}
			this.createFocusValidate(key)
		})
	}

	checkElements() {
		return Object.entries(this.forms).length > 0
	}

	//по имени формы (ключ) получает ее input поля и добавляет проверку валидации на поля, в случае события blur или input
	//здесь я хотел бы сделать проверку, что если весь список inputs у формы свалидирован (у всех statusValidate=True)
	//то, например, активировать кнопку submit, но пока не хватает времени
	createFocusValidate(key) {
		if (this.forms) {
			this.forms[key].inputs.forEach((inputObj) => {
				inputObj.input.addEventListener("blur", (e) => {
					this.validateHandler(e, inputObj)
				})
				inputObj.input.addEventListener("input", (e) => {
					this.validateHandler(e, inputObj)
				})
			})
		}
	}

	//валидация при input / blur
	validateHandler(e, inputObj) {
		const inputType = e.target.getAttribute(this.selectors.inputType)
		if (inputType) {
			inputObj.statusValidate = this.validateElement(inputType, e.target)
		}
	}

	//валидация при submit
	validateOnSubmitHandler(inputs) {
		if (inputs) {
			inputs.forEach((inputObj) => {
				const inputType = inputObj.input.getAttribute(this.selectors.inputType)
				inputObj.statusValidate = this.validateElement(
					inputType,
					inputObj.input
				)
			}, [])
		}
	}

	//функция определяющая какой тип валидации и у какого input поля будет
	validateElement(type, input) {
		switch (type.toLowerCase()) {
			case "text":
				return this.validateText(input)
			case "email":
				return this.validateEmail(input)
			default:
				break
		}
	}

	//return true в случае успешной валидации, false - не успешной
	validateEmail(input) {
		const notifyNode = getElSiblings(input).find((el) =>
			el.hasAttribute(this.selectors.errorMessage)
		)
		if (notifyNode) {
			if (this.EMAIL_REGEXP.test(input.value)) {
				this.goodValidate(notifyNode)
				return true
			} else {
				this.errorValidate(notifyNode, "Enter the correct email address")
				return false
			}
		}
		return false
	}

	//правила для валидации текста можно занести в регулярное выражение, как с email.
	//можно корректировать валидацию для текстовых полей
	//return true в случае успешной валидации, false - не успешной
	validateText(input) {
		const notifyNode = getElSiblings(input).find((el) =>
			el.hasAttribute(this.selectors.errorMessage)
		)
		if (notifyNode) {
			if (input.value.length === 0) {
				this.errorValidate(notifyNode, "Please enter a text")
				return false
			} else {
				this.goodValidate(notifyNode)
				return true
			}
		}
		return false
	}

	goodValidate(notifyNode, text = "") {
		notifyNode.innerHTML = text
		notifyNode.parentNode.classList.remove(this.stateClasses.errorValidate)
		notifyNode.parentNode.classList.add(this.stateClasses.goodValidate)
	}

	errorValidate(notifyNode, text = "") {
		notifyNode.innerHTML = text
		notifyNode.parentNode.classList.remove(this.stateClasses.goodValidate)
		notifyNode.parentNode.classList.add(this.stateClasses.errorValidate)
	}

	//обработка submit у формы
	//дополнительный функционал, который может быть нужно выполнить
	//например, у меня форма в модальном окне + overlay, мне нужно попросить эти модули выполнить определенный функционал для этой формы
	//в общем я не знаю, как лучше и более правильно это сделать, сейчас я сделал это через конфигурацию data атрибута формы. Но может этого будет не достаточно в будущем.
	async submitForm(e, key, fnCallback) {
		//убираю перезагрузку страницы
		e.preventDefault()

		//если уже отправляются данные с какой либо другой формы
		if (this.state.isPending) {
			return
		}

		this.validateOnSubmitHandler(this.forms[key].inputs)

		//получаю данные о url,method, а также сообщение об успехе и нужно ли закрывать модальное окно из дата атрибута формы
		const { url, method, suscсessMsg, isCloseAllModalsAfterSuccess } =
			getJSONFromStr(this.forms[key].form.getAttribute(this.selectors.formData))
		if (!(url && method)) {
			this.onError()
			if (fnCallback) fnCallback()
			return
		}

		//счетчик корректно заполненных input
		let correctInput = 0
		this.forms[key].inputs.forEach((inputObj) => {
			if (inputObj.statusValidate) ++correctInput
		})

		//если все input у выбранной формы заполнены корректно
		if (correctInput === this.forms[key].inputs.length) {
			//собираем данные с формы
			const data = this.serializeForm(this.forms[key].form)
			//активируем лоадер (что делаем пока ждем)
			this.toggleLoader()
			//Блокируем кнопку submit во время выполнения запроса (без флуда)
			this.lockSubmitBtn(this.forms[key].submitBtn)
			//Запрос начинается
			this.state.isPending = true
			// инициализируем запрос, ждем, получаем ответ
			const { status } = await this.sendData(data, url, method)
			if (status === 200) {
				//если в конфиге формы было сообщение об успешной отправке
				if (suscсessMsg) this.onSuccess(suscсessMsg)
			} else {
				this.onError()
			}

			//если в конфиге формы было уведомление, что надо закрывать модальные окна
			if (isCloseAllModalsAfterSuccess === "true") Modal.instance.hide()
			//Разблокируем кнопку submit
			this.unlockSubmitBtn(this.forms[key].submitBtn)
			//Очищаем input поля
			this.clearInputs(this.forms[key].inputs)
			//Запрос завершен
			this.state.isPending = false
			//Вызываем дополнительный функционал, если есть и если это функция
			if (isFunction(fnCallback)) fnCallback()
		}
	}
	//сериализую данные с формы в FormData
	serializeForm(formNode) {
		const { elements } = formNode
		const data = new FormData()
		Array.from(elements)
			.filter((item) => !!item.name)
			.forEach((element) => {
				const { name, type } = element
				const value = type === "checkbox" ? element.checked : element.value
				data.append(name, value)
			})
		return data
	}

	//отправка данных
	async sendData(data, url, method = "POST") {
		return await fetch(url, {
			method: method,
			headers: { "Content-Type": "multipart/form-data" },
			body: data,
		})
	}

	//блокируем кнопку отправки
	lockSubmitBtn(submitNode) {
		submitNode.disabled = true
	}

	//разблокируем кнопку отправки
	unlockSubmitBtn(submitNode) {
		submitNode.disabled = false
	}

	//чистка inputs
	clearInputs(inputs) {
		if (inputs) {
			inputs.forEach((inputObj) => {
				inputObj.statusValidate = false
				inputObj.input.value = ""
				inputObj.input.parentNode.classList.remove(
					this.stateClasses.errorValidate
				)
				inputObj.input.parentNode.classList.remove(
					this.stateClasses.goodValidate
				)
			})
		}
	}

	//во время отправки можно показать / скрыть loader (не было времени)
	toggleLoader() {}

	//данные успешно отправились
	onSuccess(msg) {
		createSuccessfulToast(msg)
	}
	//произошла ошибка при отправке, для тестового убрал error, всегда success :)
	onError() {
		createSuccessfulToast("Your message successfully sent 🚀")
	}

	acceptSubmits() {
		if (this.checkElements()) {
			for (const [key, value] of Object.entries(this.forms)) {
				value.form.addEventListener("submit", (e) => {
					this.submitForm(e, key)
				})
			}
		}
	}
}

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/user/cookie/index.js

/**
 * Gets the Cookie value
 * @param name{String} - name of Cookie
 * @return {string|undefined}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to get value of Cookie?
 * setCookie("myCookieName", "myValue");
 * const savedValue = getCookie("myCookieName");
 * console.debug(savedValue); // => "myValue"
 */const getCookie=name=>{ow(name,ow.string);const matches=getDocument().cookie.match(new RegExp("(?:^|; )"+name.replace(/([$?*|{}\]\\^])/g,"\\$1")+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):void 0};
/**
 * Sets the Cookie value
 * @param name{String} - name of Cookie
 * @param value{String} - value of Cookie
 * @param options{Object=} - options of Cookie
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to set Cookie for one day or other time?
 * setCookie("myCookie", "value", { expires: 86400 }) // expires in sec
 */const setCookie=(name,value,options={})=>{ow(name,ow.string);ow(value,ow.string);ow(options,ow.object);let expires=options.expires;if(typeof expires==="number"&&expires){const d=new Date;d.setTime(d.getTime()+expires*1000);expires=options.expires=d}if(expires&&expires.toUTCString)options.expires=expires.toUTCString();value=encodeURIComponent(value);let updatedCookie=name+"="+value;for(let propName in options){updatedCookie+="; "+propName;let propValue=options[propName];if(propValue!==true)updatedCookie+="="+propValue}getDocument().cookie=updatedCookie};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/user/getScrollbarWidth/index.js

/**
 * Gets width of user scrollbar
 * @return {number}
 * @example
 * // How to get width of user scrollbar?
 * const scrollbarWidth = getScrollBarWidth();
 * console.log(scrollbarWidth); // => number
 */const getScrollbarWidth=()=>{const doc=ssr_window_esm_getDocument();const outer=doc.createElement("div");outer.style.visibility="hidden";outer.style.overflow="scroll";outer.style.msOverflowStyle="scrollbar";doc.body.appendChild(outer);const inner=doc.createElement("div");outer.appendChild(inner);const scrollbarWidth=outer.offsetWidth-inner.offsetWidth;outer.parentNode.removeChild(outer);return scrollbarWidth};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/user/isMobileDevice/index.js

/**
 * Checks  if the user is using a mobile browser
 * @return {boolean}
 * @example
 * // How to detect mobile browser?
 * const isMobile = isMobileDevice();
 * console.debug(isMobile); // => false
 */const isMobileDevice=()=>{const win=getWindow();let isMobile=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))isMobile=true})(win.navigator.userAgent||win.navigator.vendor||win.opera);return isMobile};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/user/isTouchDevice/index.js

/**
 * Checks if user devise has touchscreen
 * @return {boolean}
 * @example
 * // How to check if user has touchscreen device?
 * const isTouchEnabled = isTouchDevice();
 * console.log(isTouchEnabled); // => false
 */const isTouchDevice=()=>{const win=getWindow();return!!("ontouchstart"in win||typeof win.navigator.maxTouchPoints!=="undefined"&&win.navigator.maxTouchPoints||typeof win.navigator.msMaxTouchPoints!=="undefined"||win.DocumentTouch&&getDocument()instanceof win.DocumentTouch||win.navigator.msPointerEnabled&&win.MSGesture)};
//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@web3r/flowerkit/dist/user/index.js

//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./src/app.js






















setCSSVar(
	document.documentElement,
	"--scrollbar-width",
	`${getScrollbarWidth()}px`
)

const init = () => {
	new ScrollManagement()
	new Overlay()
	new Modal()
	new FormValidator()
	new Sidebar()
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})

})();

/******/ })()
;