!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=6)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,a=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/,i=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,o=/^[+]?(\d{1,3})\s?(\d{10})$/,u=/^(([A-Za-z0-9]{2,4})\s?([A-Za-z0-9]{1,5})?)?$/,s=/^(\d{2}(\s|[-])\d{2}(\s|[-])\d{2}$)|\d{6}|^$/,l=/^((([A-Za-z]{6}[0-9A-Za-z]{2})|([A-Za-z]{4}(\s|-)?[A-Za-z]{2}(\s|-)?[0-9A-Za-z]{2}))[0-9A-Za-z]{3}?$)|^$/,d=/^([0-9A-Za-z]{4}\s?){4,6}([0-9A-Za-z]{1,4}|[0-9A-Za-z]{4}\s?[0-9A-Za-z]{1|4})?$/,c=/^\d{8,15}$/,f=/^[A-Z0-9a-z\-/\s]+$/i,p=/^-?\d*[.]?\d+$/,v=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g,h={validator:function(e){return!!e.match(i)},error:"Please provide a full name"},m={validator:function(e){return!!e.match(n)},error:"Please provide a valid email address"},y={validator:function(e){return!!e.match(a)},error:"Please provide a valid email address, or several emails comma delimited"},b={validator:function(e){return!!e.match(o)},error:"Please provide a valid UK phone number"},g={validator:function(e){return!!e.match(u)},error:"Please provide a valid UK postcode"},O={validator:function(e){return!!e.match(s)},error:"Please provide a UK Sort Code"},j={validator:function(e){return!!e.match(l)},error:"Please provide a valid Swift Code"},A={validator:function(e){return!!e.match(d)},error:"Please provide a valid Swift Code"},P={validator:function(e){return!!e.match(c)},error:"Please provide a valid UK VAT Number"},_={validator:function(e){return!!e.match(f)},error:"Please provide an alphanumeric input"},S={validator:function(e){return"number"==typeof e||!!e.match(p)},error:"Please provide an numeric input"},w={validator:function(e){return!!e.match(v)},error:"Please provide a valid URL"},q={validator:function(e,r){return e.length===r},error:"Please provide an input of exactly "+length+" characters"},z={validator:function(e,r){return e.length<=r},error:"The maximum length of this input is "+length+" characters"},E={validator:function(e,r){return e.length>=r},error:"The minimum length of this input is "+length+" characters"};r.isRequired={validator:function(e){return!(!e&&!1!==e)},error:"Please provide a value"},r.isEmail=m,r.isEmailArray=y,r.isFullName=h,r.isPhoneNumber=b,r.isPostCode=g,r.isSortCode=O,r.isSwiftCode=j,r.isIban=A,r.isVatNumber=P,r.isAlphaNumeric=_,r.isNumeric=S,r.isUrl=w,r.isLength=q,r.maxLength=z,r.minLength=E},function(e,r,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,r,t){"use strict";var n=t(1);function a(){}e.exports=function(){function e(e,r,t,a,i,o){if(o!==n){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function r(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r};return t.checkPropTypes=a,t.PropTypes=t,t}},function(e,r,t){e.exports=t(2)()},function(e,r){e.exports=require("react")},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(){return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,r){var t=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(t.push(o.value),!r||t.length!==r);n=!0);}catch(e){a=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}return t}(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),i=s(t(4)),o=s(t(3)),u=function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}(t(0));function s(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function d(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var c=function(e){function r(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r);var t=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.onValidate=function(e,r){t.props.parent.setState(d({},e,r))},t.toArray=function(e){return Object.entries(e).reduce(function(e,r){var t=n(r,2),a=t[0],i=t[1];return e.concat({key:a,value:i})},[])},t.addToStateProperty=function(e,r){t.setState(d({},e,Object.assign(t.state[e],r)))},t.removeError=function(e,r){var n=t.state.errors[e],a=n.indexOf(r);a>-1&&n.splice(a,1),t.addToStateProperty("errors",d({},e,n))},t.removeAllErrors=function(e){t.setState({errors:Object.assign(t.state.errors,d({},e,[]))})},t.updateErrorsForField=function(e,r,n){e?t.removeError(r,n):t.addToStateProperty("errors",d({},r,[].concat(l(new Set([].concat(l(t.state.errors[r]||[]),[n]))))))},t.validateRules=function(e,r,n){return n.reduce(function(n,a){var i=u[a]||a,o=i.validator(r);return t.updateErrorsForField(o,e,i.error),n&&o},!0)},t.validateGroup=function(e,r,n){if(t.state.groupValidation[n]&&Object.entries(t.state.groupValidation[n]).filter(function(r){return!r.includes(e)}).some(function(e){return e.includes(!0)})){var a=t.props.fields[e].rules,i=t.validateRules(e,r,a);return t.setState({groupValidation:Object.assign({},t.state.groupValidation[n],d({},e,i))}),!0}var o=t.props.fields[e].rules,u=t.validateRules(e,r,o),s=t.state.groupValidation;return s[n]=Object.assign({},s[n],d({},e,u)),t.setState({groupValidation:Object.assign({},t.state.groupValidation,s)},function(){return t.setState({validation:Object.assign(t.state.validation,d({},n,Object.values(t.state.groupValidation[n]).some(function(e){return!0===e})))})}),u},t.validateField=function(e,r){var n=t.props.fields[e].required&&"string"==typeof t.props.fields[e].required?t.props.fields[e].required:void 0;if(!n&&!t.props.fields[e].required&&0===r.length)return t.setState({validation:Object.assign(t.state.validation,d({},e,!0))},function(){return t.removeAllErrors(e)}),!0;if(n)return t.validateGroup(e,r,n);var a=t.props.fields[e].rules,i=t.validateRules(e,r,a);return t.setState({validation:Object.assign(t.state.validation,d({},e,i))}),i},t.validateFormAndUpdateState=function(){Object.values(t.props.fields).map(function(e){return e.name}).filter(function(e){return e}).forEach(function(e){var r=document.getElementsByName(e)[0]&&document.getElementsByName(e)[0].value?document.getElementsByName(e)[0].value:"";t.validateFieldAndUpdateState(e,r)})},t.onChange=function(e,r){var n=r||e.target;t.validateFieldAndUpdateState(n.name,n.value)},t.validateFieldsInput=function(){Object.values(t.props.fields).forEach(function(e){if(!e.name)throw new Error("Please provide a name value for all of your fields");if(!e.rules)throw new Error("Please provide a rules array for each field (or an empty array for non-validated fields)")})},t.state={errors:Object.keys(e.fields).reduce(function(e,r){return e[r]=[],e},{}),groupValidation:Object.keys(e.fields).reduce(function(r,t){var n=e.fields[t];return n.required&&"string"==typeof n.required?(r[n.required]=Object.assign({},r[n.required],d({},t,!(n.rules&&n.rules.length>0||n.required))),r):r},{}),validation:Object.keys(e.fields).reduce(function(r,t){var n=e.fields[t];return n.required&&"string"==typeof n.required?(r[n.required]=!1,r):(r[t]=!(n.rules&&n.rules.length>0||n.required),r)},{}),isFormValid:!1},t}return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}(r,i.default.Component),a(r,[{key:"componentDidUpdate",value:function(e){var r=this;this.props.fields!==e.fields&&this.setState({fields:this.props.fields,errors:Object.keys(this.props.fields).reduce(function(e,r){return e[r]=[],e},{}),groupValidation:Object.keys(this.props.fields).reduce(function(e,t){var n=r.props.fields[t];return n.required&&"string"==typeof n.required?(e[n.required]=Object.assign({},e[n.required],d({},t,!(n.rules&&n.rules.length>0||n.required))),e):e},{}),validation:Object.keys(this.props.fields).reduce(function(e,t){var n=r.props.fields[t];return n.required&&"string"==typeof n.required?(e[n.required]=!1,e):(e[t]=!(n.rules&&n.rules.length>0||n.required),e)},{}),isFormValid:!1},function(){return console.log("fields has changed")})}},{key:"validateFieldAndUpdateState",value:function(e,r){var t=this.props.fields[e].onValidate||this.props.onValidate||this.onValidate;this.validateField(e,r)?t(e,r):t(e,null),this.setState({isFormValid:Object.values(this.state.validation).every(function(e){return e})})}},{key:"componentDidMount",value:function(){var e=this;this.validateFieldsInput(),Object.values(this.props.fields).forEach(function(r){if(!0===r.required){var t=e.props.fields;t[r.name].rules.push("isRequired"),e.setState({fields:t})}}),this.validateFormAndUpdateState(),this.props.validateOnLoad&&Object.values(this.props.fields).map(function(r){return e.removeAllErrors(r.name)})}},{key:"render",value:function(){console.log("this.props here is :",this.props);var e=this.state,r=e.errors,t=e.isFormValid,n=e.validation;return this.props.children({isFormValid:t,isFieldValid:n,fields:this.toArray(this.props.fields||{}),onChange:this.onChange,errors:r})}}]),r}();r.default=c,c.propTypes={parent:o.default.object,children:o.default.func,onValidate:o.default.func,fields:o.default.object,validateOnLoad:o.default.bool},c.defaultProps={validateOnLoad:!0}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Validator=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(t(5));r.Validator=n.default}]));