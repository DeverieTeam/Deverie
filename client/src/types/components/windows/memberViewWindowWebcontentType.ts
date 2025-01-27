import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type memberviewwindowWebcontentType = {
  role: {
    member: webcontentObjectType;
    moderator: webcontentObjectType;
    administrator: webcontentObjectType;
  };
  pronounsPrefix: webcontentObjectType;
  messageCount: webcontentObjectType;
  inscriptionDate: webcontentObjectType;
  descriptionPlaceholder: webcontentObjectType;
  banButton: webcontentObjectType;
  banTitle: webcontentObjectType;
  banConfirmMessage: webcontentObjectType;
};
