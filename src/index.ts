import * as core from "@actions/core";
import axios from "axios";

const PowerActionOptions = ["start", "stop", "restart", "kill"];
let url: URL;

let panelURL = core.getInput("PANEL_URL", { required: true });
let API_KEY = core.getInput("API_KEY", { required: true });
let serverID = core.getInput("SERVER_ID", { required: true });
let powerAction = core.getInput("POWER_ACTION").toLowerCase() || "restart";

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

axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios
    .post(url.href, { signal: powerAction })
    .then((res) => {
        core.info(`Power action ${powerAction} sent to server ${serverID}`);
        process.exit(0);
    })
    .catch((err) => {
        core.setFailed(
            `Error sending power action ${powerAction} to server ${serverID}: ${err}`
        );
        process.exit(1);
    });
