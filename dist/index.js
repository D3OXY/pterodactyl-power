var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var core = __toESM(require("@actions/core"));
var import_axios = __toESM(require("axios"));
var PowerActionOptions = ["start", "stop", "restart", "kill"];
var url;
var panelURL = core.getInput("PANEL_URL", { required: true });
var API_KEY = core.getInput("API_KEY", { required: true });
var serverID = core.getInput("SERVER_ID", { required: true });
var powerAction = core.getInput("POWER_ACTION").toLowerCase() || "restart";
if (panelURL.endsWith("/")) {
  panelURL = panelURL.slice(0, -1);
}
if (!PowerActionOptions.includes(powerAction)) {
  core.setFailed(
    `Invalid power action: ${powerAction}. Must be one of: ${PowerActionOptions.join(
      ", "
    )}`
  );
  process.exit(1);
}
try {
  url = new URL(`${panelURL}/api/client/servers/${serverID}/power`);
} catch (e) {
  core.setFailed(`Invalid panel URL: ${panelURL}`);
  process.exit(1);
}
import_axios.default.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
import_axios.default.defaults.headers.common["Content-Type"] = "application/json";
import_axios.default.post(url.href, { signal: powerAction }).then((res) => {
  core.info(`Power action ${powerAction} sent to server ${serverID}`);
  process.exit(0);
}).catch((err) => {
  core.setFailed(
    `Error sending power action ${powerAction} to server ${serverID}: ${err}`
  );
  process.exit(1);
});
//# sourceMappingURL=index.js.map