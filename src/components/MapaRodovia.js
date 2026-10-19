import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Svg, { Rect, Line, Polyline, Circle, Text as SvgText, G } from "react-native-svg";
import { colors, statusLabels } from "../styles/theme";

import { montarGeometria, LARGURA } from "../utils/geometria";

/**
 * Mapa vetorial georreferenciado dos trechos.
 *
 * Por que não react-native-maps? A solução precisa funcionar offline em trechos
 * sem sinal (RNF do projeto) e o Google Maps exige chave de API e tiles baixados.
 * Aqui as coordenadas (lat/lng) de cada trecho são projetadas em um plano e a
 * rodovia é desenhada ligando os trechos em ordem de km. Quando a API real
 * entregar a geometria completa, basta trocar `pontos` por polilinhas reais.
 */
export default function MapaRodovia({ trechos, selecionadoId, onSelecionar }) {
  const { pontos, rodovias, altura } = useMemo(() => montarGeometria(trechos), [trechos]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <Svg width={LARGURA} height={altura} accessibilityLabel="Mapa esquemático dos trechos">
          <Rect x={0} y={0} width={LARGURA} height={altura} rx={14} fill="#256B29" />

          {/* grade de referência */}
          {[1, 2, 3, 4, 5].map((i) => (
            <Line
              key={`v${i}`}
              x1={(LARGURA / 6) * i}
              y1={0}
              x2={(LARGURA / 6) * i}
              y2={altura}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={1}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <Line
              key={`h${i}`}
              x1={0}
              y1={(altura / 4) * i}
              x2={LARGURA}
              y2={(altura / 4) * i}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={1}
            />
          ))}

          {/* traçado de cada rodovia */}
          {rodovias.map((r) => (
            <G key={r.nome}>
              <Polyline
                points={r.pontos.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth={9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Polyline
                points={r.pontos.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#D9D9D9"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <SvgText
                x={r.pontos[0].x}
                y={r.pontos[0].y - 24}
                fill={colors.white}
                fontSize={12}
                fontWeight="bold"
                textAnchor="middle"
              >
                {r.nome}
              </SvgText>
            </G>
          ))}

          {/* trechos */}
          {pontos.map((p) => {
            const sel = p.trecho.id === selecionadoId;
                        return (
              <G key={p.trecho.id}>
                {sel && <Circle cx={p.x} cy={p.y} r={19} fill="rgba(255,255,255,0.35)" />}
                <Circle
                  cx={p.x}
                  cy={p.y}
                  r={11}
                  fill={colors[p.trecho.status]}
                  stroke={colors.white}
                  strokeWidth={sel ? 4 : 2.5}
                />
                <SvgText
                  x={p.x}
                  y={p.y + 32}
                  fill={colors.white}
                  fontSize={11}
                  fontWeight={sel ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {`KM ${p.trecho.km_inicio}`}
                </SvgText>
                {/* alvo de toque ampliado (~48 dp) */}
                <Circle
                  cx={p.x}
                  cy={p.y}
                  r={24}
                  fill="transparent"
                  onPress={() => onSelecionar(p.trecho)}
                  accessibilityLabel={`Trecho KM ${p.trecho.km_inicio}, ${
                    statusLabels[p.trecho.status]
                  }`}
                />
              </G>
            );
          })}
        </Svg>
      </View>
    </ScrollView>
  );
}
