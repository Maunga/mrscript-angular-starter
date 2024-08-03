import { EnvironmentConfig } from "./types/environment-config.";
const keycloak_base_url: string = 'http://192.168.92.189:8095'
const keycloak_realm: string = 'coreLife'
export const environment: EnvironmentConfig = {
  env: 'production',
  production: true,
  JWT_TOKEN_KEY: 'access_token',
  JWT_REFRESH_TOKEN_KEY: 'refresh_token',
  USER_PROFILE: 'user_profile',
  ROLES_KEY: 'user_roles',
  keycloak: {
    base_url: 'http://192.168.92.189:8095',
    realm: 'coreLife',
    realm_base_url: `${keycloak_base_url}/auth/admin/realms/${keycloak_realm}`,
  },
  auth_url: {
    api: 'http://10.247.10.247:30481',
    auth_base: '/core-portal-backend/api/v1',
  },
  url: {
    enda_api: 'http://10.247.10.247:30738',
    enda_base: '/core-education-portal-backend/api/v1',
    individuals_api: '',
    individuals_base: '',
  },
};
