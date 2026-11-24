# Publicação no GitHub Pages

O GitHub Pages está configurado para GitHub Actions. A URL prevista é https://samuelnata2109.github.io/dna-ia/. Confirme a publicação após o primeiro merge aprovado pelo usuário.

Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions** se a configuração for alterada. O Vite usa `base: "/dna-ia/"`. Use importações de módulos ou `import.meta.env.BASE_URL` para recursos em `public/`. Caso surjam rotas de cliente, preserve o acesso por recarga no Pages.

O `ci.yml` roda no PR. Em push para `main`, o `deploy.yml` chama o mesmo CI para validar o commit, gerar e testar `dist/` e enviar esse artefato. O job de publicação exige sucesso da validação e usa o ambiente `github-pages`. Somente esse job recebe `pages: write` e `id-token: write`. As publicações são serializadas.

## Proteção de main

Após o primeiro PR registrar o check **Validate project**, um administrador pode criar uma regra para `main` em **Settings → Rules → Rulesets** ou **Branches**. Exija Pull Request antes do merge e selecione o check de validação do PR observado na interface. Verifique a regra e as exceções antes de ativá-la. Se o ambiente `github-pages` permitir restrição por branch, limite-o a `main`.

## Diagnóstico

- Se o deploy falhar antes da publicação, consulte a primeira etapa com erro em Actions e confirme a fonte do Pages.
- Se a página ou recursos retornarem 404, confira o caminho `/dna-ia/`, o conteúdo de `dist/` e as referências a assets.
- Registre a URL e o estado efetivo da publicação em `PROGRESSO.md`.
