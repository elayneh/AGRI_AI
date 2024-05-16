export const getCookie = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  console.log("COOKIES: ", cookies);
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};
