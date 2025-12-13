import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { monthlyData } from '../../data/mockData';
import { useEffect, useState } from 'react';
import apiRequest from '../../utils/ApiService';
import Cookies from 'js-cookie';

interface MonthlyTrendChartProps {
  darkMode?: boolean;
}

export function MonthlyTrendChart({ darkMode }: MonthlyTrendChartProps) {

  const [monthlyData, setMonthlyData] = useState([]);

  const userEmail = Cookies.get("userEmail")

  const getEmpDashboardDetails=async()=>{
    try {
      
      const res = await apiRequest({
        method: 'POST',
        url: '/spotlight/empDashboard',
        data: {email: userEmail}
      })
  
      console.log("res of emp dashboard---------->", res?.data)
      setMonthlyData(res?.data?.report?.monthlyData)
    } catch (error) {
      console.log("error of emp dashboard---------->", error)
    }
  }
  useEffect(()=>{
    getEmpDashboardDetails()
  },[])
  return (
    <div className={`${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border rounded-xl p-6 shadow-sm`}>
      <h3 className={`${darkMode ? 'text-white' : 'text-neutral-900'} mb-4`}>
        Monthly Recognition Trend
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: darkMode ? '#ffffff' : '#000000',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="recognitions"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            name="Achievements"
          />
          <Line
            type="monotone"
            dataKey="appreciations"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            name="Appreciations"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
