// API configuration for NEWS ROBO

const rawBaseUrl =
	import.meta.env.VITE_API_URL ||
	import.meta.env.VITE_API_BASE_URL ||
	"https://news-robo-api.onrender.com";
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const NEWS_API = `${API_BASE_URL}/news`;
