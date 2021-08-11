import vertexShader from './swirl.vert';
import fragmentShader from './swirl.frag';

let swirl = function(
  { center, radius, rotateStrength, progress, ratio } = {
    center: [0.5, 0.5],
    radius: 1.0,
    rotateStrength: 8.0,
    progress: 0.2,
    ratio: 16 / 9,
  }
) {
  return {
    title: 'Swirl',
    description:
      'Pressure-sensitive brush filter for liquefaction rotation effect',
    vertexShader,
    fragmentShader,
    properties: {
      u_center: {
        type: 'vec2',
        value: center,
      },
      u_radius: { type: 'uniform', value: radius },
      u_rotateStrength: { type: 'uniform', value: rotateStrength },
      u_progress: { type: 'uniform', value: progress },
      u_ratio: { type: 'uniform', value: ratio },
    },
    inputs: ['u_image'],
  };
};

export default swirl;
