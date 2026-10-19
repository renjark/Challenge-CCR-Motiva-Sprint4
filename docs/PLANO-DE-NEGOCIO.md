# Plano de Negócio — Grovia

**Challenge CCR / Motiva · FIAP · Sprint 4**
Gestão e monitoramento de vegetação nas rodovias concedidas à Motiva.

> **Como ler os números.** O contexto da Motiva vem de fontes públicas (citadas ao final). Preços, custos e cenários são **premissas de trabalho do grupo**, escolhidas para serem realistas e verificáveis, e precisam ser validadas com a Motiva no piloto. Cada premissa está identificada como tal.

---

## 1. Contexto e problema

A Motiva (antiga CCR, rebatizada em março de 2025) opera concessões rodoviárias em vários estados, na ordem de **4,5 a 5 mil km** de rodovias, conforme a fonte consultada. Em São Paulo, a fiscalização é da **ARTESP**; nas rodovias federais, da **ANTT**.

Hoje o monitoramento da vegetação é manual: um inspetor percorre a rodovia de carro, anota o nível da vegetação (baixa, média, alta) em prancheta e, ao voltar, transcreve tudo para planilhas Excel divididas em trechos de 500 m.

Consequências para a operação:

| Falha do processo atual | Efeito |
|---|---|
| Dado chega ao supervisor com atraso (prancheta → planilha) | Situações críticas são descobertas tarde, às vezes por reclamação de usuário |
| Classificação subjetiva, sem foto nem coordenada | Difícil comprovar a condição do trecho em uma fiscalização |
| Sem histórico estruturado por trecho | Não dá para priorizar com dados nem prever crescimento |
| Inspetor e supervisor em ferramentas diferentes | Acionar a equipe de roçada depende de telefone e e-mail |

Os contratos de concessão preveem indicadores de desempenho e conservação. Descumpri-los pode gerar descontos tarifários e sanções contratuais. Vegetação sobre placas e defensas também afeta diretamente a segurança viária.

## 2. Proposta de valor

> **Do papel à decisão em minutos.** O Grovia transforma cada inspeção de vegetação em um registro com classificação, medição, foto e coordenada, e entrega ao supervisor um painel e um ranking de urgência para decidir quem roçar primeiro.

O que o cliente recebe:

1. **Dado em tempo quase real.** A inspeção entra no app em campo e aparece no painel do supervisor, sem transcrição.
2. **Priorização objetiva.** Ranking automático por índice de urgência, em vez de percepção individual.
3. **Ciclo fechado.** Do alerta à ordem de serviço, ao andamento da equipe e à conclusão, tudo no mesmo lugar.
4. **Evidência para fiscalização.** Histórico por trecho com data, local e foto.
5. **Funciona sem sinal.** Os trechos de rodovia têm cobertura instável; o app guarda os dados no aparelho (requisito de projeto).

## 3. Público-alvo e personas

**Quem usa e quem paga são pessoas diferentes.**

| Persona | Papel | O que precisa | Como o Grovia ajuda |
|---|---|---|---|
| **Marcos** — Supervisor de Conservação *(persona principal, definida na Sprint 1)* | Coordena as equipes em ~180 km de rodovia | Ver o estado atual de todos os trechos e priorizar intervenções | Painel, mapa, ranking, abertura de OS |
| **Carlos** — Inspetor / operador de campo | Percorre a rodovia e registra a vegetação | Registrar rápido, mesmo sem sinal, sem retrabalho | Formulário de inspeção com GPS e foto *(perfil dedicado está no roadmap)* |
| **Helena** — Gerente regional de operações *(compradora)* | Responde pelos indicadores da concessão | Reduzir risco de sanção e custo de conservação | Histórico auditável, indicadores consolidados |
| **Rafael** — Analista de conformidade | Prepara respostas para ARTESP e ANTT | Montar evidências rapidamente | Linha do tempo por trecho com foto e local |

> Marcos é o recorte de usuário real que o app atende hoje. Helena e Rafael são as personas de decisão e de uso secundário usadas neste plano; devem ser confirmadas com a Motiva.

**Mercado imediato:** as concessões da Motiva (cliente corporativo único no começo, com muitos contratos e regionais). **Expansão natural:** outras concessionárias rodoviárias reguladas pela ARTESP e pela ANTT, que têm o mesmo processo e as mesmas exigências.

## 4. Modelo de receita

Opções avaliadas:

| Modelo | Vantagem | Limitação |
|---|---|---|
| Licença perpétua + manutenção | Previsível para compras corporativas | Receita inicial concentrada; menos incentivo a evoluir o produto |
| Serviço gerenciado puro | Menos esforço para o cliente | Exige equipe operacional grande; margem menor |
| **Assinatura por km monitorado/ano + implantação** *(recomendado)* | Preço cresce com o valor entregue; entrada pequena para o piloto | Exige medir km ativos |

**Planos (premissa de preço, por km monitorado por ano):**

| Plano | Preço | Inclui |
|---|---|---|
| **Essencial** | R$ 600 | App de campo e de supervisão, mapa, ranking, ordens de serviço, alertas |
| **Conformidade** | R$ 900 | Essencial + relatórios e exportação de evidências para ARTESP/ANTT, histórico ampliado |
| **Gerenciado** | R$ 1.300 | Conformidade + treinamento contínuo, suporte 8x5 e revisão periódica dos dados |

**Implantação (cobrança única):** R$ 40.000 por concessão — importação do histórico das planilhas, configuração dos trechos de 500 m e treinamento das equipes. *(premissa)*

**Referência de valor para o cliente (premissa a validar no piloto):** em uma regional de 180 km no plano Conformidade, a licença é de R$ 162 mil por ano. Se uma equipe de inspeção custa cerca de R$ 25 mil por mês (inspetor, veículo, combustível) e o app poupar 30% do tempo de inspeção e transcrição, o ganho de produtividade é de ~R$ 90 mil por ano. A diferença (~R$ 72 mil) precisa ser coberta por **sanções e retrabalho evitados e por mais segurança viária**. O piloto existe para medir isso, e não para supor.

## 5. Custos estimados de operação

Estrutura enxuta, ano 1, uma regional em produção. **Premissas.**

| Item | Detalhe | Custo anual |
|---|---|---|
| Infraestrutura em nuvem | API, banco gerenciado, armazenamento de fotos, push, monitoramento (~R$ 2.500/mês) | R$ 30.000 |
| Desenvolvimento e sustentação | 1 pessoa full-stack/mobile em tempo integral (~R$ 18 mil/mês com encargos) | R$ 216.000 |
| Produto e sucesso do cliente | 0,5 pessoa (~R$ 8 mil/mês) | R$ 96.000 |
| Suporte e treinamento de campo | ~R$ 2 mil/mês | R$ 24.000 |
| Ferramentas e contas | Monitoramento de erros, lojas, build | R$ 12.000 |
| Contingência | 10% | R$ 37.800 |
| **Total** | | **R$ 415.800** |

Os custos de nuvem são baixos porque a foto é comprimida no aparelho (~300 KB) e a base cresce devagar: uma regional de 180 km com inspeção mensal gera na ordem de 1 a 2 GB de fotos por ano.

**Ponto de equilíbrio do primeiro ano** (R$ 415.800 ÷ preço por km):

| Plano | Km necessários | % da malha (≈4.475 km) |
|---|---|---|
| Essencial (R$ 600) | ~693 km | ~15% |
| Conformidade (R$ 900) | ~462 km | ~10% |
| Gerenciado (R$ 1.300) | ~320 km | ~7% |

## 6. Cenários financeiros (ilustrativos, plano Conformidade)

| Cenário | Km | Receita anual | Custo anual | Resultado |
|---|---|---|---|---|
| **A — Piloto** (1 regional, 6 meses) | 180 | R$ 121 mil (implantação 40 mil + licença proporcional 81 mil) | R$ 208 mil | **−R$ 87 mil** (investimento de validação) |
| **B — Expansão** (~13% da malha) | 600 | R$ 660 mil (licenças 540 mil + 3 implantações 120 mil) | R$ 440 mil | **+R$ 220 mil** (margem 33%) |
| **C — Escala** (~1/3 da malha) | 1.500 | R$ 1,59 mi (licenças 1,35 mi + 6 implantações 240 mil) | R$ 827 mil | **+R$ 763 mil** (margem 48%) |

O piloto é deficitário de propósito: o objetivo é provar o ganho medido antes de pedir a expansão.

## 7. Diferenciais da solução

| Alternativa hoje | Limite | Diferencial do Grovia |
|---|---|---|
| Prancheta + planilha Excel *(status quo)* | Atraso, sem foto, sem histórico confiável | Registro único em campo, com GPS, foto e histórico |
| Sistemas corporativos de gestão de ativos (EAM/CMMS) | Genéricos, pesados, pouco adequados ao campo; implantação longa | Específico para vegetação por trecho de 500 m; implantação por regional |
| Monitoramento por drone, satélite ou LiDAR | Caro para varredura constante; complementar | Baixo custo; os mesmos dados podem alimentar a priorização depois |

Pontos que sustentam a vantagem: foco no fluxo real da Motiva (inspetor → supervisor → equipe de roçada), **offline por projeto**, **ranking de urgência** que orienta a decisão, trilha de evidências para fiscalização e identidade visual alinhada à marca.

## 8. Impacto esperado

Metas de piloto — **hipóteses a medir**, não resultados já obtidos:

| Para a Motiva | Como medir | Meta inicial |
|---|---|---|
| Menos tempo entre inspeção e dado disponível | Horas entre o registro e a visualização no painel | De dias para minutos |
| Menos retrabalho de transcrição | Horas semanais de digitação em planilha | Perto de zero |
| Resposta mais rápida a trecho crítico | Tempo entre classificação crítica e abertura de OS | Redução mensurável frente ao mês-base |
| Evidência pronta para fiscalização | % de inspeções com foto, data e coordenada | 100% das inspeções feitas pelo app |
| Menos descobertas por reclamação | Nº de trechos críticos identificados por usuários da rodovia | Tendência de queda |

**Para as rodovias e os usuários:** sinalização visível e acostamento livre mais cedo (segurança viária); roçada preventiva em vez de corretiva; menos quilômetros rodados só para inspecionar.

## 9. Riscos e mitigação

| Risco | Probabilidade / impacto | Mitigação |
|---|---|---|
| Baixa adoção pelas equipes de campo | Média / alto | Fluxo curto de inspeção, treinamento na implantação, perfil de campo no roadmap, métrica de uso no piloto |
| Falta de sinal na rodovia | Alta / médio | Armazenamento local no aparelho; fila de sincronização na integração com a API |
| Classificação ainda subjetiva | Média / médio | Foto obrigatória em trecho crítico, padrão de referência visual, classificação assistida por visão computacional no roadmap |
| Integração com sistemas internos da Motiva | Média / alto | Camada de dados já isolada (`mockApi.js`), pronta para trocar por API real; piloto com exportação simples |
| Dados pessoais e de localização (LGPD) | Média / alto | Coleta mínima, finalidade clara, autenticação com token, política de retenção definida com a Motiva |
| Dependência de um único cliente | Alta / alto | Mesmo processo existe em outras concessionárias reguladas; produto genérico o bastante para expansão |
| Mudança regulatória | Baixa / médio | Relatórios configuráveis; acompanhamento dos normativos da ARTESP e da ANTT |
| Premissas de preço e custo erradas | Média / alto | Piloto curto com métricas definidas antes da proposta de expansão |

## 10. Roadmap

1. **Piloto (0–6 meses):** integração com a API real, sincronização offline, perfil de campo, indicadores de piloto.
2. **Expansão (6–18 meses):** relatórios para ARTESP/ANTT, mais regionais, iOS em produção.
3. **Evolução (18 meses+):** classificação por visão computacional, previsão de crescimento por trecho, integração com sistemas de gestão de ativos.

---

## Fontes

- Motiva — [rodovias administradas](https://www.motiva.com.br/en/business/highways/): 5.044 km, 11 concessionárias, 5 estados (site institucional, consultado em out/2026).
- Gazeta do Povo — [CCR muda de nome e intensifica negócios em rodovias](https://www.gazetadopovo.com.br/brasil/ccr-muda-de-nome-vende-aeroportos-intensifica-negocios-em-rodovias/): 4.475 km, 12 concessões, nome Motiva desde março de 2025.
- As duas fontes diferem na extensão total; por isso o plano usa a faixa de 4,5 a 5 mil km e **4.475 km como base de cálculo**. Confirmar o número atual com a Motiva.
