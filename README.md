# Pterodactyl Power - GitHub Action

This GitHub Action allows you to send power actions to a Pterodactyl panel server. You can start, stop, restart, or kill the server using this action.

## Usage

To use this GitHub Action in your workflow, you can add the following YAML configuration to your workflow file (e.g., `.github/workflows/power-action.yml`).

```yaml
name: Power Action Workflow

on:
    push:
        branches:
            - main # Replace with your desired branch

jobs:
    power_action:
        name: Send Power Action to Pterodactyl Server
        runs-on: ubuntu-latest
        steps:
            - name: Execute Pterodactyl Power Action
              uses: D3OXY/pterodactyl-power@V1
              with:
                  PANEL_URL: "https://your-panel-url.com"
                  API_KEY: ${{ secrets.PTERODACTYL_API_KEY }}
                  SERVER_ID: ${{ secrets.PTERODACTYL_SERVER_ID }}
                  POWER_ACTION: "START" # You can change this to "STOP," "RESTART," or "KILL" as needed
```

Ensure that you have the necessary secrets (`API_KEY`, `SERVER_ID`, and optionally `PANEL_URL`) defined in your repository's settings.

## Inputs

-   `PANEL_URL` (required): The URL of your Pterodactyl panel.
-   `API_KEY` (required): The bearer token used to authorize with the Pterodactyl panel get it from `https://your-panel-url/account/api`.
-   `SERVER_ID` (required): The ID of the server on which you want to perform the power action.
-   `POWER_ACTION` (optional, default: "restart"): The power action to be executed. It should be one of the following: "start," "stop," "restart," or "kill."

## Example

Here's an example of how to use this action in a workflow:

```yaml
name: Power Action Workflow

on:
    push:
        branches:
            - main

jobs:
    power_action:
        name: Send Power Action to Pterodactyl Server
        runs-on: ubuntu-latest
        steps:
            - name: Execute Pterodactyl Power Action
              uses: d3oxy/pterodactyl-power@V1
              with:
                  PANEL_URL: "https://panel.deoxy.dev"
                  API_KEY: ${{ secrets.PTERODACTYL_API_KEY }}
                  SERVER_ID: ${{ secrets.PTERODACTYL_SERVER_ID }}
                  POWER_ACTION: "restart" # You can change this to "start," "restart," or "kill" as needed
```

Made with 💙 by [d3oxy](https://deoxy.dev)
