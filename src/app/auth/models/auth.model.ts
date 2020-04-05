import { Navigations } from "./navigations.model";

export interface Auth {
  isAuthenticated: boolean;
  userInformation: {
    _id: string;
    userName: string;
    // name: string;
    // email: string;
    // contact: string;
    // dateOfBirth: string;
    category: string;
    // pictureName: string;
    // status: string;
    // navigations: Array<Navigations>;
    //   imagePath: string;
    // accessToken: string;
  };
}
