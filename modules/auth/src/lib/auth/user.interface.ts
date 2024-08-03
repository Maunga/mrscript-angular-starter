export interface UserInterface {
  access_token: string;
  refresh_token: string;
}

export interface UserLogin {
  username: string;
  password: string;
}


export interface KeycloakUserAccess {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

export interface KeycloakUserProfile {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: number;
  access: KeycloakUserAccess;
}

export interface RoleInterface {
  id: string;
  name: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}
