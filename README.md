# 🌿 Grovia — Gestão de Vegetação em Rodovias

Aplicativo mobile para monitoramento, priorização e manutenção da vegetação nas rodovias concedidas à **Motiva**.
**Challenge CCR / Motiva · FIAP · Sprint 4 — Versão final, APK e plano de negócio**

---

## 🔗 Entregas

| Entrega | Onde |
|---|---|
| 📱 **APK para download** | **[GitHub Releases — última versão](https://github.com/renjark/Challenge-CCR-Motiva-Sprint4/releases/latest)** |
| 🎬 **Vídeo de pitch e demonstração** | [Link vídeo](https://youtu.be/oMAl-tFWeck)|
| 💼 **Plano de negócio** | [`docs/PLANO-DE-NEGOCIO.md`](docs/PLANO-DE-NEGOCIO.md) |
| 🧪 **Documento de testes (Sprint 4)** | [`docs/TESTES-SPRINT4.md`](docs/TESTES-SPRINT4.md) |

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| Bernardo Silva Berwanger | 565776 |
| Gregory Debom Ferreira | 562346 |
| João Vitor Angeloti Sena | 563473 |
| Laís Krajner Lacerda | 563182 |
| Luana Magalhães Freire | 565305 |
| Pamella Souza da Silva Ferreira | 566172 |

---

## 🚧 O problema

A Motiva monitora a vegetação nas margens das rodovias de forma manual: o inspetor percorre a via de carro, anota o nível da vegetação (baixa, média ou alta) em prancheta e depois transcreve tudo para planilhas Excel organizadas em trechos de 500 m.

O processo gera dados atrasados, classificações subjetivas, ausência de histórico confiável por trecho e dificuldade de comprovar conformidade com as exigências da **ARTESP** (São Paulo) e da **ANTT** (federal). O recorte do grupo é o **supervisor de conservação**, que decide quem roçar primeiro sem dados consolidados nem atualizados.

## 💡 A solução

Um app que leva o supervisor do alerta à ordem de serviço, e o inspetor do campo ao registro com evidência:

- **Painel** com trechos críticos, em atenção e OK, ordens em aberto e alertas recentes
- **Mapa** georreferenciado dos trechos, coloridos por status, com busca por km e filtros
- **Ranking de urgência** calculado automaticamente
- **Detalhe do trecho** com medições, coordenadas e histórico em linha do tempo (com fotos)
- **Ordens de serviço** com ciclo completo: aberta → em andamento → concluída (ou cancelada)
- **Registro de inspeção** com classificação, altura, observação, **GPS** e **foto real**
- **Alertas**: central interna e **notificação do sistema** quando um trecho vira crítico
- **Cenários de teste** (erro de rede, base vazia, falha ao salvar) acionáveis pelo Perfil

### Persona

**Marcos**, supervisor de conservação, coordena ~180 km de rodovia. Hoje recebe planilhas com atraso e descobre trechos críticos quando já viraram reclamação. Quer ver o estado de todos os trechos, priorizar com dados, acompanhar o histórico e receber alertas.

---

## 📲 Instalar o APK

Requisitos: Android 8.0 ou superior.

1. No celular, abra o link **[Releases](https://github.com/renjark/Challenge-CCR-Motiva-Sprint4/releases/latest)** e baixe `Grovia-v4.0.0.apk`.
2. Abra o arquivo baixado. Se o Android pedir, autorize **"Instalar apps desconhecidos"** para o navegador ou gerenciador de arquivos usado.
3. Toque em **Instalar** e depois em **Abrir**.
4. Ao usar a câmera, a localização e as notificações pela primeira vez, **aceite as permissões**.

**Acesso de demonstração:** e-mail `marcos.andrade@motiva.com.br` · senha `grovia123` (a tela de login tem um atalho para preencher).

> O arquivo `.apk` **não é versionado** no repositório; ele fica em *Releases* (ver `.gitignore`).

---

## 🏗️ Como gerar o APK (para a equipe)

### Opção A — GitHub Actions *(sem conta Expo e sem Android Studio)*

O workflow [`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml) roda os testes, compila o projeto Android e publica o APK em **Releases**.

1. Envie o código para o repositório (`main`).
2. Abra a aba **Actions → Build APK → Run workflow**. Alternativa: `git tag v4.0.0 && git push origin v4.0.0`.
3. Ao terminar (cerca de 10 a 20 min), o APK aparece em **Releases** e também como artefato da execução.

### Opção B — Expo EAS Build

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview   # gera um .apk (perfil em eas.json)
```

O EAS devolve um link de download do APK; basta copiá-lo para a tabela de entregas acima.

---

## 💻 Rodar em desenvolvimento

Pré-requisitos: Node.js 18+ e o app **Expo Go** no celular (ou emulador).

```bash
git clone https://github.com/renjark/Challenge-CCR-Motiva-Sprint4.git
cd Challenge-CCR-Motiva-Sprint4
npm install
npx expo start
```

Escaneie o QR Code com o Expo Go. Comandos úteis: `npm test` (testes), `npm run export:android` (compila o bundle para verificar erros).

---

## 🛠️ Stack tecnológica

| Tecnologia | Uso |
|---|---|
| **React Native 0.74 + Expo SDK 51** | Base multiplataforma |
| **React Navigation** (stack + bottom tabs) | Navegação e porta de autenticação |
| **Context API** | Estado global, sem Redux (porte do projeto não exige) |
| **AsyncStorage** | Persistência da sessão e do estado (offline) |
| **expo-camera** | Foto real da inspeção, com compressão e permissão tratada |
| **expo-file-system** | Guarda a foto no armazenamento permanente do app |
| **expo-location** | GPS na inspeção, com alternativa quando negado |
| **expo-notifications** | Alerta local quando um trecho vira crítico |
| **react-native-svg** | Mapa vetorial georreferenciado dos trechos |
| **Jest** | Testes automatizados |
| **Expo EAS / GitHub Actions** | Build do APK |

### Decisão sobre stack

O grupo **manteve React Native + Expo** durante todo o projeto e **não migrou para Flutter**. A base das Sprints 1 e 2 estava estável, a equipe tem domínio de JavaScript e o tempo foi investido em completar fluxos e estados em vez de reescrever o que funcionava.

### Decisão sobre o mapa

O mapa usa **SVG georreferenciado** (lat/lng reais de cada trecho, rodovias traçadas em ordem de km) em vez de `react-native-maps`. Motivo: o requisito de projeto é funcionar **offline** em trechos sem sinal, e o Google Maps exige chave de API e tiles baixados. Quando a API real entregar a geometria completa das rodovias, basta alimentar o componente `MapaRodovia`.

---

## 🧱 Arquitetura

```
App.js                      navegação (stack + 5 abas) e porta de autenticação
src/
  styles/theme.js           tokens de cor, tipografia, espaçamento e sombra
  data/mockData.js          base de dados mockada (10 trechos, 4 OS, 4 equipes, 6 alertas)
  services/
    mockApi.js              acesso a dados: latência, erro, vazio, escrita
    storage.js              AsyncStorage protegido por try/catch
    fotos.js                move a foto da câmera para o armazenamento permanente
    notificacoesLocais.js   canal Android, permissão e alerta de trecho crítico
  context/AppContext.js     estado global, ações e dados derivados
  utils/                    numeros.js (decimal pt-BR) e geometria.js (projeção do mapa)
  components/               componentes reutilizáveis (botão, card, toast, câmera, mapa…)
  screens/                  10 telas
__tests__/                  suítes Jest
docs/                       plano de negócio, testes, roteiro do vídeo, evidências
.github/workflows/          build do APK
```

**Princípio:** nenhuma tela importa `mockData` ou `AsyncStorage` diretamente; tudo passa pelo `AppContext`, que fala apenas com `services/`. Para ligar a API real da Motiva, só `mockApi.js` precisa mudar.

---

## 🧪 Testes

- **50 testes automatizados** (Jest) cobrindo conversão de números, camada de dados e projeção do mapa — `npm test`.
- **Bundle Android compilado** sem erros e fumaça no build web.
- As **3 falhas abertas da Sprint 3 foram corrigidas e reverificadas** (detalhes e capturas em [`docs/TESTES-SPRINT4.md`](docs/TESTES-SPRINT4.md)).
- O mesmo documento traz o roteiro de verificação no aparelho para câmera, GPS e notificações.

---

## 💼 Plano de negócio (resumo)

Detalhes completos em [`docs/PLANO-DE-NEGOCIO.md`](docs/PLANO-DE-NEGOCIO.md).

- **Valor:** do papel à decisão em minutos — registro com foto e GPS, ranking de urgência, ciclo fechado até a ordem de serviço, evidência para fiscalização e uso offline.
- **Quem usa / quem paga:** supervisores e inspetores usam; a gerência regional de operações da Motiva decide a compra.
- **Receita:** assinatura por km monitorado/ano — Essencial R$ 600, Conformidade R$ 900, Gerenciado R$ 1.300 — mais implantação de R$ 40 mil por concessão.
- **Custo:** ~R$ 416 mil no primeiro ano, com estrutura enxuta; equilíbrio com ~10% da malha da Motiva.
- **Piloto:** 1 regional de 180 km por 6 meses, deficitário por desenho (−R$ 87 mil) para validar o ganho antes da expansão.
- **Premissas de preço e custo são hipóteses do grupo**, marcadas como tais no documento, para validar com a Motiva.

---

## 🗓️ Resumo das entregas por Sprint

| Sprint | Entrega | Resultado |
|---|---|---|
| **1 — Exploração, requisitos e protótipo** | Compreensão do fluxo de conservação, persona Marcos, requisitos funcionais e não funcionais, stack justificada, protótipo navegável no Figma | Base conceitual e visual do projeto |
| **2 — App funcional com mock** | App React Native/Expo com telas e navegação, camada de mock com ocorrências, trechos e histórico, GPS e fluxo completo simulado | Primeiro app rodando com dados realistas |
| **3 — Protótipo funcional completo** | 10 telas, todos os fluxos, mock com sucesso/erro/vazio/falha, componentes reutilizáveis, 44 casos de teste (41 aprovados) | App completo e navegável |
| **4 — Versão final** | **Correção das 3 falhas**, **câmera real**, **mapa georreferenciado**, **notificação local**, ícone e splash, testes automatizados, **pipeline do APK**, plano de negócio, vídeo | Produto instalável e plano comercial |

### O que mudou da Sprint 3 para a Sprint 4

| Plano da Sprint 3 | Situação |
|---|---|
| Corrigir CT-5.6, CT-6.4, CT-9.4 | ✅ Concluído |
| Câmera real | ✅ `expo-camera` com permissão, compressão e persistência |
| Mapa geográfico | ✅ SVG georreferenciado offline *(decisão explicada acima)* |
| Notificação push quando trecho vira crítico | ✅ **Local** (sem servidor), funciona offline; push remoto depende de backend |
| Testes automatizados com Jest | ✅ 50 testes |
| Acessibilidade (contraste e área de toque) | ✅ Alvos de toque ampliados no mapa e no toast, contorno branco nos pontos, rótulos de acessibilidade |
| Ícone, splash e adaptive icon | ✅ Aplicados no `app.json` |
| Integração com a API real da Motiva | ⏳ Não realizada — não há API disponível; camada isolada e pronta (`mockApi.js`) |
| Indicador de dados em cache | ⏳ Fica para a integração com a API, quando houver diferença entre dado local e remoto |

---

## ⚠️ Limitações conhecidas

- **Dados mockados.** Não há API real da Motiva; as respostas vêm de `mockData.js` com latência e falhas simuladas. A troca é isolada em `services/mockApi.js`.
- **Alertas apenas locais.** A notificação do sistema é disparada no próprio aparelho; não há push remoto de outros usuários.
- **Foto sem upload.** A imagem fica no aparelho; o envio ao servidor depende da API.
- **Usuário único.** Existe apenas o perfil de supervisor; o perfil de campo está no roadmap.
- **Mapa vetorial.** Mostra a posição relativa dos trechos, não tiles de ruas.
- **APK de demonstração.** Assinado com a chave padrão do build; para publicação em loja é necessário configurar uma chave própria.

## 🗺️ Próximos passos

Integração com a API da Motiva, fila de sincronização offline, perfil de equipe de campo, push remoto, classificação assistida por visão computacional e relatórios para ARTESP/ANTT.

---

## 🔗 Links

- Protótipo no Figma: [Grovia — Figma](https://www.figma.com/design/2q0e7OFOKzfeIxQZSM0S6a/Motiva-Grovia?node-id=130-115&t=BfQdEL27nJ99Mdng-0)
