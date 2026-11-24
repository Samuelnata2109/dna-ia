import type { ProfileId } from "../types/quiz";

type ProfileEditorial = {
  areas: string;
  course: string;
  imageAlt: string;
};

// Proposed editorial complements; official profile copy remains in profiles.ts.
export const profileEditorial: Record<ProfileId, ProfileEditorial> = {
  builder: {
    areas:
      "Desenvolvimento de aplicativos, assistentes virtuais e sistemas que usam IA para resolver problemas do dia a dia.",
    course:
      "Explorar programação, lógica e integração de sistemas ajuda a transformar ideias em soluções com IA.",
    imageAlt:
      "Personagem construindo sistemas em um terminal holográfico com chips e circuitos.",
  },
  detective: {
    areas:
      "Análise e visualização de dados, investigação de tendências e criação de painéis para apoiar decisões.",
    course:
      "Aprender a organizar, interpretar e visualizar dados ajuda a encontrar padrões e fazer perguntas melhores sobre a IA.",
    imageAlt:
      "Personagem investigando gráficos e conexões em painéis holográficos de dados.",
  },
  brain: {
    areas:
      "Experimentos com aprendizagem de máquinas, reconhecimento de imagens, recomendações e previsões.",
    course:
      "Explorar dados, modelos e testes ajuda a compreender como máquinas aprendem e como avaliar suas respostas.",
    imageAlt:
      "Personagem explorando uma rede neural com nós conectados e um cérebro digital.",
  },
  creator: {
    areas:
      "Criação de imagens, personagens, experiências digitais e produções audiovisuais com ferramentas de IA.",
    course:
      "Combinar criatividade, experimentação e uso responsável de IA ajuda a desenvolver novas formas de expressão digital.",
    imageAlt:
      "Personagem criando formas e cenas de arte digital com hologramas e uma caneta.",
  },
  maker: {
    areas:
      "Robótica, automação e desenvolvimento de dispositivos interativos que conectam sensores e sistemas inteligentes.",
    course:
      "Investigar programação, sensores e protótipos ajuda a conectar soluções de IA ao mundo físico.",
    imageAlt:
      "Personagem trabalhando com braços robóticos, sensores e dispositivos inteligentes.",
  },
  guardian: {
    areas:
      "Avaliação de sistemas de IA, proteção de informações e identificação de riscos, manipulações e desinformação.",
    course:
      "Estudar limites, impactos e formas de verificar sistemas ajuda a usar e desenvolver IA com responsabilidade.",
    imageAlt:
      "Personagem verificando uma rede protegida por um escudo digital.",
  },
};
