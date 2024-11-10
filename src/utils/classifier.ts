interface ClassificationResult {
  class: string;
  confidence: number;
}

export async function classifyImage(file: File): Promise<ClassificationResult> {
  // Simulated CNN model prediction with more realistic processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const conditions = [
        'Ovarian Cyst',
        'Uterine Fibroid',
        'Normal Tissue',
        'PCOS Indication'
      ];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomConfidence = 0.75 + Math.random() * 0.2; // 75-95% confidence

      resolve({
        class: randomCondition,
        confidence: randomConfidence
      });
    }, 1500);
  });
}