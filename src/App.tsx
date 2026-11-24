import { project } from "./project";

export function App() {
  return (
    <main>
      <h1>{project.name}</h1>
      <p>{project.course}</p>
      <p>{project.slogan}</p>
    </main>
  );
}
