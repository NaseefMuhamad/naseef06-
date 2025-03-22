import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaUtensils, FaShoppingCart, FaGasPump, FaHome, FaSchool, FaBeer, FaRegQuestionCircle } from 'react-icons/fa';
import './budget.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BudgetPage = () => {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [currency, setCurrency] = useState('');
  const [timeFrame, setTimeFrame] = useState('daily');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Budget Spendings',
        data: [],
        borderColor: 'rgba(52, 182, 241, 1)',
        backgroundColor: 'rgba(52, 182, 241, 0.2)',
        tension: 0.1,
      },
    ],
  });

  // Fetch budget entries when the component mounts
  useEffect(() => {
    const fetchBudgetEntries = async () => {
      try {
        const userId = localStorage.getItem('userId'); // assuming userId is stored upon sign in
        const response = await axios.get(`http://localhost:5000/api/budget/${userId}`);
        setBudgetEntries(response.data);
      } catch (error) {
        console.error('Error fetching budget entries:', error);
      }
    };

    fetchBudgetEntries();
  }, []);

  const handleAddBudget = async () => {
    const newEntry = {
      userId: localStorage.getItem('userId'),
      category,
      amount: parseFloat(amount),
      currency,
      timeFrame,
    };

    try {
      const response = await axios.post('/api/budget', newEntry);
      const savedEntry = response.data;

      // Update budget entries state with newly added entry
      setBudgetEntries(prevEntries => [...prevEntries, savedEntry]);

      // Update chart data
      const newChartData = {
        ...chartData,
        labels: [...chartData.labels, new Date().toLocaleDateString()],
        datasets: [
          {
            ...chartData.datasets[0],
            data: [...chartData.datasets[0].data, parseFloat(amount)],
          },
        ],
      };
      setChartData(newChartData);

      // Clear form fields
      setAmount('');
      setCategory('');
      setCurrency('');
    } catch (error) {
      console.error('Error adding budget entry:', error);
    }
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const filteredEntries = budgetEntries.filter(entry => entry.timeFrame === timeFrame);
  const totalBudget = filteredEntries.reduce((total, entry) => total + entry.amount, 0);

  return (
    <div className="budget-page">
      <div className="nav-arrow">
        <Link to="/financial-reports">
          <FaArrowRight size={30} className="arrow-icon" />
          Next: Financial Reports
        </Link>
      </div>

      <h1 className="page-title">Track Your Budget</h1>

      {/* Time Frame Selection */}
      <div className="time-frame-section">
        <button onClick={() => handleTimeFrameChange('daily')} className={`time-frame-btn ${timeFrame === 'daily' ? 'active' : ''}`}>Daily</button>
        <button onClick={() => handleTimeFrameChange('weekly')} className={`time-frame-btn ${timeFrame === 'weekly' ? 'active' : ''}`}>Weekly</button>
        <button onClick={() => handleTimeFrameChange('monthly')} className={`time-frame-btn ${timeFrame === 'monthly' ? 'active' : ''}`}>Monthly</button>
        <button onClick={() => handleTimeFrameChange('term')} className={`time-frame-btn ${timeFrame === 'term' ? 'active' : ''}`}>Term</button>
      </div>
      
            {/* Budget Category Entry */}
            <div className="category-section">
        <h3 className="category-text">Where do you want to spend?</h3>
        <div className="category-options">
          <button className={`category-option ${category === 'Groceries' ? 'active' : ''}`} onClick={() => setCategory('Groceries')}>
            <FaShoppingCart size={50} color="#FF5733" /> Groceries
          </button>
          <button className={`category-option ${category === 'Gas' ? 'active' : ''}`} onClick={() => setCategory('Gas')}>
            <FaGasPump size={50} color="#34b7f1" /> Gas
          </button>
          <button className={`category-option ${category === 'Fuel' ? 'active' : ''}`} onClick={() => setCategory('Fuel')}>
            <FaGasPump size={50} color="#FF9800" /> Fuel
          </button>
          <button className={`category-option ${category === 'Transport' ? 'active' : ''}`} onClick={() => setCategory('Transport')}>
            <FaShoppingCart size={50} color="#00c853" /> Transport
          </button>
          <button className={`category-option ${category === 'Food' ? 'active' : ''}`} onClick={() => setCategory('Food')}>
            <FaUtensils size={50} color="#FF6347" /> Food
          </button>
          <button className={`category-option ${category === 'Entertainment' ? 'active' : ''}`} onClick={() => setCategory('Entertainment')}>
            <FaBeer size={50} color="#F44336" /> Entertainment
          </button>
          <button className={`category-option ${category === 'Accommodation' ? 'active' : ''}`} onClick={() => setCategory('Accommodation')}>
            <FaHome size={50} color="#FF4081" /> Accommodation
          </button>
          <button className={`category-option ${category === 'Fees' ? 'active' : ''}`} onClick={() => setCategory('Fees')}>
            <FaSchool size={50} color="#8E24AA" /> Fees
          </button>
          <button className={`category-option ${category === 'Upkeep' ? 'active' : ''}`} onClick={() => setCategory('Upkeep')}>
            <FaMoneyBillWave size={50} color="#009688" /> Upkeep
          </button>
          <button className={`category-option ${category === 'Drinks' ? 'active' : ''}`} onClick={() => setCategory('Drinks')}>
            <FaBeer size={50} color="#FFC107" /> Drinks
          </button>
          <button className={`category-option ${category === 'Other' ? 'active' : ''}`} onClick={() => setCategory('Other')}>
            <FaRegQuestionCircle size={50} color="#795548" /> Other
          </button>
        </div>
      </div>



      {/* Input Form for Budget Entry */}
      <div className="form-section">
        <div className="amount-container">
          <input className="input-field" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          <input className="currency-input" type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="Currency" />
        </div>
        <button className="add-budget-btn" onClick={handleAddBudget}>Add Budget</button>
      </div>

      {/* Budget Entries Table */}
      <div className="table-container">
        <h2>Budget Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Time Frame</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr><td colSpan="4">No budget entries yet.</td></tr>
            ) : (
              filteredEntries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.category}</td>
                  <td>{entry.currency}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.timeFrame}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Progress Bar for Budget */}
      <div className="progress-section">
        <h3>Progress of Your Budget</h3>
        <div className="progress-bar-container">
          <progress value={totalBudget} max={10000} className="progress-bar" /> 
          <span>{((totalBudget / 10000) * 100).toFixed(2)}%</span>
        </div>
      </div>

      {/* Line Chart for Budget Visualization */}
      <div className="chart-section">
        <h3>Budget Trends</h3>
        <Line data={chartData} />
      </div>

      {/* Navigation Arrow Back to Budget */}
      <div className="nav-arrow">
        <Link to="/Expensestracking">
          <FaArrowLeft size={30} className="arrow-icon" />
          Back to Expensestracking
        </Link>
      </div>
    </div>
  );
};

export default BudgetPage;
