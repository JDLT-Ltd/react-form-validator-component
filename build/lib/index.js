!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,a=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/,o=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,i=/^[+]?(\d{1,3})\s?(\d{10})$/,u=/^(([A-Za-z0-9]{2,4})\s?([A-Za-z0-9]{1,5})?)?$/,l={validator:function(e){return!!e.match(o)},error:"Please provide a full name"},s={validator:function(e){return!!e.match(n)},error:"Please provide a valid email address"},d={validator:function(e){return!!e.match(a)},error:"Please provide a valid email address, or several emails comma delimited"},c={validator:function(e){return!!e.match(i)},error:"Please provide a valid UK phone number"},f={validator:function(e){return!!e.match(u)},error:"Please provide a valid UK postcode"};t.isRequired={validator:function(e){return!!e},error:"Please provide a value"},t.isEmail=s,t.isEmailArray=d,t.isFullName=l,t.isPhoneNumber=c,t.isPostcode=f},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";var n=r(1);function a(){}e.exports=function(){function e(e,t,r,a,o,i){if(i!==n){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=a,r.PropTypes=r,r}},function(e,t,r){e.exports=r(2)()},function(e,t){e.exports=require("react")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=l(r(4)),i=l(r(3)),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(0));function l(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onValidate=function(e,t){r.props.parent.setState(d({},e,t))},r.toArray=function(e){return Object.entries(e).reduce(function(e,t){var r=n(t,2),a=r[0],o=r[1];return e.concat({key:a,value:o})},[])},r.addToStateProperty=function(e,t){r.setState(d({},r.state[e],Object.assign(r.state[e],t)))},r.removeError=function(e,t){var n=r.state.errors[e],a=n.indexOf(t);a>-1&&n.splice(a,1),r.addToStateProperty("errors",d({},e,n))},r.updateErrorsForField=function(e,t,n){e?r.removeError(t,n):r.addToStateProperty("errors",d({},t,[].concat(s(new Set([].concat(s(r.state.errors[t]||[]),[n]))))))},r.validateRules=function(e,t,n){return n.reduce(function(n,a){var o=u[a]||a,i=o.validator(t);return r.updateErrorsForField(i,e,o.error),n&&i},!0)},r.validateField=function(e,t){var n=r.state.fields[e].rules,a=r.validateRules(e,t,n);return console.log(a),r.setState({validation:Object.assign(r.state.validation,d({},e,a))}),a},r.checkGroupValid=function(e,t,n){return e.some(function(e){return!!e.rules.reduce(function(e,a){var o=u[a]||a,i=o.validator(n);return r.updateErrorsForField(i,t,o.error),e&&i},!0)})},r.validateGroup=function(e,t){var n=r.state.fields[e],a=Object.values(r.state.fields).filter(function(e){return e.required===n.required});r.setState({validation:Object.assign(r.state.validation,d({},n.required,!1))});var o=r.checkGroupValid(a,e,t);return o&&r.setState({validation:Object.assign(r.state.validation,d({},n.required,!0))}),o},r.validateFormAndUpdateState=function(){Object.values(r.props.fields).map(function(e){return e.name}).forEach(function(e){var t=document.getElementsByName(e)[0]?document.getElementsByName(e)[0].value:"";t&&r.validateFieldAndUpdateState(e,t)})},r.onChange=function(e){r.validateFieldAndUpdateState(e.target.name,e.target.value)},r.state={fields:e.fields,errors:Object.keys(e.fields).reduce(function(e,t){return e[t]=[],e},{}),validation:Object.keys(e.fields).reduce(function(t,r){var n=e.fields[r];return n.required&&"string"==typeof n.required?(t[n.required]=!(n.rules&&n.rules.length>0),t):(t[r]=!(n.rules&&n.rules.length>0),t)},{}),isFormValid:!1},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.default.Component),a(t,[{key:"validateFieldAndUpdateState",value:function(e,t){var r=this.props.fields[e].onValidate||this.props.onValidate||this.onValidate;"string"==typeof this.props.fields[e].required?this.validateGroup(e,t)?r(e,t):r(e,null):this.validateField(e,t)?r(e,t):r(e,null),this.setState({isFormValid:Object.values(this.state.validation).every(function(e){return e})})}},{key:"componentDidMount",value:function(){this.props.validateOnLoad&&this.validateFormAndUpdateState()}},{key:"render",value:function(){var e=this.state,t=e.fields,r=e.errors,n=e.isFormValid,a=e.validation;return this.props.children({isFormValid:n,isFieldValid:a,fields:this.toArray(t),onChange:this.onChange,errors:r})}}]),t}();t.default=c,c.propTypes={parent:i.default.object,children:i.default.func,onValidate:i.default.func,fields:i.default.object,validateOnLoad:i.default.bool}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Validator=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r(5));t.Validator=n.default}]));