import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Using corsproxy to bypass CORS on the private API
const PROXY_URL = "https://corsproxy.io/?";
const API_BASE = "https://api.getbring.com/rest/v2";

export function useBring() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Auth state from localStorage
    const [credentials, setCredentials] = useState(() => {
        const saved = localStorage.getItem('bring_credentials');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const url = `${PROXY_URL}${API_BASE}/bringauth`;
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Bring-Client': 'android' // Trying android client
                }
            });

            const { uuid, publicUuid, access_token, refresh_token } = response.data;

            const creds = { uuid, publicUuid, accessToken: access_token, refreshToken: refresh_token };
            localStorage.setItem('bring_credentials', JSON.stringify(creds));
            setCredentials(creds);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Bring Login Failed", err);
            setError("Login failed. Check credentials.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('bring_credentials');
        setCredentials(null);
        setIsAuthenticated(false);
        setItems([]);
    };

    // Helper to refresh token
    const refreshAccessToken = async () => {
        if (!credentials?.refreshToken) throw new Error("No refresh token");

        console.log("Refreshing access token...");
        try {
            const url = `${PROXY_URL}${API_BASE}/bringauth/token`;
            const formData = new URLSearchParams();
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', credentials.refreshToken);

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Bring-Client': 'android'
                }
            });

            const { access_token, refresh_token } = response.data;

            // Update creds with new tokens
            const newCreds = {
                ...credentials,
                accessToken: access_token,
                refreshToken: refresh_token || credentials.refreshToken
            };

            console.log("Token refresh successful");
            localStorage.setItem('bring_credentials', JSON.stringify(newCreds));
            setCredentials(newCreds);
            return newCreds.accessToken;
        } catch (err) {
            console.error("Token refresh failed", err);
            throw err;
        }
    };

    const fetchItems = useCallback(async () => {
        if (!credentials) return;

        // Internal helper to make requests with retry logic
        const makeRequest = async (token) => {
            // First get lists to find the default one
            const listsUrl = `${PROXY_URL}${API_BASE}/bringusers/${credentials.uuid}/lists`;
            const listsRes = await axios.get(listsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Bring-Client': 'android'
                }
            });

            const listUuid = listsRes.data.lists[0].listUuid;

            const itemsUrl = `${PROXY_URL}${API_BASE}/bringlists/${listUuid}`;
            const itemsRes = await axios.get(itemsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Bring-Client': 'android'
                }
            });
            return itemsRes.data.purchase;
        };

        try {
            const data = await makeRequest(credentials.accessToken);
            setItems(data);
            setError(null);
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                console.log("Token expired or forbidden, attempting refresh...");
                try {
                    const newToken = await refreshAccessToken();
                    // Wait a bit before retrying to ensure state propagation? 
                    // No, using the returned token directly.
                    const data = await makeRequest(newToken);
                    setItems(data);
                    setError(null);
                } catch (refreshErr) {
                    console.error("Refresh failed, logging out", refreshErr);
                    logout();
                    setError("Session expired. Please login again.");
                }
            } else {
                console.error("Fetch Items Failed", err);
            }
        }
    }, [credentials]);

    useEffect(() => {
        if (credentials) {
            setIsAuthenticated(true);
            fetchItems();
            const interval = setInterval(fetchItems, 60 * 1000); // Poll every minute
            return () => clearInterval(interval);
        }
    }, [credentials, fetchItems]);

    return {
        isAuthenticated,
        login,
        logout,
        items,
        loading,
        error
    };
}
