import { useState, useEffect } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyData, departmentStats } from '../data/mockData';
import { Button } from '../components/ui/Button';
import LeaderboardWidget from './LeaderboardWidget';
import apiRequest from '../utils/ApiService';

interface AdminDashboardPage {
  darkMode: boolean;
}
export function AdminDashboardPage({ darkMode }: AdminDashboardPage) {
  const [summary, setSummary] = useState({
    total_employees: 0,
    total_recognitions: 0,
    total_pending_approvals: 0
  });
  const [employees, setEmployees] = useState([]);
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // const fetchEmployeePerformance = async () => {
  //   try {
  //     const res = await apiRequest({
  //       method: "POST",
  //       url: "/admin/employee-performance"   // <— Use your real API path
  //     });

  //     setSummary(res.data.summary);
  //     setEmployees(res.data.data);
  //   } catch (error) {
  //     console.log("API Error", error);
  //   }
  // };



  const stats = [
    {
      title: 'Total Recognitions',
      value: '542',
      subText: '↑ 12% from last month',
      subTextColor: 'text-green-600',
    },
    {
      title: 'Active Users',
      value: '175',
      subText: '↑ 8% from last month',
      subTextColor: 'text-green-600',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      subText: '6 urgent',
      subTextColor: 'text-orange-600',
    },
    {
      title: 'Avg Response Time',
      value: '2.3h',
      subText: '↓ 15% from last month',
      subTextColor: 'text-green-600',
    }
  ]

  const topContributors = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      recognitions: 32,
    },
    {
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      recognitions: 28,
    },
    {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      recognitions: 25,
    },
    {
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      recognitions: 28,
    },
  ];

  const getEmployeePerformance = async () => {
    try {
      const response = await apiRequest()
    } catch (error: any) {

    }
  }

  useEffect(() => {
    getEmployeePerformance();
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`${darkMode ? 'text-white text-3xl ' : 'text-neutral-900 text-3xl'}`}>Admin Dashboard</h1>
          <p className={`text-neutral-600 mt-1`}>
            Comprehensive insights and data visualization
          </p>
        </div>

      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-neutral-200 rounded-xl p-6"
          >
            <p className="text-neutral-600 mb-2">{item.title}</p>
            <p className="text-3xl text-neutral-900 mb-1">{item.value}</p>
            <p className={`text-sm ${item.subTextColor}`}>{item.subText}</p>
          </div>
        ))}
      </div>

      <div>
        <LeaderboardWidget contributors={topContributors} darkMode={darkMode} />
      </div>


      {/* Monthly Trend Chart */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-6">Recognition Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="recognitions"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              name="Achievements"
            />
            <Line
              type="monotone"
              dataKey="appreciations"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              name="Appreciations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* Exportable Data Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-neutral-900">Employee History</h2>

        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Employees
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Appreciation
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Achievements
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Total Points
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Current Points
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {departmentStats.map((dept) => (
                <tr key={dept.department} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900">{dept.department}</td>
                  <td className="px-6 py-4 text-neutral-600">{dept.employees}</td>
                  <td className="px-6 py-4 text-neutral-600">{dept.recognitions}</td>
                  <td className="px-6 py-4 text-neutral-600">{dept.points}</td>
                  <td className="px-6 py-4 text-neutral-600">
                    {(dept.recognitions / dept.employees).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
