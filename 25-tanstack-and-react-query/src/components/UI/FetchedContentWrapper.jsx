import ErrorBlock from './ErrorBlock';
import LoadingIndicator from './LoadingIndicator';

export default function FetchedContentWrapper({ isLoading, isError, error, children }) {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return  <ErrorBlock title="An error occurred" message={error.info?.message || 'Unknown error occurred'} />;
  }

  return children;
}
