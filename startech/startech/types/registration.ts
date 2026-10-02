export type MissionName =
  | "Chandrayaan-2"
  | "NASA LRO"
  | "JAXA SELENE";

export type InstrumentName =
  | "OHRC"
  | "TMC"
  | "IIRS"
  | "LRO NAC"
  | "SELENE TC";

export interface ImageMetadata {
  mission: MissionName;
  instrument: InstrumentName;
  resolution: string; // e.g. "0.25 m/pixel"
  acquisitionDate: string;
  sunElevation: string;
  imageDimensions: string;
  targetRegion: string;
  coordinates: string; // e.g. "70.9° S, 22.8° E"
  projection: string;
  bitDepth: string;
}

export type RegistrationMode = "automatic" | "classical" | "deep_learning" | "advanced";

export interface AlgorithmConfig {
  detector: "SuperPoint" | "SIFT" | "AKAZE" | "ASIFT";
  matcher: "LightGlue" | "FLANN" | "BFMatcher" | "LoFTR";
  outlierRejection: "RANSAC" | "PROSAC";
  transform: "Homography" | "Affine" | "TPS";
}

export type PipelineStageKey =
  | "ingestion"
  | "preprocessing"
  | "detection"
  | "matching"
  | "filtering"
  | "transformation"
  | "evaluation";

export type StageStatus = "pending" | "running" | "completed" | "failed";

export interface PipelineStage {
  id: PipelineStageKey;
  stepNumber: string;
  title: string;
  subtitle: string;
  algorithms: string[];
  status: StageStatus;
  progress: number;
  durationMs?: number;
  details?: string;
}

export interface FeaturePoint {
  id: number;
  x: number;
  y: number;
  score?: number;
}

export interface MatchCorrespondence {
  id: number;
  sourcePoint: FeaturePoint;
  referencePoint: FeaturePoint;
  status: "inlier" | "outlier" | "candidate";
  confidence: number;
  residualErrorPx?: number;
}

export interface TransformationMatrix {
  method: "Homography" | "Affine" | "TPS";
  matrix: number[][]; // 3x3 matrix
  determinant: number;
  rotationDeg: number;
  scaleFactor: number;
  translationPx: [number, number];
}

export interface EvaluationMetrics {
  rmse: number; // Root Mean Square Error in pixels
  inliers: number;
  totalMatches: number;
  inlierRatio: number; // Percentage
  repeatability: number; // Percentage
  processingTimeSec: number;
  mutualInformation: number;
  structuralSimilarityIndex: number; // SSIM
}

export interface RegistrationJob {
  id: string;
  timestamp: string;
  source: {
    mission: MissionName;
    instrument: InstrumentName;
    imageUrl: string;
  };
  reference: {
    mission: MissionName;
    instrument: InstrumentName;
    imageUrl: string;
  };
  registeredImageUrl: string;
  algorithm: AlgorithmConfig;
  status: "completed" | "processing" | "failed";
  metrics: EvaluationMetrics;
  transformation: TransformationMatrix;
  correspondences: MatchCorrespondence[];
}
