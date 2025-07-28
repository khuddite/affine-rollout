import { api } from "./axios";
import { RolloutParams } from "./rollouts.type";

export const getRollouts = async (params: RolloutParams) => {
  const response = await api.get("/api/rollouts", { params });

  return response.data;
};

export const getRolloutMetrics = async () => {
  const response = await api.get("/api/rollouts-metrics");

  return response.data;
};

export const getRolloutsByModel = async () => {
  const response = await api.get("/api/rollouts/by-model");

  return response.data;
};
