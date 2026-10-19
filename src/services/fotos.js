// ============================================================
// fotos.js — Armazenamento das fotos de inspeção
// ------------------------------------------------------------
// A câmera entrega a imagem em uma pasta de cache que o sistema
// pode limpar. Aqui copiamos o arquivo para o armazenamento
// permanente do app. Se algo falhar, devolvemos a URI original
// e o app segue funcionando.
// ============================================================

export async function persistir(uriOrigem, nome) {
  if (!uriOrigem) return null;
  try {
    const FileSystem = require("expo-file-system");
    const pasta = `${FileSystem.documentDirectory}inspecoes/`;
    const info = await FileSystem.getInfoAsync(pasta);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(pasta, { intermediates: true });
    }
    const destino = `${pasta}${nome}.jpg`;
    await FileSystem.copyAsync({ from: uriOrigem, to: destino });
    return destino;
  } catch (e) {
    console.warn("[fotos] não foi possível persistir a foto", e?.message);
    return uriOrigem;
  }
}

export default { persistir };
