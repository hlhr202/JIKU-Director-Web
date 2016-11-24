This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Important
- In dev mode, all the api url starts from http://localhost:8000
- In production mode, the above string (http://localhost:8000) will be automatically replaced by NULL in order to use relative path
- You can search the string(http://localhost:8000) inside config/webpack.config.prod.js
- The replacement is done by a webpack loader  [webpack-replace](https://github.com/zalmoxisus/webpack-replace)
