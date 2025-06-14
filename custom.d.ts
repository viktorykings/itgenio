declare module "meteor/*";
declare module "meteor/meteor" {
  namespace Meteor {
    interface User {
      _id: string;
      username?: string;
      emails?: Array<{ address: string; verified: boolean }>;
      profile?: any;
    }
  }
}
