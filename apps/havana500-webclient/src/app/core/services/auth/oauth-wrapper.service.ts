import { OAuthService } from "angular-oauth2-oidc";
import { Injectable } from "@angular/core";
import { authPasswordFlowConfig } from "../../configs/auth-password-flow.config";

@Injectable({ providedIn: 'root' })
export class OAuthWrapperService {
  constructor(protected oauthService: OAuthService) {
    // Tweak config for password flow
    // This is just needed b/c this demo uses both,
    // implicit flow as well as password flow
    this.oauthService.configure(authPasswordFlowConfig);
  }

  userProfile: object;

  public loadUserProfile(): void {
    this.oauthService.loadUserProfile().then(up => (this.userProfile = up));
  }

  /**
   * Loads the discovery document to configure most properties of this service.
   * The url of the discovery document is infered from the issuer's
   * url according to the OpenId Connect spec.
   * To use another url you can pass it to to optional parameter fullUrl.
   *
   * @param {string} [fullUrl]
   * @returns {Promise<Object>}
   * @memberof AccountSandbox
   */
  public loadDiscoveryDocument(fullUrl?: string): Promise<Object> {
    return this.oauthService.loadDiscoveryDocument();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims["given_name"];
  }

  get familyName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims["family_name"];
  }

  // loginWithPassword(loginForm: LoginModel) {
  //   this.oauthService
  //     .fetchTokenUsingPasswordFlowAndLoadUserProfile(
  //       // this.userName,
  //       // this.password
  //       loginForm.email,
  //       loginForm.password
  //     )
  //     .then(() => {
  //       console.debug("successfully logged in");
  //       // this.loginFailed = false;
  //     })
  //     .catch(err => {
  //       console.error("error logging in", err);
  //       // this.loginFailed = true;
  //     });
  // }

  // logoutOAuth() {
  //   this.oauthService.logOut(true);
  // }
}
