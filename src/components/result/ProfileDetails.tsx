import type { Profile } from "../../types/quiz";
import { profileEditorial } from "../../data/profileEditorial";

export function ProfileDetails({ profile }: { profile: Profile }) {
  const editorial = profileEditorial[profile.id];
  return (
    <div className="result-details">
      <section>
        <p className="result-section-number">01 / SEU JEITO DE EXPLORAR</p>
        <h2>Características principais</h2>
        <ul>
          {profile.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </section>
      <section>
        <p className="result-section-number">02 / IDEIAS EM AÇÃO</p>
        <h2>Projetos para imaginar</h2>
        <ul>
          {profile.projectExamples.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </section>
      <section className="result-editorial">
        <p className="result-section-number">03 / POSSIBILIDADES</p>
        <h2>Áreas de atuação</h2>
        <p>{editorial.areas}</p>
        <h3>Conexão com o curso técnico de IA</h3>
        <p>{editorial.course}</p>
      </section>
    </div>
  );
}
