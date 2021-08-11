import vertexShader from '../LiquifyBlow/liquifyBlow.vert';
import fragmentShader from '../LiquifyBlow/liquifyBlow.frag';

let liquifyShrink = function(
  { center, radius, strength, ratio } = {
    center: [0.5, 0.5],
    radius: 1.0,
    strength: 8.0,
    ratio: 16 / 9,
  }
) {
  return {
    title: 'liquifyShrink',
    description:
      'Pressure-sensitive brush filter for liquefaction shrink effect',
    vertexShader,
    fragmentShader,
    properties: {
      u_center: {
        type: 'vec2',
        value: center,
      },
      u_radius: { type: 'uniform', value: radius },
      u_strength: { type: 'uniform', value: strength },
      u_ratio: { type: 'uniform', value: ratio },
      u_isBlow: { type: 'uniform', value: 1.0 },
    },
    inputs: ['u_image'],
  };
};

export default liquifyShrink;
