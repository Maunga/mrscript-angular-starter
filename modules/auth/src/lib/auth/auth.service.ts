import { inject, Injectable, signal } from '@angular/core';
import { KeycloakUserProfile, RoleInterface, UserInterface, UserLogin } from './user.interface';
import { ApiService } from '@core/shared';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  private router = inject(Router);

  getToken(): string | null {
    return localStorage.getItem(environment.JWT_TOKEN_KEY);
  }

  getProfile(): string | null {
    return localStorage.getItem(environment.USER_PROFILE);
  }

  getRoles(): string | null {
    return localStorage.getItem(environment.ROLES_KEY);
  }
  
  isLoggedIn() {
    return !!localStorage.getItem(environment.JWT_TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(environment.JWT_TOKEN_KEY);
    localStorage.removeItem(environment.JWT_REFRESH_TOKEN_KEY);
    localStorage.removeItem(environment.USER_PROFILE);
    localStorage.removeItem(environment.ROLES_KEY);
    this.router.navigate(['/auth/login']);
  }

  keycloakLogin(login: UserLogin): Observable<UserInterface> {
    const url = `${environment.auth_url.api}${environment.auth_url.auth_base}`
  
    return this.http.post<UserInterface>(
      `${url}/external/auth`,
      {
        ...login
      },
    )
  }

  keycloakProfile(username: string): Observable<KeycloakUserProfile> {
    const url = `${environment.keycloak.realm_base_url}/users?username=${username}`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        const user = resp[0];
        return {
          id: user.id,
          createdTimestamp: user.createdTimestamp,
          username: user.username,
          enabled: user.enabled,
          totp: user.totp,
          emailVerified: user.emailVerified,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          disableableCredentialTypes: user.disableableCredentialTypes,
          requiredActions: user.requiredActions,
          notBefore: user.notBefore,
          access: {
            manageGroupMembership: user.access.manageGroupMembership,
            view: user.access.view,
            mapRoles: user.access.mapRoles,
            impersonate: user.access.impersonate,
            manage: user.access.manage,
          },
        } as KeycloakUserProfile;
      })
    );
  }

  keycloakRoles(userId: string): Observable<string[]> {
    const url = `${environment.keycloak.realm_base_url}/users/${userId}/role-mappings/realm`;

    return this.http.get(url).pipe(
      map((resp: any) => resp.map((role: RoleInterface) => role.name))
    );
  }
}