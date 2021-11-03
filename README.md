# Arup Carbon Checker

A [speckle](https://speckle.works) based tool to quickly estimate the carbon emissions of a stream.

![screenshot 2019-01-31 at 15 52 52](https://user-images.githubusercontent.com/7696515/52070910-ccdfcb80-2579-11e9-9c44-024007d17458.png)

## Development notes

This project has prettier configuration setup to allow auto format on save.
Install the prettier extension in the VSCode marketplace.

To start a development server: `npm run dev`
To build for production: `npm run build`

Please note: we use a custom build of the vuematerial library that fixes [this issue](https://github.com/vuematerial/vue-material/issues/1977). Since this component library is no longer supported we should move to a new one asap.

For now copy contents of `./vue-mat-dist` to `./node_modules/vue-material/dist`

## Deployment notes

- increment version in `package.json`
- merge `dev` into `master`
- the docker image will be build, tagged and pushed to AWS ECR
- run manual task in gitlab pipeline
- this will update the service in AWS ECS
- deployment is now complete
