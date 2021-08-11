import vertexShader from './cloneTool.vert';
import fragmentShader from './cloneTool.frag';

let cloneTool = function(
  { center, radius, templateCenter, startCenter, hardness, ratio } = {
    center: [0.5, 0.5],
    radius: 1.0,
    templateCenter: [0.5, 0.5],
    startCenter: [0.5, 0.5],
    hardness: 1.0,
    ratio: 16 / 9,
  }
) {
  console.log(
    'filter input center:',
    center,
    'radius',
    radius,
    'templateCenter',
    templateCenter,
    'startCenter',
    startCenter,
    hardness,
    ratio
  );
  console.log(`temp -start ${templateCenter[0] - startCenter[0]} ,
     ${templateCenter[1] - startCenter[1]}
  `);
  return {
    title: 'Gaussian-Blur',
    description: 'A wobbly gaussian blur effect. Typically used as a filter.',
    vertexShader,
    fragmentShader,
    properties: {
      u_center: {
        type: 'vec2',
        value: center,
      },
      u_radius: { type: 'uniform', value: radius },
      u_templateCenter: {
        type: 'vec2',
        value: templateCenter,
      },
      u_startCenter: {
        type: 'vec2',
        value: startCenter,
      },

      u_hardness: { type: 'uniform', value: hardness },
      u_ratio: { type: 'uniform', value: ratio },
    },
    inputs: ['u_image'],
  };
};

export default cloneTool;
