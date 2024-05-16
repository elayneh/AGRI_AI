import { credentialsTypes } from "../../apps/Pages/MembershipPage/LoginPage/slice/types";
import { forgotPasswordCredentialsTypes } from "../../apps/Pages/MembershipPage/ForgotPasswordPage/slice/types";
import { resetPasswordCredentialsTypes } from "../../apps/Pages/MembershipPage/ResetPasswordPage/slice/types";
import { updateUserProfileCredentials } from "../../apps/Pages/UserProfile/UpdateUserProfile/slice/types";
import { userProfileDetailCredentialsTypes } from "../../apps/Pages/UserProfile/UserProfileDetails/slice/types";
import { HomeComponentPageTypes } from "../../apps/Pages/UserProfile/HomeComponentPage/slice/types";
import { HistoryComponentPageTypes } from "../../apps/Pages/HistoryComponentPage/slice/types";
import { UserProfileComponentTypes } from "../../apps/Components/UserProfile/slice/types";

export interface RootState {
  loginPageName?: credentialsTypes;
  signUpPageName?: credentialsTypes;
  forgotPasswordPageName?: forgotPasswordCredentialsTypes;
  resetPasswordPageName?: resetPasswordCredentialsTypes;
  updateUserProfilePageName?: updateUserProfileCredentials;
  userProfileDetailPageName?: userProfileDetailCredentialsTypes;
  homePageSliceName?:HomeComponentPageTypes;
  historyPageSliceName?:HistoryComponentPageTypes;
  userProfileSliceName?:UserProfileComponentTypes;
}
