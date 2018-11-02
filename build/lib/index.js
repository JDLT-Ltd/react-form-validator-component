!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(a,i,function(t){return e[t]}.bind(null,i));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=8)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],a=!0,i=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{!a&&l.return&&l.return()}finally{if(i)throw n}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e){return Object.entries(e).reduce(function(e,t){var r=a(t,2),i=r[0],n=r[1];return e.concat({key:i,value:n})},[])}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){console.log("target in addtoState",t),console.log("value in addtoState",t),console.log("context in addToState",r),r.setState(function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}({},e,Object.assign(r.state[e],t)))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,i=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25}(,[ ]{0,1}([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})*$/,n=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,o=/^[+]?(\d{1,3})\s?(\d{10})$/,l=/^(([A-Za-z0-9]{2,4})\s?([A-Za-z0-9]{1,5})?)?$/,s=/^(\d{2}(\s|[-])\d{2}(\s|[-])\d{2}$)|\d{6}|^$/,u=/^((([A-Za-z]{6}[0-9A-Za-z]{2})|([A-Za-z]{4}(\s|-)?[A-Za-z]{2}(\s|-)?[0-9A-Za-z]{2}))[0-9A-Za-z]{3}?$)|^$/,d=/^([0-9A-Za-z]{4}\s?){4,6}([0-9A-Za-z]{1,4}|[0-9A-Za-z]{4}\s?[0-9A-Za-z]{1|4})?$/,c=/^\d{8,15}$/,f=/^[A-Z0-9a-z\-/\s]+$/i,p=/^-?\d*[.]?\d+$/,v=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g,h={validator:function(e){return!!(Array.isArray(e)&&e.length>0||!1===e||e&&!Array.isArray(e))},error:"Please provide a value."},g={validator:function(e){return!!e.match(n)},error:"Please provide a full name"},y={validator:function(e){return!!e.match(a)},error:"Please provide a valid email address"},b={validator:function(e){return!!e.match(i)},error:"Please provide a valid email address, or several emails comma delimited"},m={validator:function(e){return!!e.match(o)},error:"Please provide a valid UK phone number"},O={validator:function(e){return!!e.match(l)},error:"Please provide a valid UK postcode"},j={validator:function(e){return!!e.match(s)},error:"Please provide a UK Sort Code"},V={validator:function(e){return!!e.match(u)},error:"Please provide a valid Swift Code"},P={validator:function(e){return!!e.match(d)},error:"Please provide a valid Swift Code"},A={validator:function(e){return!!e.match(c)},error:"Please provide a valid UK VAT Number"},S={validator:function(e){return!!e.match(f)},error:"Please provide an alphanumeric input"},_={validator:function(e){return"number"==typeof e||!!e.match(p)},error:"Please provide an numeric input"},w={validator:function(e){return!!e.match(v)},error:"Please provide a valid URL"},z={validator:function(e,t){return e.length===t},error:"Please provide an input of exactly "+length+" characters"},E={validator:function(e,t){return e.length<=t},error:"The maximum length of this input is "+length+" characters"},F={validator:function(e,t){return e.length>=t},error:"The minimum length of this input is "+length+" characters"};t.isRequired=h,t.isEmail=y,t.isEmailArray=b,t.isFullName=g,t.isPhoneNumber=m,t.isPostCode=O,t.isSortCode=j,t.isSwiftCode=V,t.isIban=P,t.isVatNumber=A,t.isAlphaNumeric=S,t.isNumeric=_,t.isUrl=w,t.isLength=z,t.maxLength=E,t.minLength=F},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";var a=r(3);function i(){}e.exports=function(){function e(e,t,r,i,n,o){if(o!==a){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=i,r.PropTypes=r,r}},function(e,t,r){e.exports=r(4)()},function(e,t){e.exports=require("react")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=u(r(6)),n=u(r(5)),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(2)),l=u(r(1)),s=u(r(0));function u(e){return e&&e.__esModule?e:{default:e}}function d(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.onValidate=function(e,t){r.props.parent.setState(c({},e,t))},r.removeError=function(e,t){var a=r.state.errors[e],i=a.indexOf(t);i>-1&&a.splice(i,1),(0,l.default)("errors",c({},e,a),r)},r.removeAllErrorMessages=function(e){r.setState({errors:Object.assign(r.state.errors,c({},e,[]))})},r.updateErrorsForField=function(e,t,a){e?r.removeError(t,a):(0,l.default)("errors",c({},t,[].concat(d(new Set([].concat(d(r.state.errors[t]||[]),[a]))))),r)},r.validateRules=function(e,t,a){return a.reduce(function(a,i){var n=o[i]||i,l=n.validator(t);return r.updateErrorsForField(l,e,n.error),a&&l},!0)},r.validateGroup=function(e,t,a){if(console.log("validating group: ",a,"field is",e,"value is",t),r.state.groupValidation[a]&&Object.entries(r.state.groupValidation[a]).filter(function(t){return!t.includes(e)}).some(function(e){return e.includes(!0)})){var i,n;console.log("another member is valid");var o=r.props.fields[e].rules,l=r.validateRules(e,t,o),s=r.state.groupValidation;return s[a]=!t||Array.isArray(t)&&0===t.length||l?Object.assign({},r.state.groupValidation[a],(c(i={},e,l),c(i,"invalidValuePresent",!1),i)):Object.assign({},r.state.groupValidation[a],(c(n={},e,l),c(n,"invalidValuePresent",!0),n)),console.log("options for newGroupValidatioN: ",t,Array.isArray(t)&&0===t.length,l),console.log("!!!! newGroupValidation is: ",s),console.log("setting validation to be",Object.values(Object.assign({},s,{invalidValuePresent:!1})).some(function(e){return!0===e})&&!r.state.groupValidation[a].invalidValuePresent),r.setState({groupValidation:s,validation:Object.assign(r.state.validation,c({},a,Object.values(Object.assign({},s,{invalidValuePresent:!1})).some(function(e){return!0===e})&&!r.state.groupValidation[a].invalidValuePresent))}),Object.values(Object.assign({},r.state.groupValidation[a],{invalidValuePresent:!1})).some(function(e){return!0===e})&&!r.state.groupValidation[a].invalidValuePresent}var u=r.props.fields[e].rules,d=r.validateRules(e,t,u),f=r.state.groupValidation;return f[a]=Object.assign({},f[a],c({},e,d)),r.setState({groupValidation:Object.assign({},r.state.groupValidation,f)},function(){return r.setState({validation:Object.assign(r.state.validation,c({},a,Object.values(r.state.groupValidation[a]).some(function(e){return!0===e})&&!r.state.groupValidation[a].invalidValuePresent))})}),d},r.validateField=function(e,t){var a=r.props.fields[e],i=r.props.fields[e].required&&"string"==typeof r.props.fields[e].required?r.props.fields[e].required:void 0;if(!i&&!a.required&&0===t.length)return(0,l.default)("validation",c({},e,!0),r),!0;if(i){var n=r.validateGroup(e,t,i);return console.log("groupVlaidation returned",n),n}var o=a.rules,s=r.validateRules(e,t,o);return r.setState({validation:Object.assign(r.state.validation,c({},e,s))}),s},r.initialValidation=function(){Object.values(r.props.fields).filter(function(e){return e}).forEach(function(e){var t=(document.getElementsByName(e.name)[0]||{}).value,a=e.defaultValue||t;r.validateFieldAndUpdateState(e.name,a)})},r.onChange=function(e,t){var a=t||e.target;r.validateFieldAndUpdateState(a.name,a.value)},r.validateFieldsProp=function(){Object.values(r.props.fields).forEach(function(e){if(!e.name)throw new Error("Please provide a name value for all of your fields");if(!e.rules)throw new Error("Please provide a rules array for field "+e.name+" (or an empty array for non-validated fields)")})},r.state={errors:r.initialiseStateErrors(e.fields),groupValidation:r.initialiseStateGroupValidation(e.fields),validation:r.initialiseStateFieldValidation(e.fields),isFormValid:!1,validatorInput:{}},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),a(t,[{key:"componentDidMount",value:function(){var e=this;this.validateFieldsProp(),this.addRequiredRuleToFields(),this.initialValidation(),this.props.validateOnLoad||Object.values(this.props.fields).forEach(function(t){return e.removeAllErrorMessages(t.name)})}},{key:"initialiseStateErrors",value:function(e){return Object.keys(e).reduce(function(e,t){return e[t]=[],e},{})}},{key:"initialiseStateGroupValidation",value:function(e){return Object.keys(e).reduce(function(t,r){var a=e[r];return a.required&&"string"==typeof a.required?(t[a.required]=Object.assign({},t[a.required],c({},r,!(a.rules&&a.rules.length>0||a.required))),t):t},{})}},{key:"initialiseStateFieldValidation",value:function(e){return Object.keys(e).reduce(function(t,r){var a=e[r];return a.required&&"string"==typeof a.required?(t[a.required]=!1,t):(t[r]=!(a.rules&&a.rules.length>0||a.required),t)},{})}},{key:"componentDidUpdate",value:function(e){var t=this.props;JSON.stringify(t.fields)!==JSON.stringify(e.fields)&&this.setState({fields:t.fields,errors:this.initialiseStateErrors(t.fields),groupValidation:this.initialiseStateGroupValidation(t.fields),validation:this.initialiseStateFieldValidation(t.fields),isFormValid:!1})}},{key:"validateFieldAndUpdateState",value:function(e,t){console.log("inside validateFieldandUpdateState",e,"value is",t);var r=this.props.fields[e].onValidate||this.props.onValidate||this.onValidate;if(this.validateField(e,t))console.log("field",e,"was valid with",t),r(e,t);else{if(console.log("field",e,"was invalid with",t),null===this.state.validation[e])return null;r(e,null)}console.log("about to set isFormValid, validation values are",this.state.validation),this.setState({isFormValid:Object.values(this.state.validation).every(function(e){return e})}),this.props.returnInput&&((0,l.default)("validatorInput",c({},e,t),this),this.props.parent.setState({validatorInput:this.state.validatorInput}))}},{key:"addRequiredRuleToFields",value:function(){var e=this;Object.values(this.props.fields).forEach(function(t){if(!0===t.required||"string"==typeof t.required){var r=e.props.fields;r[t.name].rules.push("isRequired"),e.setState({fields:r})}})}},{key:"render",value:function(){var e=this.state,t=e.errors,r=e.isFormValid,a=e.validation,i=e.groupValidation;return this.props.children({isFormValid:r,isFieldValid:Object.assign.apply(Object,[{},a].concat(d(Object.values(i)))),fields:(0,s.default)(this.props.fields||{}),onChange:this.onChange,errors:t})}}]),t}();t.default=f,f.propTypes={parent:n.default.object,children:n.default.func,onValidate:n.default.func,fields:n.default.object,validateOnLoad:n.default.bool,returnInput:n.default.bool},f.defaultProps={validateOnLoad:!1,returnInput:!1}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Validator=void 0;var a=function(e){return e&&e.__esModule?e:{default:e}}(r(7));t.Validator=a.default}]));