export interface RoleAssignSetup {
    id: string;
    appId: string;
    moduleId: string;
    appName: string;
    moduleName: string;
    featureId: string;
    featureName: string;
    roleId: string;
    roleName: string;
    userId: string;
    userName: string;
    name: string;
    status: string;
  }

  export interface ViewRoleAssignInfo {
    id: string;
    userId: string;
    userName: string;
    name: string;
    status: string;
    roles: Array<ViewRoleInfo>
  }

  export interface ViewRoleInfo {
    appId: string;
    moduleId: string;
    appName: string;
    moduleName: string;
    featureId: string;
    featureName: string;
    roleId: string;
    roleName: string;
  }

 