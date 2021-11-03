module.exports = {
  baseUrl: './',
  configureWebpack: config => {
    use: {
      loader: 'worker-loader'
    }
  },
  pwa: {
    name: 'Arup Carbon',
    themeColor: '#009BFF',
    msTileColor: '#00C4FF'
  }
}
