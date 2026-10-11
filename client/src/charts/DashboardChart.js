import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart({ dashboard }) {

    const data = {
        labels: [
            "Doctors",
            "Patients",
            "Appointments",
            "Revenue"
        ],

        datasets: [
            {
                label: "Hospital Statistics",

                data: [
                    dashboard.totalDoctors,
                    dashboard.totalPatients,
                    dashboard.totalAppointments,
                    dashboard.totalRevenue
                ],

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545"
                ]
            }
        ]
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "top"
            },

            title: {
                display: true,
                text: "Hospital Management Dashboard"
            }
        }
    };

    return (
        <div className="mt-5">
            <Bar data={data} options={options} />
        </div>
    );
}

export default DashboardChart;