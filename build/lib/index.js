!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/,o={validator:function(e){return!!e.match(n)},error:"Please provide a valid email address"},a={validator:function(e){return!!e.match(n)},error:"test test test"};t.required={validator:function(e){return!!e},error:"Please provide a value"},t.isEmailArray=o,t.isEmailArray2=a},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";var n=r(1);function o(){}e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=o,r.PropTypes=r,r}},function(e,t,r){e.exports=r(2)()},function(e,t){e.exports=require("react")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=c(r(4)),i=c(r(3)),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(0));function c(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.toArray=function(e){return Object.entries(e).reduce(function(e,t){var r=n(t,2),o=r[0],a=r[1];return e.concat({key:o,value:a})},[])},r.addToStateProperty=function(e,t){r.setState(f({},r.state[e],Object.assign(r.state[e],t)))},r.removeError=function(e,t){var n=r.state.errors[e],o=n.indexOf(t);o>-1&&n.splice(o,1),r.addToStateProperty("errors",f({},e,n))},r.updateErrors=function(e,t,n){e?r.removeError(t,n):r.addToStateProperty("errors",f({},t,[].concat(l(new Set([].concat(l(r.state.errors[t]||[]),[n]))))))},r.validateField=function(e,t){var n=r.state.fields[e].rules.reduce(function(n,o){var a=u[o]||o,i=a.validator(t);return r.updateErrors(i,e,a.error),n&&i},!0);return r.setState({validation:Object.assign(r.state.validation,f({},e,n))}),n},r.onChange=function(e){var t=e.target.name,n=e.target.value;r.validateField(t,n)&&r.props.onChangeValue(e),r.setState({isValid:Object.values(r.state.validation).every(function(e){return e})})},r.state={fields:e.fields,errors:Object.keys(e.fields).reduce(function(e,t){return e[t]=[],e},{}),validation:{},isValid:!1},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"render",value:function(){var e=this.state,t=e.fields,r=e.errors,n=e.isValid;return this.props.children({isValid:n,fields:this.toArray(t),onChange:this.onChange,errors:r})}}]),t}();s.defaultProps={onChangeValue:function(e){(void 0).props.form.setState(f({},e.target.name,e.target.value))}},t.default=s,s.propTypes={form:i.default.object,children:i.default.func,onChangeValue:i.default.func,fields:i.default.object}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Validator=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r(5));t.Validator=n.default}]));