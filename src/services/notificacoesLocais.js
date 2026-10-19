// ============================================================
// notificacoesLocais.js — Alertas no sistema operacional
// ------------------------------------------------------------
// Dispara uma notificação local (sem servidor, sem internet)
// quando um trecho passa a ser crítico. Todas as chamadas são
// protegidas: se a permissão for negada ou o módulo falhar, o
// app continua e o alerta permanece na central interna.
// ============================================================

import { Platform } from "react-native";

const CANAL = "grovia-alertas";
let configurado = false;

function carregarModulo() {
  try {
    return require("expo-notifications");
  } catch (e) {
    return null;
  }
}

/** Configura o canal Android e o comportamento em primeiro plano. */
export async function configurar() {
  if (configurado) return true;
  const Notifications = carregarModulo();
  if (!Notifications) return false;
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync(CANAL, {
        name: "Alertas de vegetação",
        importance: Notifications.AndroidImportance.HIGH,
        lightColor: "#6B21E8",
      });
    }
    configurado = true;
    return true;
  } catch (e) {
    console.warn("[notificacoes] configuração falhou", e?.message);
    return false;
  }
}

/** Pede permissão (Android 13+ exige). Devolve true se concedida. */
export async function pedirPermissao() {
  const Notifications = carregarModulo();
  if (!Notifications) return false;
  try {
    const atual = await Notifications.getPermissionsAsync();
    if (atual.granted) return true;
    const pedido = await Notifications.requestPermissionsAsync();
    return !!pedido.granted;
  } catch (e) {
    return false;
  }
}

export async function alertarTrechoCritico(trecho) {
  const Notifications = carregarModulo();
  if (!Notifications || !trecho) return false;
  try {
    await configurar();
    if (!(await pedirPermissao())) return false;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Trecho crítico — KM ${trecho.km_inicio} (${trecho.rodovia})`,
        body: trecho.anomalia || "Vegetação em nível crítico. Abra uma ordem de serviço.",
        data: { trechoId: trecho.id },
      },
      trigger: null,
    });
    return true;
  } catch (e) {
    console.warn("[notificacoes] não foi possível alertar", e?.message);
    return false;
  }
}

export default { configurar, pedirPermissao, alertarTrechoCritico };
