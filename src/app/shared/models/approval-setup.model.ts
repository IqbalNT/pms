export interface ApprovalSetup {
    id?: string;
    navigations?: Array<string>;
    navigationIds?: Array<string>;
    createdBy?: string;
    schemaName?: string;
    userAppearance?: string;
    primaryKey?: string;
    dataObjectId?: string;
    dataObject?: Array<any>;
    oldDataObject?: Array<any>; 
    authorizerInfo?: Array<Autho>; 
    status?: string;
  }

  export interface Autho {
    authorizer: string;
    action: string;
    date:string;
  }