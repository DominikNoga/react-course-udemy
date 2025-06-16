import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import PageContent from "../PageContent";
import MainNavigation from "../MainNavigation";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  if (isRouteErrorResponse(error)) {
    console.log(error);
    return (
       <>
        <MainNavigation />
        <PageContent title={title}>
          <p>{error.data}</p>
        </PageContent>
      </>
    );
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
