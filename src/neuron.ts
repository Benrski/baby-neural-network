import {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
} from './activationFunction';

export interface Neuron {
  inputs: number[];
  weights: number[];
  bias: number;
  output: number;
  activationType: ActivationFunctionType;
}

export const newNeuron = (
  fields: Partial<Neuron> & Pick<Neuron, 'activationType'>
): Neuron => ({
  inputs: [],
  weights: [],
  bias: 0,
  output: 0,
  ...fields,
});

export const setInputs = (neuron: Neuron, inputs: number[]): Neuron => ({
  ...neuron,
  inputs,
});

export const setWeights = (neuron: Neuron, weights: number[]): Neuron => ({
  ...neuron,
  weights,
});

export const setBias = (neuron: Neuron, bias: number): Neuron => ({
  ...neuron,
  bias,
});

export const setOutput = (neuron: Neuron, output: number): Neuron => ({
  ...neuron,
  output,
});

export const setActivationType = (
  neuron: Neuron,
  activationType: ActivationFunctionType
): Neuron => ({
  ...neuron,
  activationType,
});

export const updateOutput = (neuron: Neuron): Neuron => {
  const { bias, inputs, weights, activationType } = neuron;
  const activation = ACTIVATION_FUNCTIONS[activationType];
  const outputBeforeActivation = weights.reduce(
    (acc, weight, i) => acc + weight * inputs[i],
    bias
  );
  const output = activation.activate(outputBeforeActivation);
  return setOutput(neuron, output);
};
