import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TOKEN_COOKIE = "user_token";
const USER_COOKIE = "user_data";
const COOKIE_OPTIONS = { expires: 7, sameSite: "strict", secure: true };

const readUserCookie = () => {
  try {
    const raw = Cookies.get(USER_COOKIE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistedToken = Cookies.get(TOKEN_COOKIE);
const persistedUser = readUserCookie();

// Use this in other user slices (applications, profile, etc.)
export const getUserAuthHeaders = () => {
  const token = Cookies.get(TOKEN_COOKIE);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const initialState = {
  // Session
  isAuthenticated: Boolean(persistedToken && persistedUser),
  user: persistedUser, // { ..., role_name: "Student" | "Employer" }
  token: persistedToken,

  // Login
  isLoading: false,
  error: null,

  // Register
  isRegistering: false,
  registerError: null,
  registerSuccess: false,

  // Roles dropdown
  roles: [], // [{ role_id, role_name }]
  isRolesLoading: false,
  rolesError: null,
};

// POST /auth/login  { email, password }
export const userLogin = createAsyncThunk(
  "userAuth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });

      const { success, token, data, message } = response.data;

      if (!success) return rejectWithValue({ message });

      // Admins sign in through their own page.
      if (data?.role_name === "Admin") {
        return rejectWithValue({
          message: "Admin accounts must sign in from the admin login page.",
        });
      }

      return { user: data, token, message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to sign in. Please try again." }
      );
    }
  },
);

// POST /auth/register  { full_name, email, password, role_id }
export const userRegister = createAsyncThunk(
  "userAuth/register",
  async ({ full_name, email, password, role_id, company_name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        full_name,
        email,
        password,
        role_id: Number(role_id),
        ...(company_name && { company_name }), // only sent for employers
      });

      const { success, message } = response.data;

      if (!success) return rejectWithValue({ message });

      return { message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to register. Please try again." }
      );
    }
  },
);

// GET /auth/roles  -> fills the role dropdown on the register form
export const fetchRoles = createAsyncThunk(
  "userAuth/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/roles`);

      const { success, message, data } = response.data;

      if (!success) return rejectWithValue({ message });

      return { data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to load roles." }
      );
    }
  },
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(USER_COOKIE);
    },
    resetLoginError: (state) => {
      state.error = null;
    },
    // Dispatch on unmount of the register form, and after showing the success message.
    resetRegisterState: (state) => {
      state.isRegistering = false;
      state.registerError = null;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set(TOKEN_COOKIE, action.payload.token, COOKIE_OPTIONS);
        Cookies.set(USER_COOKIE, JSON.stringify(action.payload.user), COOKIE_OPTIONS);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload?.message || "Login failed.";
        Cookies.remove(TOKEN_COOKIE);
        Cookies.remove(USER_COOKIE);
      })

      // Register
      .addCase(userRegister.pending, (state) => {
        state.isRegistering = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isRegistering = false;
        state.registerSuccess = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isRegistering = false;
        state.registerSuccess = false;
        state.registerError = action.payload?.message || "Registration failed.";
      })

      // Roles
      .addCase(fetchRoles.pending, (state) => {
        state.isRolesLoading = true;
        state.rolesError = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isRolesLoading = false;
        state.roles = action.payload.data;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isRolesLoading = false;
        state.rolesError = action.payload?.message || "Failed to load roles.";
      });
  },
});

export const { userLogout, resetLoginError, resetRegisterState } = userAuthSlice.actions;
export default userAuthSlice.reducer;

// A 401 on these means "wrong credentials", not "session expired", so don't redirect.
const AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/roles"];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";
    const isAuthRequest = AUTH_PATHS.some((path) => requestUrl.includes(path));
    const hadSession = Boolean(Cookies.get(TOKEN_COOKIE));

    // Admin pages are handled by the admin slice's interceptor.
    if (
      error.response?.status === 401 &&
      !window.location.pathname.startsWith("/admin") &&
      !isAuthRequest &&
      hadSession
    ) {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(USER_COOKIE);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);