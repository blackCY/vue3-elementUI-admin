"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GetSms=GetSms,exports.InfoUser=InfoUser;var _interceptor=_interopRequireDefault(require("@/utils/interceptor.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function GetSms(e){var r=e.username;return _interceptor.default.post("/api/mock/authCode",{username:r})}function InfoUser(e){var r=e.username,t=e.password,o=e.verifiication,n=e.model;return _interceptor.default.post("/api/mock/".concat(n),{username:r,password:t,verifiication:o})}