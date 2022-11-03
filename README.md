# a-carbon-tool
A Carbon Tool (ACT) is an open source web application that enables users to estimate embodied carbon equivalent content from Building Information Models (BIM) - using [Speckle](https://speckle.systems/) to solve the challenge of data interoperability in the AEC industry. It is designed to provide quick and efficient feedback during the design process to enable users to identify carbon hotspots and reduce the impact their design has on the built environment.

The original version of ACT was created in 2018 at [Arup](https://www.arup.com) and built based on Speckle 1.0 - it is contained in the legacy branch of this repository. The tool has been used on building and infrastructure projects across the global, supporting those projects in reducing the carbon footprint of the proposed design.

At COP26, Arup committed to performing whole life carbon assessments on all building projects, new and retrofit. In addition to this commitment, Arup have open sourced ACT to enable anyone in the AEC sector to perform their own carbon assessment for their own project. In doing this the AEC sector can collectively work together in the challenge the planet faces in reducing carbon emissions - a task so big that it will require the entire industry to improve and work together. This is why a copy-left licence has been chosen for this carbon calculation tool, to encourage a collaborative environment in tackling this challenge while enabling everyone to benefit from new developments and improvements to the tool.

## How to run the project locally

1. Create a [Speckle app](https://speckle.guide/dev/apps.html#registering-an-application-on-the-speckle-server) and make a note of the __id__ and __secret__
2. Copy the __.env.example__ file to a __.env__ file
3. Set `VUE_APP_SPECKLE_ID_XYZ` and `VUE_APP_SPECKLE_SECRET_XYZ` to be the values of your own __Speckle app id__ and __secret__
4. Run `npm i`
5. Start app with `npm run serve`
6. On the login screen, if your __Speckle app id__ and __secret__ are correct/everything is working right, the xyz login button should allow you to log in

To make the other login buttons work, fill in the other environment variables with different __Speckle app id/secret__'s (or the same ones, but then the buttons would all do the same thing)

If you have your own Speckle server that you wish to connect to your local version of act, update the `VUE_APP_SPECKLE_ID_CUSTOM` and `VUE_APP_SPECKLE_SECRET_CUSTOM` env vars to the __id__ and __secret__ of an act app on your server. Then on the login page, choose "CUSTOM SERVER" and enter in your server's url. Provided that no major breaking changes have been made to your server from the xyz Speckle server, act will work.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
