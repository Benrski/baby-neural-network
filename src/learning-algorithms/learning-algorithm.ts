export interface LearningAlgorithm {
  train(): void;

  setTrainingData(
    trainingInputs: number[][],
    trainingOutputs: number[][]
  ): void;

  addTrainingData(trainingInputs: number[], trainingOutputs: number[]): void;

  clearTrainingData(): void;
}
