import { TemplateRef } from '@angular/core';

export interface UIInfo {
  title: string;
  goBackPath?: string;
  refreshPath?: string;
  addNewPath?: string;
  formId?: string;
  editPath?: string;
  acceptAuthorization?: string;
  declineAuthorization?: string;
  goFullScreen?: boolean;
  additionalComponent?: TemplateRef<any>;
  refresh?: () => void;
}
