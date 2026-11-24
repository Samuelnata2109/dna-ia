import { useState } from "react";
import { Container, Grid, Stack } from "../components/layout/Layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { ProgressBar } from "../components/ui/ProgressBar";
import { project } from "../project";
import "../styles/showcase.css";

export function DesignSystem() {
  const [previewActive, setPreviewActive] = useState(false);

  return (
    <main className="showcase">
      <header className="showcase__masthead">
        <Container className="showcase__banner">
          <div>
            <Badge tone="accent">DESIGN SYSTEM</Badge>
            <h1>{project.name}</h1>
            <p>{project.course}</p>
          </div>
          <div className="showcase__signal" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Container>
      </header>
      <Container className="showcase__content">
        <section aria-labelledby="controls-title">
          <Stack gap="lg">
            <h2 id="controls-title">Componentes de interface</h2>
            <Grid>
              <Card>
                <Stack>
                  <h3>Ações</h3>
                  <div className="showcase__actions">
                    <Button onClick={() => setPreviewActive(true)}>
                      Testar ação
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPreviewActive(false)}
                    >
                      Limpar teste
                    </Button>
                    <Button variant="quiet" disabled>
                      Ação indisponível
                    </Button>
                  </div>
                  <p role="status" className="showcase__caption">
                    {previewActive
                      ? "Ação registrada na demonstração."
                      : "Experimente os botões com o teclado ou o toque."}
                  </p>
                </Stack>
              </Card>
              <Card>
                <Stack>
                  <h3>Campos de texto</h3>
                  <Input
                    label="Código de exemplo"
                    placeholder="Ex.: MOD-01"
                    hint="Use letras e números."
                    autoComplete="off"
                  />
                  <Input
                    label="Exemplo de validação"
                    defaultValue="MOD"
                    readOnly
                    error="O código precisa de um número."
                  />
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </section>
        <section aria-labelledby="progress-title">
          <Stack gap="lg">
            <h2 id="progress-title">Progressão</h2>
            <Grid className="showcase__progress-grid">
              <Card>
                <Stack>
                  <div>
                    <Badge tone="phase-1">LEVEL 01</Badge>
                  </div>
                  <ProgressBar label="Explore" value={33} />
                </Stack>
              </Card>
              <Card>
                <Stack>
                  <div>
                    <Badge tone="phase-2">LEVEL 02</Badge>
                  </div>
                  <ProgressBar label="Challenge" value={66} phase={2} />
                </Stack>
              </Card>
              <Card variant="dark">
                <Stack>
                  <div>
                    <Badge tone="achievement">CONQUISTA</Badge>
                  </div>
                  <ProgressBar label="Identity" value={100} phase={3} />
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </section>
      </Container>
    </main>
  );
}
