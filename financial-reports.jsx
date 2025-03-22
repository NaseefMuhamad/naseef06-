


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { Pie, Line } from 'react-chartjs-2'; // Pie chart for income vs expenses, Line chart for trends
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; 
import { Link } from 'react-router-dom';  // Import Link component for routing
import { FaArrowLeft } from 'react-icons/fa';
import './financial-reports.css';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // For Pie chart
);

const FinancialReportsPage = () => {
  const [reportData, setReportData] = useState({
    income: 1500,
    expenses: 800,
    monthlyData: [200, 300, 250, 400, 500], // Dummy data for the last 5 months of spending
  });

  // Load report data from localStorage on component mount
  useEffect(() => {
    const storedReportData = JSON.parse(localStorage.getItem('financialReportData'));
    if (storedReportData) {
      setReportData(storedReportData);
    } else {
      // Fetch report data from API if it's not in localStorage
      axios.get('http://localhost:5000/api/financial-reports') // Replace with your actual API endpoint
        .then(response => {
          setReportData(response.data);
          localStorage.setItem('financialReportData', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error("Error fetching financial data:", error);
        });
    }
  }, []);

  // Save report data to localStorage whenever reportData changes
  useEffect(() => {
    localStorage.setItem('financialReportData', JSON.stringify(reportData));
  }, [reportData]);

  // Pie chart for Income vs Expenses
  const pieChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [reportData.income, reportData.expenses],
        backgroundColor: ['#4A90E2', '#FF6347'],
        hoverOffset: 4,
      },
    ],
  };

  // Line chart for monthly trends
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Expenses',
        data: reportData.monthlyData,
        borderColor: '#FF6347',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Income',
        data: reportData.monthlyData.map((val) => val + 500), // Just a random adjustment for demonstration
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(52, 182, 241, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="financial-reports-page">
      {/* Navigation Arrow to go back to Budget Page */}
      <div className="nav-arrows">
        <Link to="/budget" className="nav-arrow left">
          <FaArrowLeft size={20} />
          Back to Budget
        </Link>
      </div>

      <h1 className="page-title">Financial Reports</h1>

      {/* Income vs Expenses Pie Chart */}
      <div className="pie-chart-container">
        <h2 className="chart-title">Income vs Expenses</h2>
        <Pie data={pieChartData} />
      </div>

      {/* Monthly Financial Trends */}
      <div className="line-chart-container">
        <h2 className="chart-title">Monthly Financial Trends</h2>
        <Line data={lineChartData} />
      </div>

      {/* Financial Summary */}
      <div className="financial-summary">
        <h2>Financial Summary</h2>
        <div className="summary-card">
          <p><strong>Total Income:</strong> {reportData.income}</p>
          <p><strong>Total Expenses:</strong> {reportData.expenses}</p>
          <p><strong>Net Savings:</strong> {reportData.income - reportData.expenses}</p>
        </div>
      </div>

      {/* Budget Adherence */}
      <div className="budget-adherence">
        <h2>Budget Adherence</h2>
        <p>You are currently within budget! Keep up the great work!</p>
      </div>
    </div>
  );
};

export default FinancialReportsPage;
