import { AxiosError } from 'axios';
import type { IApiResponse, ILoginData, ILoginPayload } from '../types';
import { apiClient } from './api';

export const AUTH_TOKEN_KEY = 'auth_token';

interface ErrorResponse {
	message?: string;
}

export const authService = {
	login: async (payload: ILoginPayload): Promise<ILoginData> => {
		try {
			const response = await apiClient.post<IApiResponse<ILoginData>>(
				'/v1/auth/login',
				payload
			);

			if (!response.data.success) {
				throw new Error(response.data.message || 'Login failed');
			}

			return response.data.data;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const message =
				axiosError.response?.data?.message ||
				axiosError.message ||
				'Login failed';
			throw new Error(message, { cause: error });
		}
	},
};
