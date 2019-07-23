export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '192.168.1.1:8000',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  },
  baseFilesUrl: 'http://192.168.1.1:8000/storage'
};
