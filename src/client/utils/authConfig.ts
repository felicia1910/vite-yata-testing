import { Configuration, LogLevel } from "@azure/msal-browser";

type PolicyNames = {
  signUpSignIn: string;
  signUpDirectly: string;
  forgotPassword: string;
  editProfile: string;
}

type B2CPolicies = {
  names: PolicyNames;
  authorities: {
    signUpSignIn: {
      authority: string
    },
    signUpDirectly: {
      authority: string
    },
    forgotPassword: {
      authority: string
    },
    editProfile: {
      authority: string
    },
  },
  authorityDomain: string
}

export const policyNames: PolicyNames = {
  signUpSignIn: "B2C_1A_ESHOP_SIGNUP_SIGNIN",
  signUpDirectly: "B2C_1A_ESHOP_SIGNUP_DIRECTLY",
  forgotPassword: "B2C_1A_ESHOP_PASSWORDRESET",
  editProfile: "B2C_1A_SHOP_PROFILEEDIT"
}

// export const scope = 'https://YataLoyaltyUat.onmicrosoft.com/02afbdc7-3f66-4bd6-bf8a-d6893ba6daba/yatauthTest'
// export const scope = 'https://YataLoyaltyUat.onmicrosoft.com/965228eb-c605-4751-b069-d12544bb347c/CustomerAppApi'
//export const scope = 'https://yatafans.onmicrosoft.com/f10e1c0a-7e6f-4a4f-86cc-f29123a38800/YataFansAppBackend'
export const scope = import.meta.env.AUTH_CRM_SCOPE

export const b2cPolicies: B2CPolicies = {
  names: {
    signUpSignIn: policyNames.signUpSignIn,
    signUpDirectly: policyNames.signUpDirectly,
    forgotPassword: policyNames.forgotPassword,
    editProfile: policyNames.editProfile
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${import.meta.env.AUTH_TENANT_NAME}.b2clogin.com/${import.meta.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policyNames.signUpSignIn}`,
    },
    signUpDirectly: {
      authority: `https://${import.meta.env.AUTH_TENANT_NAME}.b2clogin.com/${import.meta.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policyNames.signUpDirectly}`,
    },
    forgotPassword: {
      authority: `https://${import.meta.env.AUTH_TENANT_NAME}.b2clogin.com/${import.meta.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policyNames.forgotPassword}`,
    },
    editProfile: {
      authority: `https://${import.meta.env.AUTH_TENANT_NAME}.b2clogin.com/${import.meta.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policyNames.editProfile}`
    }
  },
  authorityDomain: `${import.meta.env.AUTH_TENANT_NAME}.b2clogin.com`
};

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.AUTH_CLIENT_ID ?? '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    // redirectUri: 'https://jwt.ms',
    redirectUri: `${import.meta.env.NEXTAUTH_URL}/account/login-result`,
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    },
    allowRedirectInIframe: true
  }
};

export const loginRequest = {
  scopes: [scope as string, "openid", "offline_access"],
};