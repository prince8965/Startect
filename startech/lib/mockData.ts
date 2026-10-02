import {
  ImageMetadata,
  AlgorithmConfig,
  PipelineStage,
  MatchCorrespondence,
  TransformationMatrix,
  EvaluationMetrics,
  RegistrationJob,
} from "@/types/registration";

/**
 * STARTECH Demonstration Data Layer
 * Note: These are simulated telemetry and registration coordinates engineered for
 * the SIH 2026 jury demonstration. Real production runs will pull live from the FastAPI backend.
 */

export const DEMO_SOURCE_METADATA: ImageMetadata = {
  mission: "Chandrayaan-2",
  instrument: "OHRC",
  resolution: "0.25 m/pixel",
  acquisitionDate: "2026-03-14T06:42:19Z",
  sunElevation: "22.4°",
  imageDimensions: "4096 × 4096 px",
  targetRegion: "Boguslawsky Crater South-East Rim",
  coordinates: "72.90° S, 43.20° E",
  projection: "Polar Stereographic (Moon 2000)",
  bitDepth: "16-bit GeoTIFF / PDS4",
};

export const DEMO_REFERENCE_METADATA: ImageMetadata = {
  mission: "NASA LRO",
  instrument: "LRO NAC",
  resolution: "0.50 m/pixel",
  acquisitionDate: "2024-11-02T18:15:03Z",
  sunElevation: "34.8°",
  imageDimensions: "5064 × 5064 px",
  targetRegion: "Boguslawsky Crater Central Floor",
  coordinates: "72.88° S, 43.18° E",
  projection: "Polar Stereographic (Moon 2000)",
  bitDepth: "16-bit GeoTIFF / PDS4",
};

export const DEFAULT_ALGORITHM_CONFIG: AlgorithmConfig = {
  detector: "SuperPoint",
  matcher: "LightGlue",
  outlierRejection: "RANSAC",
  transform: "Homography",
};

export const DEMO_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "ingestion",
    stepNumber: "01",
    title: "DATA INGESTION",
    subtitle: "PDS4 / GeoTIFF Multi-sensor ingestion & radiometric normalization",
    algorithms: ["GDAL", "PDS4 Parser", "16-bit to 8-bit Float Transform"],
    status: "completed",
    progress: 100,
    durationMs: 820,
    details: "Ingested Chandrayaan-2 OHRC (0.25m) & NASA LRO NAC (0.50m) successfully.",
  },
  {
    id: "preprocessing",
    stepNumber: "02",
    title: "PREPROCESSING",
    subtitle: "Contrast stretching, CLAHE illumination balancing & Gaussian denoising",
    algorithms: ["Adaptive CLAHE", "Bilateral Filter", "Dynamic Range Normalization"],
    status: "completed",
    progress: 100,
    durationMs: 1140,
    details: "Illumination disparity compensated. Dynamic range harmonized across 16-bit sensors.",
  },
  {
    id: "detection",
    stepNumber: "03",
    title: "FEATURE DETECTION",
    subtitle: "Lunar crater rims, boulder fields & sub-pixel keypoint extraction",
    algorithms: ["SuperPoint", "AKAZE", "Multi-scale Harris"],
    status: "completed",
    progress: 100,
    durationMs: 2450,
    details: "Extracted 12,482 high-confidence keypoints from OHRC and 10,914 from LRO NAC.",
  },
  {
    id: "matching",
    stepNumber: "04",
    title: "FEATURE MATCHING",
    subtitle: "Cross-mission deep descriptor correspondence with positional encoding",
    algorithms: ["LightGlue", "Attentional GNN", "Mutual Nearest Neighbors"],
    status: "completed",
    progress: 100,
    durationMs: 1890,
    details: "Established 4,921 candidate correspondences across rotation and lighting shifts.",
  },
  {
    id: "filtering",
    stepNumber: "05",
    title: "OUTLIER REJECTION",
    subtitle: "RANSAC epipolar constraint filtering & false-match pruning",
    algorithms: ["Adaptive RANSAC", "PROSAC", "Sampson Distance Verification"],
    status: "completed",
    progress: 100,
    durationMs: 980,
    details: "Filtered 1,074 spurious matches. Isolated 3,847 geometrically verified inliers.",
  },
  {
    id: "transformation",
    stepNumber: "06",
    title: "TRANSFORM ESTIMATION & WARP",
    subtitle: "Sub-pixel 3x3 Homography projection & bicubic surface warping",
    algorithms: ["Direct Linear Transform (DLT)", "Bicubic Resampling", "TPS Residual Warp"],
    status: "completed",
    progress: 100,
    durationMs: 740,
    details: "Homography matrix converged (Det = 1.002, Rotation = 1.42°, Translation = [-18.4, 32.1]).",
  },
  {
    id: "evaluation",
    stepNumber: "07",
    title: "METRIC EVALUATION",
    subtitle: "RMSE geometric residual, repeatability verification & SSIM computation",
    algorithms: ["RMSE Metric Engine", "Feature Repeatability Test", "Local Correlation"],
    status: "completed",
    progress: 100,
    durationMs: 410,
    details: "Final RMSE: 0.84 px (sub-pixel accuracy). Inlier Ratio: 92.7%. Registration verified.",
  },
];

export const DEMO_EVALUATION_METRICS: EvaluationMetrics = {
  rmse: 0.84,
  inliers: 3847,
  totalMatches: 4921,
  inlierRatio: 92.7,
  repeatability: 91.4,
  processingTimeSec: 8.43,
  mutualInformation: 1.48,
  structuralSimilarityIndex: 0.942,
};

export const DEMO_TRANSFORMATION_MATRIX: TransformationMatrix = {
  method: "Homography",
  matrix: [
    [0.9984, 0.0124, 23.41],
    [-0.0093, 1.0031, 11.72],
    [0.0000021, -0.0000015, 1.0],
  ],
  determinant: 1.0018,
  rotationDeg: 0.71,
  scaleFactor: 1.0007,
  translationPx: [23.41, 11.72],
};

// Generate 48 realistic paired match coordinates normalized between 5% and 95% of the frame
function generateMockCorrespondences(): MatchCorrespondence[] {
  const correspondences: MatchCorrespondence[] = [];
  const seedPoints = [
    { x: 18, y: 22 }, { x: 32, y: 19 }, { x: 45, y: 24 }, { x: 68, y: 18 }, { x: 82, y: 25 },
    { x: 15, y: 38 }, { x: 28, y: 42 }, { x: 49, y: 39 }, { x: 63, y: 45 }, { x: 85, y: 40 },
    { x: 22, y: 56 }, { x: 36, y: 62 }, { x: 52, y: 58 }, { x: 74, y: 61 }, { x: 88, y: 55 },
    { x: 19, y: 76 }, { x: 34, y: 81 }, { x: 58, y: 78 }, { x: 70, y: 84 }, { x: 86, y: 79 },
    { x: 25, y: 30 }, { x: 40, y: 32 }, { x: 55, y: 28 }, { x: 78, y: 34 }, { x: 30, y: 50 },
    { x: 44, y: 51 }, { x: 60, y: 53 }, { x: 79, y: 48 }, { x: 27, y: 70 }, { x: 48, y: 72 },
    { x: 65, y: 69 }, { x: 81, y: 74 }, { x: 12, y: 60 }, { x: 92, y: 35 }, { x: 14, y: 85 },
    { x: 89, y: 15 }, { x: 50, y: 15 }, { x: 50, y: 88 }, { x: 38, y: 12 }, { x: 64, y: 88 },
  ];

  seedPoints.forEach((pt, idx) => {
    // Introduce 15% outliers with mismatched vector drift
    const isOutlier = idx % 6 === 2;
    const isCandidate = idx % 9 === 0;

    const driftX = isOutlier ? (idx % 2 === 0 ? 14 : -16) : 2.5 + (idx % 3) * 0.4;
    const driftY = isOutlier ? (idx % 2 === 0 ? -15 : 18) : 1.8 + (idx % 2) * 0.3;

    correspondences.push({
      id: idx + 1,
      sourcePoint: {
        id: idx * 2 + 1,
        x: pt.x,
        y: pt.y,
        score: 0.88 + (idx % 10) * 0.01,
      },
      referencePoint: {
        id: idx * 2 + 2,
        x: Math.min(96, Math.max(4, pt.x + driftX)),
        y: Math.min(96, Math.max(4, pt.y + driftY)),
        score: 0.85 + (idx % 10) * 0.01,
      },
      status: isOutlier ? "outlier" : isCandidate ? "candidate" : "inlier",
      confidence: isOutlier ? 0.42 : 0.94 - (idx % 5) * 0.02,
      residualErrorPx: isOutlier ? 8.4 : 0.62 + (idx % 4) * 0.15,
    });
  });

  return correspondences;
}

export const DEMO_CORRESPONDENCES = generateMockCorrespondences();

export const HISTORICAL_JOBS: RegistrationJob[] = [
  {
    id: "ST-00128",
    timestamp: "2026-09-07 18:42:10 UTC",
    source: {
      mission: "Chandrayaan-2",
      instrument: "OHRC",
      imageUrl: "/demo/source_ohrc.svg",
    },
    reference: {
      mission: "NASA LRO",
      instrument: "LRO NAC",
      imageUrl: "/demo/ref_lro.svg",
    },
    registeredImageUrl: "/demo/registered_warp.svg",
    algorithm: {
      detector: "SuperPoint",
      matcher: "LightGlue",
      outlierRejection: "RANSAC",
      transform: "Homography",
    },
    status: "completed",
    metrics: DEMO_EVALUATION_METRICS,
    transformation: DEMO_TRANSFORMATION_MATRIX,
    correspondences: DEMO_CORRESPONDENCES,
  },
  {
    id: "ST-00127",
    timestamp: "2026-09-07 14:15:32 UTC",
    source: {
      mission: "Chandrayaan-2",
      instrument: "TMC",
      imageUrl: "/demo/source_ohrc.png",
    },
    reference: {
      mission: "NASA LRO",
      instrument: "LRO NAC",
      imageUrl: "/demo/ref_lro.png",
    },
    registeredImageUrl: "/demo/registered_warp.png",
    algorithm: {
      detector: "AKAZE",
      matcher: "FLANN",
      outlierRejection: "RANSAC",
      transform: "Affine",
    },
    status: "completed",
    metrics: {
      rmse: 1.21,
      inliers: 2940,
      totalMatches: 3360,
      inlierRatio: 87.5,
      repeatability: 84.1,
      processingTimeSec: 6.82,
      mutualInformation: 1.32,
      structuralSimilarityIndex: 0.912,
    },
    transformation: {
      method: "Affine",
      matrix: [
        [0.995, 0.015, 18.2],
        [-0.012, 1.002, 9.4],
        [0, 0, 1],
      ],
      determinant: 0.997,
      rotationDeg: 0.85,
      scaleFactor: 0.998,
      translationPx: [18.2, 9.4],
    },
    correspondences: DEMO_CORRESPONDENCES.slice(0, 30),
  },
  {
    id: "ST-00126",
    timestamp: "2026-09-06 21:05:44 UTC",
    source: {
      mission: "Chandrayaan-2",
      instrument: "OHRC",
      imageUrl: "/demo/source_ohrc.png",
    },
    reference: {
      mission: "JAXA SELENE",
      instrument: "SELENE TC",
      imageUrl: "/demo/ref_lro.png",
    },
    registeredImageUrl: "/demo/registered_warp.png",
    algorithm: {
      detector: "SIFT",
      matcher: "BFMatcher",
      outlierRejection: "PROSAC",
      transform: "TPS",
    },
    status: "completed",
    metrics: {
      rmse: 1.48,
      inliers: 1980,
      totalMatches: 2540,
      inlierRatio: 77.9,
      repeatability: 73.2,
      processingTimeSec: 12.14,
      mutualInformation: 1.15,
      structuralSimilarityIndex: 0.875,
    },
    transformation: {
      method: "TPS",
      matrix: [
        [0.989, 0.021, -34.2],
        [-0.018, 0.992, 45.1],
        [0, 0, 1],
      ],
      determinant: 0.982,
      rotationDeg: 1.22,
      scaleFactor: 0.991,
      translationPx: [-34.2, 45.1],
    },
    correspondences: DEMO_CORRESPONDENCES.slice(0, 25),
  },
  {
    id: "ST-00125",
    timestamp: "2026-09-06 16:30:12 UTC",
    source: {
      mission: "Chandrayaan-2",
      instrument: "IIRS",
      imageUrl: "/demo/source_ohrc.png",
    },
    reference: {
      mission: "NASA LRO",
      instrument: "LRO NAC",
      imageUrl: "/demo/ref_lro.png",
    },
    registeredImageUrl: "/demo/registered_warp.png",
    algorithm: {
      detector: "SuperPoint",
      matcher: "LoFTR",
      outlierRejection: "RANSAC",
      transform: "Homography",
    },
    status: "completed",
    metrics: {
      rmse: 0.96,
      inliers: 3412,
      totalMatches: 3790,
      inlierRatio: 90.0,
      repeatability: 88.7,
      processingTimeSec: 9.65,
      mutualInformation: 1.39,
      structuralSimilarityIndex: 0.928,
    },
    transformation: DEMO_TRANSFORMATION_MATRIX,
    correspondences: DEMO_CORRESPONDENCES,
  },
];

export const ALGORITHM_LAB_DATA = [
  {
    detector: "SuperPoint + LightGlue",
    type: "Deep Learning (Attentional GNN)",
    keypoints: "12,482",
    candidateMatches: "4,921",
    inliers: "3,847",
    inlierRatio: "92.7%",
    rmse: "0.84 px",
    processingTime: "8.4 s",
    illuminationRobustness: "Superior",
    recommended: true,
  },
  {
    detector: "LoFTR (Detector-Free)",
    type: "Deep Learning (Transformer)",
    keypoints: "Dense Grid",
    candidateMatches: "5,410",
    inliers: "3,990",
    inlierRatio: "89.4%",
    rmse: "0.92 px",
    processingTime: "14.2 s",
    illuminationRobustness: "High",
    recommended: false,
  },
  {
    detector: "AKAZE + FLANN",
    type: "Classical (Nonlinear Scale Space)",
    keypoints: "8,920",
    candidateMatches: "3,110",
    inliers: "2,420",
    inlierRatio: "77.8%",
    rmse: "1.18 px",
    processingTime: "4.1 s",
    illuminationRobustness: "Moderate",
    recommended: false,
  },
  {
    detector: "SIFT + BFMatcher",
    type: "Classical (Scale-Invariant)",
    keypoints: "9,640",
    candidateMatches: "3,520",
    inliers: "2,610",
    inlierRatio: "74.1%",
    rmse: "1.29 px",
    processingTime: "5.8 s",
    illuminationRobustness: "Moderate",
    recommended: false,
  },
  {
    detector: "ASIFT (Affine SIFT)",
    type: "Classical (Affine Simulation)",
    keypoints: "18,400",
    candidateMatches: "4,820",
    inliers: "3,150",
    inlierRatio: "65.3%",
    rmse: "1.42 px",
    processingTime: "28.5 s",
    illuminationRobustness: "High (Angle)",
    recommended: false,
  },
];
