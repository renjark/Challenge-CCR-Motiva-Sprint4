import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import Button from "./Button";
import { colors, radius } from "../styles/theme";

/**
 * Câmera em tela cheia para o registro fotográfico da inspeção.
 *  • pede permissão na primeira abertura
 *  • se a permissão for negada, explica e leva às configurações
 *  • comprime a imagem (qualidade 0.5) para poupar armazenamento e dados
 *  • qualquer erro de captura mostra mensagem e permite tentar de novo
 */
export default function CameraCaptura({ visivel, onFechar, onCapturada }) {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [pronta, setPronta] = useState(false);
  const [capturando, setCapturando] = useState(false);
  const [erro, setErro] = useState(null);

  async function tirarFoto() {
    if (!cameraRef.current || capturando) return;
    setCapturando(true);
    setErro(null);
    try {
      const foto = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: Platform.OS === "android",
      });
      if (!foto?.uri) throw new Error("A câmera não devolveu a imagem.");
      onCapturada(foto.uri);
      setPronta(false);
    } catch (e) {
      setErro(e?.message || "Não foi possível capturar a foto. Tente novamente.");
    } finally {
      setCapturando(false);
    }
  }

  function fechar() {
    setPronta(false);
    setErro(null);
    onFechar();
  }

  const carregandoPermissao = permissao === null;
  const negada = permissao && !permissao.granted;

  return (
    <Modal visible={visivel} animationType="slide" onRequestClose={fechar}>
      <View style={styles.root}>
        {carregandoPermissao ? (
          <View style={styles.centro}>
            <ActivityIndicator color={colors.white} size="large" />
          </View>
        ) : negada ? (
          <View style={styles.centro}>
            <Ionicons name="camera-outline" size={48} color={colors.white} />
            <Text style={styles.titulo}>Precisamos da câmera</Text>
            <Text style={styles.texto}>
              O registro fotográfico serve de evidência para fiscalizações da
              ARTESP e da ANTT. Autorize o acesso para fotografar o trecho.
            </Text>
            <Button
              title={permissao.canAskAgain ? "Autorizar câmera" : "Abrir configurações"}
              onPress={() =>
                permissao.canAskAgain ? pedirPermissao() : Linking.openSettings()
              }
              style={{ marginTop: 20, alignSelf: "stretch" }}
            />
            <Button
              title="Agora não"
              variant="ghost"
              onPress={fechar}
              style={{ marginTop: 10, alignSelf: "stretch", backgroundColor: colors.white }}
            />
          </View>
        ) : (
          <>
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              facing="back"
              onCameraReady={() => setPronta(true)}
              onMountError={(e) => setErro(e?.message || "Falha ao iniciar a câmera.")}
            />

            <View style={styles.topo}>
              <TouchableOpacity
                onPress={fechar}
                style={styles.fechar}
                accessibilityLabel="Fechar câmera"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={26} color={colors.white} />
              </TouchableOpacity>
            </View>

            {erro ? (
              <View style={styles.erro}>
                <Ionicons name="alert-circle" size={18} color={colors.white} />
                <Text style={styles.erroTexto}>{erro}</Text>
              </View>
            ) : null}

            <View style={styles.rodape}>
              <Text style={styles.dica}>Enquadre a vegetação e a sinalização do trecho</Text>
              <TouchableOpacity
                onPress={tirarFoto}
                disabled={!pronta || capturando}
                accessibilityLabel="Tirar foto"
                accessibilityRole="button"
                style={[styles.disparo, (!pronta || capturando) && { opacity: 0.5 }]}
              >
                {capturando ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <View style={styles.disparoMiolo} />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  centro: { flex: 1, alignItems: "center", justifyContent: "center", padding: 28 },
  titulo: { color: colors.white, fontSize: 20, fontWeight: "800", marginTop: 16 },
  texto: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  topo: { position: "absolute", top: 44, left: 16 },
  fechar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  erro: {
    position: "absolute",
    top: 110,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.critico,
    borderRadius: radius.md,
    padding: 12,
  },
  erroTexto: { color: colors.white, flex: 1, fontSize: 13, fontWeight: "600" },
  rodape: { position: "absolute", bottom: 40, left: 0, right: 0, alignItems: "center", gap: 18 },
  dica: {
    color: colors.white,
    fontSize: 13,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  disparo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "rgba(255,255,255,0.5)",
  },
  disparoMiolo: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary },
});
