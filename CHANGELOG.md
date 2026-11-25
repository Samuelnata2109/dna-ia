# Changelog

## 1.0.0 — 24/11/2026

Versão estável que conclui as oito etapas oficiais do DNA:IA. [Site publicado](https://samuelnata2109.github.io/dna-ia/) · [Validação e deploy](https://github.com/Samuelnata2109/dna-ia/actions/runs/45514610630)

1. Fundação com React, TypeScript, Vite, qualidade automatizada e publicação no GitHub Pages.
2. Design System com paleta, tipografia, componentes e acessibilidade.
3. Tela de entrada com nickname e identidade visual DNA:IA.
4. Motor determinístico com 15 perguntas oficiais, seis perfis, pesos e desempates.
5. Quiz jogável com avanço, revisão de respostas, três fases, XP e 15 ilustrações.
6. Revelação do resultado com opção de pular, suporte a movimento reduzido e seis ilustrações de perfil.
7. Sessão local, retomada após recarga, reinício com confirmação e compartilhamento opcional.
8. Refinamentos de acessibilidade, revisão da versão e fallback para Clipboard API após falha no compartilhamento nativo.

O build publicado corresponde ao commit `84b9bfd921c4cc74a14e2901281391ed68a3a47f`, integrado pelo PR #8.

O workflow aprovou 64 testes de Vitest e 38 de Playwright. A versão publicada passou em outros 38 testes do Playwright, em desktop e mobile emulado, e os 21 WebP servidos conferiram pelo SHA-256.

A avaliação de desempenho em dispositivos físicos e os testes com leitores de tela dedicados ficam para trabalhos futuros. O responsável pelo projeto dispensou a investigação móvel complementar para a versão 1.0.0. [Relatório de auditoria](docs/RELEASE_AUDIT.md)
