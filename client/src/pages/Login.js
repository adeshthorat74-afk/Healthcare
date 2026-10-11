import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email: email.trim(),
                    password: password
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            // ======================================
            // CHECK TOKEN
            // ======================================

            if (!response.data.token) {

                alert("Token was not received from server");

                return;
            }

            // ======================================
            // CLEAR OLD AUTH DATA
            // ======================================

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");

            // ======================================
            // SAVE NEW JWT TOKEN
            // ======================================

            localStorage.setItem(
                "token",
                response.data.token
            );

            // ======================================
            // SAVE USER
            // ======================================

            if (response.data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                localStorage.setItem(
                    "role",
                    response.data.user.role
                );

            }

            // ======================================
            // CHECK TOKEN IN BROWSER
            // ======================================

            console.log(
                "Saved Token:",
                localStorage.getItem("token")
            );

            console.log(
                "Saved User:",
                localStorage.getItem("user")
            );

            alert(
                response.data.message ||
                "Login Successful"
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={styles.container}>

            <form
                style={styles.form}
                onSubmit={handleLogin}
            >

                <h2 style={styles.heading}>
                    🏥 Hospital Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >

                    {loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>

            </form>

        </div>

    );

}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f9"
    },

    form: {
        width: "380px",
        padding: "35px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    },

    heading: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#0d6efd"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "15px",
        boxSizing: "border-box"
    },

    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#0d6efd",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer"
    }

};

export default Login;