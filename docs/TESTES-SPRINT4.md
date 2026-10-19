# Testes — Sprint 4

Reexecução das falhas abertas na Sprint 3 e cobertura dos recursos novos.

> O documento completo da Sprint 3 (44 casos, 41 aprovados e 3 reprovados) é `docs/TESTES-MANUAIS.md`. Ele não estava entre os arquivos usados para montar esta entrega; mantenha-o na pasta `docs/` do repositório final.

## 1. Falhas da Sprint 3 — correção e verificação

Verificadas no build web do app, com navegador automatizado (Playwright/Chromium, tela de 390×844), no cenário descrito em cada caso. Capturas em `docs/evidencias/`.

| ID | Falha na Sprint 3 | Correção | Resultado |
|---|---|---|---|
| CT-5.6 | Modal de OS fechava na falha de escrita e descartava o preenchido | O erro aparece **dentro** do modal (o toast global ficava atrás do `Modal` nativo), o modal permanece aberto, prioridade, equipe e descrição são mantidos e o botão vira "Tentar novamente" | **Aprovado** — com "Simular falha ao salvar" ligado: modal aberto, erro visível, prioridade "Média" e descrição preservadas |
| CT-6.4 | Campo de altura não aceitava vírgula e não explicava o formato | Novo `utils/numeros.js` aceita `85`, `85,5` e `85.5`; teclado decimal; texto de ajuda; mensagem clara para entrada inválida; valores exibidos com vírgula | **Aprovado** — `85,5` salvo e exibido como "85,5 cm"; `abc` mostra "Use apenas números, com vírgula ou ponto para decimais. Ex.: 85,5" |
| CT-9.4 | Limpeza de notificações irreversível | Toast com **DESFAZER** por 7 s; o conteúdo anterior é restaurado sem duplicar o que chegou depois | **Aprovado** — lista esvaziada, toast exibido, "DESFAZER" restaura os 6 alertas |

## 2. Testes automatizados (Jest)

`npm test` — 4 suítes, **50 testes aprovados**.

| Suíte | O que cobre |
|---|---|
| `numeros.test.js` | Leitura de decimal com vírgula/ponto, entradas inválidas, limite de altura, formatação pt-BR |
| `mockApi.test.js` | Login por e-mail (sucesso, maiúsculas/espaços, formato inválido, senha errada, campos vazios), leitura completa, erro de rede, base vazia, isolamento do seed, código sequencial de OS, falha de escrita, conclusão de OS, inspeção com e sem altura |
| `email.test.js` | Validação e normalização do e-mail de acesso |
| `geometria.test.js` | Projeção do mapa: todos os trechos dentro da área, agrupamento e ordem por km, orientação norte/oeste, lista vazia, ponto único, trecho sem coordenada |

## 3. Verificações de build

| Verificação | Resultado |
|---|---|
| `expo export --platform android` (bundle Hermes) | OK, 2,8 MB, sem erro de import ou sintaxe |
| `expo install --check` | Dependências compatíveis com o SDK 51 |
| Fumaça no build web: login → painel → mapa | OK; único erro de console é do `expo-camera` na versão web (script de QR em CDN) e não existe no Android |

## 4. Itens novos — verificação no aparelho (a executar pelo grupo)

Estes recursos dependem de hardware e **não puderam ser exercitados no ambiente de automação**. Execute no APK instalado antes de gravar o vídeo e preencha a coluna final.

| # | Caso | Passos | Esperado | OK? |
|---|---|---|---|---|
| N-1 | Instalação | Instalar o APK em Android 8+ | Abre sem travar, com ícone e splash do Grovia | ☐ |
| N-2 | Login | E-mail `marcos.andrade@motiva.com.br`, senha `grovia123` | Entra no painel | ☐ |
| N-3 | Permissão de câmera | Nova inspeção → "Tirar foto do trecho" | Pede permissão; ao autorizar, abre a câmera | ☐ |
| N-4 | Foto real | Tirar foto e salvar a inspeção | Miniatura na tela; foto aparece no histórico do trecho | ☐ |
| N-5 | Permissão negada | Negar a câmera | Mensagem explicativa e botão para autorizar/abrir configurações; app não quebra | ☐ |
| N-6 | Foto persiste | Fechar e reabrir o app | Foto continua no histórico | ☐ |
| N-7 | GPS | "Usar minha localização" | Mostra coordenadas do aparelho (ou do trecho, se negado) | ☐ |
| N-8 | Notificação local | Inspecionar um trecho OK/atenção marcando "Crítico" | Chega notificação do sistema "Trecho crítico — KM …" (aceitar a permissão no Android 13+) | ☐ |
| N-9 | Mapa | Aba Mapa, arrastar e tocar em pontos | Pontos coloridos por status; toque abre o painel do trecho | ☐ |
| N-10 | Cenários | Perfil → ligar falha de rede / base vazia / falha ao salvar | Estados de erro, vazio e falha aparecem; "Restaurar dados" volta ao normal | ☐ |
| N-11 | Fluxo completo | Abrir OS → em campo → concluir | Status do trecho vira OK e o painel atualiza | ☐ |
| N-12 | Offline | Modo avião, abrir o app | Abre com os dados salvos | ☐ |
