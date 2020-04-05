export interface RoleSetup {
  id: string;
  appId: string;
  appName: string;
  moduleId: string;
  moduleName: string;
  featureId: string;
  featureName: string;
  roleName: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canAuthorize: boolean;
  canCancel: boolean;
  status: string;
}
