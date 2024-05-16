import { useRouteError } from "react-router-dom";
const PageNotFound = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error }: any = useRouteError();
  console.log(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.message}</i> */}</p>
    </div>
  );
};

export default PageNotFound;
