"use strict";var _vue=_interopRequireDefault(require("vue")),_SvgIcon=_interopRequireDefault(require("./SvgIcon.vue"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}_vue.default.component("svg-icon",_SvgIcon.default);var req=require.context("./svg",!1,/\.svg$/),requireAll=function(e){return e.keys().map(e)};requireAll(req);