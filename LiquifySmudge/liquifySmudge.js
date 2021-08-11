import vertexShader from './liquifySmudge.vert';
import fragmentShader from './liquifySmudge.frag';

let liquifySmudge = function(
  { center, radius, strength, delta, ratio } = {
    center: [0.5, 0.5],
    // 移动的距离方向
    delta: [0.01, 0.01],
    radius: 1.0,
    strength: 8.0,
    ratio: 16 / 9,
  }
) {
  return {
    title: 'liquifySmudge',
    description:
      'Pressure-sensitive brush filter for liquefaction Smudge effect',
    vertexShader,
    fragmentShader,
    properties: {
      u_center: {
        type: 'vec2',
        value: center,
      },
      u_radius: { type: 'uniform', value: radius },
      u_strength: { type: 'uniform', value: strength },
      u_delta: { type: 'vec2', value: delta },
      u_ratio: { type: 'uniform', value: ratio },
    },
    inputs: ['u_image'],
  };
};

export default liquifySmudge;
