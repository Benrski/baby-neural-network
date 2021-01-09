export { ActivationFunction } from "./activation-functions/activation-function";
export { HyperbolicTangentActivationFunction } from "./activation-functions/hyperbolic-tangent.activation-function";
export { LinearActivationFunction } from "./activation-functions/linear.activation-function";
export { RectifiedLinearUnitActivationFunction } from "./activation-functions/rectified-linear-unit.activation-function";
export { SigmoidActivationFunction } from "./activation-functions/sigmoid.activation-function";
export {
  BackpropagationLearningAlgorithm,
  BackpropagationLearningAlgorithmOptions as BackpropagationLearningAlgorithmConfiguration,
} from "./learning-algorithms/backpropagation.learning-algorithm";
export { LearningAlgorithm } from "./learning-algorithms/learning-algorithm";
export { HiddenLayer } from "./neural-network/layers/hidden.layer";
export {
  InputLayer,
  InputLayerOptions as InputLayerConfiguration,
} from "./neural-network/layers/input.layer";
export {
  Layer,
  LayerOptions as LayerConfiguration,
} from "./neural-network/layers/layer";
export { OutputLayer } from "./neural-network/layers/output.layer";
export {
  NeuralNetwork,
  NeuralNetworkOptions as NeuralNetworkConfiguration,
} from "./neural-network/neural-network";
export {
  Neuron,
  NeuronOptions as NeuronConfiguration,
} from "./neural-network/neuron";
