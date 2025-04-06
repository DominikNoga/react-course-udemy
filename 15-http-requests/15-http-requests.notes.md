# Making HTTP requests from the react app
We should not store the user data in the React app. And in the frontend overall.
The FE code is executed inside of the browser. It means that users are able to view the code of our app.
And for example find out the db credentials. Or run some code, that will update the db in unwanted way.
Also there are some restrictions in the browser. We cannot access the filesystem.
Therefore we are interacting with the back-end in order to update the DB or get the data from DB.

## How to interact with a DB in React?
- In react we can use various services to perform the HTTP methods
  - js fetch
  - axios package
  - React query
  - TanStack query

## Where to put the requests in the React component?
  When making a request we will often update a state, therefore we should put the request code
inside of the useEffect, to run the request only once.

````jsx
export default function AvailablePlaces({ onSelectPlace }) {
  useEffect(() => {
    // We cannot use async on the useEffect, that is the reason for creating the inner function inside
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();
        setAvailablePlaces(sortedPlaces);
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.',
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);
}
````
