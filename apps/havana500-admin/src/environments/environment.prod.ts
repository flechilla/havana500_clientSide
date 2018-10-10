import { HavanaEnvironment } from '@hav500workspace/shared';
export const environment: HavanaEnvironment = {
  production: true,
  domainUrl: 'http://localhost:5000',
  apiUrl: this.domainUrl + '/api/v1/'
};
