import { api } from "./axios";
import { RolloutParams } from "./rollouts.type";

export const getRollouts = async (params: RolloutParams) => {
  const response = await api.get("/api/rollouts", { params });

  return response.data;
};
