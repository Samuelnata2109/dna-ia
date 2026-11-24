import { project } from "../../project";

export function WelcomeHero() {
  const [prefix, suffix] = project.name.split(":");
  return (
    <div className="welcome-intro">
      <h1 className="welcome-title" aria-label={project.name}>
        {prefix}
        <span>:</span>
        {suffix}
      </h1>
      <p className="welcome-slogan">{project.slogan}</p>
      <p className="welcome-description">
        Das suas escolhas nasce um perfil. Descubra com qual área da
        inteligência artificial você mais se identifica.
      </p>
      <ul className="welcome-facts">
        <li>
          <strong>15</strong> perguntas
        </li>
        <li>
          <strong>3</strong> fases
        </li>
      </ul>
    </div>
  );
}
