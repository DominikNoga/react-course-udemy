import CoreConceptsList from "./components/pages/home/CoreConceptsList/CoreConceptsList";
import AppHeader from "./components/shared/AppHeader/AppHeader";

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <h2>Time to get started!</h2>
        <CoreConceptsList />
      </main>
    </div>
  );
}

export default App;
