import { Hub, Auth } from "aws-amplify";

const callAuthListener = async () => {
  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        console.log("user signed in");
        break;
      case "signOut":
        console.log("user signed out");
        break;
      default:
        break;
    }
  };

  Hub.listen("auth", listener);
};

const callCurrentAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const session = await Auth.userSession(user);
    const sessionExp = session.accessToken.payload.exp * 1000;
    var currentTime = Date.now();
    if (currentTime > sessionExp) {
      Auth.signOut();
      return {
        status: false,
      };
    } else {
      return {
        status: true,
        user: user,
      };
    }
  } catch (e) {
    return e;
  }
};

export { callAuthListener, callCurrentAuthenticatedUser };
