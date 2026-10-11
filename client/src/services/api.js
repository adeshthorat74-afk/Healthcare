import axios from "axios";

// ======================================
// AXIOS API INSTANCE
// ======================================

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});


// ======================================
// TOKEN INTERCEPTOR
// ======================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ======================================
// AUTH APIs
// ======================================

// Register
export const register = (data) => {
    return api.post("/register", data);
};

// Login
export const login = (data) => {
    return api.post("/login", data);
};


// ======================================
// PROFILE APIs
// ======================================

// Get logged-in user profile
export const getProfile = () => {
    return api.get("/profile");
};

// Same profile API for compatibility
export const getUserProfile = () => {
    return api.get("/profile");
};

// Update profile
export const updateProfile = (data) => {
    return api.put("/profile", data);
};


// ======================================
// CHANGE PASSWORD API
// ======================================

export const changePassword = (data) => {
    return api.put("/change-password", data);
};


// ======================================
// DOCTOR APIs
// ======================================

// Get all doctors
export const getDoctors = () => {
    return api.get("/doctors");
};

// Get doctor by ID
export const getDoctor = (id) => {
    return api.get(`/doctors/${id}`);
};

// Add doctor
export const addDoctor = (data) => {
    return api.post("/doctors", data);
};

// Update doctor
export const updateDoctor = (id, data) => {
    return api.put(`/doctors/${id}`, data);
};

// Delete doctor
export const deleteDoctor = (id) => {
    return api.delete(`/doctors/${id}`);
};


// ======================================
// PATIENT APIs
// ======================================

// Get all patients
export const getPatients = () => {
    return api.get("/patients");
};

// Get patient by ID
export const getPatient = (id) => {
    return api.get(`/patients/${id}`);
};

// Add patient
export const addPatient = (data) => {
    return api.post("/patients", data);
};

// Update patient
export const updatePatient = (id, data) => {
    return api.put(`/patients/${id}`, data);
};

// Delete patient
export const deletePatient = (id) => {
    return api.delete(`/patients/${id}`);
};


// ======================================
// APPOINTMENT APIs
// ======================================

// Get all appointments
export const getAppointments = () => {
    return api.get("/appointments");
};

// Get appointment by ID
export const getAppointment = (id) => {
    return api.get(`/appointments/${id}`);
};

// Add appointment
export const addAppointment = (data) => {
    return api.post("/appointments", data);
};

// Update appointment
export const updateAppointment = (id, data) => {
    return api.put(`/appointments/${id}`, data);
};

// Delete appointment
export const deleteAppointment = (id) => {
    return api.delete(`/appointments/${id}`);
};


// ======================================
// BILL APIs
// ======================================

// Get all bills
export const getBills = () => {
    return api.get("/bills");
};

// Get bill by ID
export const getBill = (id) => {
    return api.get(`/bills/${id}`);
};

// Add bill
export const addBill = (data) => {
    return api.post("/bills", data);
};

// Update bill
export const updateBill = (id, data) => {
    return api.put(`/bills/${id}`, data);
};

// Delete bill
export const deleteBill = (id) => {
    return api.delete(`/bills/${id}`);
};


// ======================================
// DASHBOARD APIs
// ======================================

// Get dashboard data
export const getDashboard = () => {
    return api.get("/dashboard");
};


// ======================================
// SETTINGS APIs
// ======================================

// Get hospital settings
export const getSettings = () => {
    return api.get("/settings");
};

// Update hospital settings
export const updateSettings = (data) => {
    return api.put("/settings", data);
};


// ======================================
// ACTIVITY APIs
// ======================================

// Get all activity logs
export const getActivities = () => {
    return api.get("/activity");
};

// Add activity log
export const addActivity = (data) => {
    return api.post("/activity", data);
};

// Delete activity log
export const deleteActivity = (id) => {
    return api.delete(`/activity/${id}`);
};


// ======================================
// EXPORT AXIOS INSTANCE
// ======================================

export default api;