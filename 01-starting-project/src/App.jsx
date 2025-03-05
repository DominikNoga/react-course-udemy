import CoreConceptsList from "./components/pages/home/CoreConceptsList/CoreConceptsList";
import ExamplesList from "./components/pages/home/Examples/ExamplesList/ExamplesList";
import AppHeader from "./components/shared/AppHeader/AppHeader";

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <h2>Time to get started!</h2>
        <CoreConceptsList />
        <ExamplesList />
      </main>
    </div>
  );
}

export default App;
