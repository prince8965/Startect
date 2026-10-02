import {
  RegistrationJob,
  AlgorithmConfig,
  EvaluationMetrics,
  TransformationMatrix,
  MatchCorrespondence,
  PipelineStage,
} from "@/types/registration";
import {
  DEMO_SOURCE_METADATA,
  DEMO_REFERENCE_METADATA,
  DEMO_PIPELINE_STAGES,
  DEMO_EVALUATION_METRICS,
  DEMO_TRANSFORMATION_MATRIX,
  DEMO_CORRESPONDENCES,
  HISTORICAL_JOBS,
} from "./mockData";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
export const IS_DEMO_MODE_ACTIVE = true; // Enabled by default for SIH offline/demo presentation

export interface RegistrationPayload {
  sourceImage?: File | string;
  referenceImage?: File | string;
  sourceMission: string;
  sourceInstrument: string;
  referenceMission: string;
  referenceInstrument: string;
  config: AlgorithmConfig;
}

export interface RegistrationStatusResponse {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  progressPercent: number;
  currentStage: string;
  activeStageIndex: number;
  stages: PipelineStage[];
  elapsedSeconds: number;
}

/**
 * STARTECH Centralized API Client
 * Facilitates asynchronous registration jobs, SSE/polling status updates, and evaluation requests.
 */
export const StartechApi = {
  /**
   * Submit registration job (Source + Reference + Algorithm Config)
   */
  async submitRegistration(payload: RegistrationPayload): Promise<{ jobId: string; status: string }> {
    try {
      if (IS_DEMO_MODE_ACTIVE) {
        // Return simulated immediate job acceptance
        const newJobId = `ST-${Math.floor(10000 + Math.random() * 90000)}`;
        return { jobId: newJobId, status: "processing" };
      }

      const formData = new FormData();
      if (typeof payload.sourceImage !== "string" && payload.sourceImage) {
        formData.append("source_file", payload.sourceImage);
      }
      if (typeof payload.referenceImage !== "string" && payload.referenceImage) {
        formData.append("reference_file", payload.referenceImage);
      }
      formData.append("source_mission", payload.sourceMission);
      formData.append("source_instrument", payload.sourceInstrument);
      formData.append("reference_mission", payload.referenceMission);
      formData.append("reference_instrument", payload.referenceInstrument);
      formData.append("detector", payload.config.detector);
      formData.append("matcher", payload.config.matcher);
      formData.append("outlier_rejection", payload.config.outlierRejection);
      formData.append("transform", payload.config.transform);

      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Registration submission failed: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.warn("API request failed or running in demo mode. Falling back to simulated job.", err);
      return { jobId: "ST-00128", status: "processing" };
    }
  },

  /**
   * Query processing job status during async pipeline execution
   */
  async getJobStatus(jobId: string): Promise<RegistrationStatusResponse> {
    try {
      if (IS_DEMO_MODE_ACTIVE) {
        return {
          jobId,
          status: "completed",
          progressPercent: 100,
          currentStage: "evaluation",
          activeStageIndex: 6,
          stages: DEMO_PIPELINE_STAGES,
          elapsedSeconds: 8.43,
        };
      }

      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/status`);
      if (!res.ok) throw new Error(`Failed to fetch job status: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      return {
        jobId,
        status: "completed",
        progressPercent: 100,
        currentStage: "evaluation",
        activeStageIndex: 6,
        stages: DEMO_PIPELINE_STAGES,
        elapsedSeconds: 8.43,
      };
    }
  },

  /**
   * Fetch complete registration result payload (warped image, correspondences, matrix, metrics)
   */
  async getJobResult(jobId: string): Promise<RegistrationJob> {
    try {
      if (IS_DEMO_MODE_ACTIVE) {
        const found = HISTORICAL_JOBS.find((j) => j.id === jobId);
        return found || HISTORICAL_JOBS[0];
      }

      const res = await fetch(`${API_BASE_URL}/results/${jobId}`);
      if (!res.ok) throw new Error(`Failed to fetch job results: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      return HISTORICAL_JOBS[0];
    }
  },

  /**
   * Fetch all historical mission registrations
   */
  async getHistoricalJobs(): Promise<RegistrationJob[]> {
    try {
      if (IS_DEMO_MODE_ACTIVE) {
        return HISTORICAL_JOBS;
      }

      const res = await fetch(`${API_BASE_URL}/jobs`);
      if (!res.ok) throw new Error(`Failed to fetch jobs history: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      return HISTORICAL_JOBS;
    }
  },
};
