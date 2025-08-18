import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	AxiosError,
	AxiosHeaders,
} from "axios";
import { history } from "./history";
import { showAlert } from "./alertService";

// Define API response structure
interface ApiResponse<T = any> {
	success: boolean;
	status_code: number;
	message: string;
	data: T;
	meta: any;
	error: any;
}

// Auth tokens structure
interface AuthTokens {
	access_token: string;
	refresh_token: string;
	token_type: string;
	session_id: string;
}

// User data structure
interface UserData {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
}

const BASE_URL = "https://thick-iris-muzaffar-shaikh-8d65adb0.koyeb.app";

class ApiService {
	private instance: AxiosInstance;
	private isRefreshing = false;
	private failedRequests: ((token: string) => void)[] = [];

	constructor() {
		this.instance = axios.create({
			baseURL: BASE_URL,
			headers: { "Content-Type": "application/json" },
		});

		// Add request interceptor
		this.instance.interceptors.request.use(this.handleRequest);

		// Add response interceptor
		this.instance.interceptors.response.use(
			(response) => response,
			this.handleResponseError
		);
	}

	private handleRequest = (
		config: AxiosRequestConfig
	): InternalAxiosRequestConfig<any> => {
		const tokens = this.getTokens();
		if (tokens?.access_token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${tokens.access_token}`,
			};
		}
		return config as InternalAxiosRequestConfig<any>;
	};

	private handleResponseError = async (error: AxiosError) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		// Handle token refresh
		if (
			status === 401 &&
			originalRequest &&
			!originalRequest.url?.includes("auth/refresh")
		) {
			if (!this.isRefreshing) {
				this.isRefreshing = true;
				try {
					const newTokens = await this.refreshToken();
					this.storeTokens(newTokens);
					this.retryFailedRequests(newTokens.access_token);
					return this.instance(originalRequest);
				} catch (refreshError) {
					this.clearAuthData();
					showAlert(
						"Session Expired",
						"error",
						"Please log in again"
					);
					history.push("/login");
					return Promise.reject(refreshError);
				} finally {
					this.isRefreshing = false;
				}
			}

			return new Promise((resolve) => {
				this.failedRequests.push((token: string) => {
					const headers = new AxiosHeaders(originalRequest.headers);
					headers.set("Authorization", `Bearer ${token}`);
					originalRequest.headers = headers;
					resolve(this.instance(originalRequest));
				});
			});
		}

		// Handle other errors
		if (status && status >= 400) {
			const response = error.response?.data as ApiResponse;
			const message = response?.message || "An error occurred";
			const alertType = status >= 500 ? "error" : "warning";
			showAlert(`Error ${status}`, alertType, message);
		}

		return Promise.reject(error);
	};

	private retryFailedRequests = (token: string) => {
		this.failedRequests.forEach((callback) => callback(token));
		this.failedRequests = [];
	};

	// Auth token management
	public getTokens(): AuthTokens | null {
		const tokens = sessionStorage.getItem("auth_tokens");
		return tokens ? JSON.parse(tokens) : null;
	}

	private storeTokens(tokens: AuthTokens): void {
		sessionStorage.setItem("auth_tokens", JSON.stringify(tokens));
	}

	private clearAuthData(): void {
		sessionStorage.removeItem("auth_tokens");
		localStorage.removeItem("userData");
	}

	// API methods
	public async refreshToken(): Promise<AuthTokens> {
		const tokens = this.getTokens();
		if (!tokens?.refresh_token)
			throw new Error("No refresh token available");

		const response = await axios.post<ApiResponse<AuthTokens>>(
			`${BASE_URL}/auth/refresh`,
			{ refresh_token: tokens.refresh_token },
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);

		if (!response.data.success || !response.data.data) {
			throw new Error("Token refresh failed");
		}

		return response.data.data;
	}

	public async login(
		credentials: any
	): Promise<{ tokens: AuthTokens; user: UserData }> {
		const response = await axios.post<ApiResponse>(
			`${BASE_URL}/auth/login`,
			credentials,
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		);

		if (
			!response.data.success ||
			!response.data.data ||
			!response.data.meta?.user
		) {
			throw new Error(response.data.message || "Login failed");
		}

		const tokens = response.data.data as AuthTokens;
		const user = response.data.meta.user as UserData;

		this.storeTokens(tokens);
		localStorage.setItem("userData", JSON.stringify(user));

		return { tokens, user };
	}

	public logout(): void {
		this.clearAuthData();
		history.push("/login");
	}

	public async initializeAuth(): Promise<boolean> {
		const tokens = this.getTokens();

		if (tokens?.refresh_token) {
			try {
				const newTokens = await this.refreshToken();
				this.storeTokens(newTokens);
				return true;
			} catch (error) {
				this.clearAuthData();
			}
		}
		return false;
	}

	// Generic API call method
	public async request<T = any>(
		config: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await this.instance(
				config
			);
			return response.data;
		} catch (error) {
			return this.handleApiError(error);
		}
	}

	private handleApiError(error: any): ApiResponse {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				status_code: error.response?.status || 500,
				message: error.response?.data?.message || "Network error",
				data: null,
				meta: null,
				error: error.response?.data?.error || error.message,
			};
		}
		return {
			success: false,
			status_code: 500,
			message: "Unknown error",
			data: null,
			meta: null,
			error: String(error),
		};
	}
}

export const apiService = new ApiService();
