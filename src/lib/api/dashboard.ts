import api from "./index";
import serverApi from "./serverApi";
import {
  ApiResponse,
  BasicStatistics,
  FormTrendData,
  FormAttemptStatsResponse,
} from "../types/dashboard";

export const dashboardServerApi = {
  getBasicStatistics: async (): Promise<BasicStatistics> => {
    const response =
      await serverApi.get<ApiResponse<BasicStatistics>>("/dashboard");
    return response.data.data;
  },

  getFormCreationTrends: async (months = 12): Promise<FormTrendData[]> => {
    const response = await serverApi.get<ApiResponse<FormTrendData[]>>(
      `/dashboard/form-creation-trends?months=${months}`
    );
    return response.data.data;
  },

  getFormAttemptStats: async (): Promise<FormAttemptStatsResponse> => {
    const response = await serverApi.get<ApiResponse<FormAttemptStatsResponse>>(
      "/dashboard/form-attempt-stats"
    );
    return response.data.data;
  },
};

export const dashboardClientApi = {
  getBasicStatistics: async (): Promise<BasicStatistics> => {
    const response = await api.get<ApiResponse<BasicStatistics>>("/dashboard");
    return response.data.data;
  },

  getFormCreationTrends: async (months = 12): Promise<FormTrendData[]> => {
    const response = await api.get<ApiResponse<FormTrendData[]>>(
      `/dashboard/form-creation-trends?months=${months}`
    );
    return response.data.data;
  },

  getFormAttemptStats: async (): Promise<FormAttemptStatsResponse> => {
    const response = await api.get<ApiResponse<FormAttemptStatsResponse>>(
      "/dashboard/form-attempt-stats"
    );
    return response.data.data;
  },
};

export { dashboardServerApi as serverApi, dashboardClientApi as clientApi };
export default dashboardClientApi;
