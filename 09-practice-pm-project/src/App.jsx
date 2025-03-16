import { useState } from "react";
import CreateProject from "./components/CreateProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";

function App() {
  const [displayAddNewProject, setDisplayAddNewProject] = useState();
  const [projects, setProjects] = useState([]);
  const setDisplayAddProject = (value) => {
    setDisplayAddNewProject(value);
  };

  const addNewProject = (newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject])
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onCreateProject={() => setDisplayAddProject(true)} projects={projects} />
      {
        displayAddNewProject ?
          <CreateProject
            onCreateProject={addNewProject}
            onCancelClick={() => setDisplayAddProject(false)}/> :
          <NoProjectSelected
            onCreateProject={() => setDisplayAddProject(true)} />
      }
    </main>
  );
}

export default App;
