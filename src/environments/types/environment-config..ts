export interface EnvironmentConfig {
  production: boolean;
  env: string;
  JWT_TOKEN_KEY: string;
  JWT_REFRESH_TOKEN_KEY: string;
  USER_PROFILE: string;
  ROLES_KEY: string;
  keycloak: {
    base_url: string,
    realm: string,
    realm_base_url: string;
  },
  auth_url: {
    api: string;
    auth_base: string;
  };
  url: {
    enda_api: string;
    enda_base: string;
    individuals_api: string;
    individuals_base: string;
  };
}