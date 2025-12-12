import { useState } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyData, departmentStats } from '../data/mockData';
import { Button } from '../components/ui/Button';

export function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-neutral-900">Admin Analytics Dashboard</h1>
          <p className="text-neutral-600 mt-1">
            Comprehensive insights and data visualization
          </p>
        </div>
        <Button
          variant="outline"
          icon={<Download className="w-5 h-5" />}
        >
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="text-neutral-700">Filters:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-neutral-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-900"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-900"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-neutral-600 mb-2">Total Recognitions</p>
          <p className="text-3xl text-neutral-900 mb-1">542</p>
          <p className="text-sm text-green-600">↑ 12% from last month</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-neutral-600 mb-2">Active Users</p>
          <p className="text-3xl text-neutral-900 mb-1">175</p>
          <p className="text-sm text-green-600">↑ 8% from last month</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-neutral-600 mb-2">Pending Approvals</p>
          <p className="text-3xl text-neutral-900 mb-1">23</p>
          <p className="text-sm text-orange-600">6 urgent</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-neutral-600 mb-2">Avg Response Time</p>
          <p className="text-3xl text-neutral-900 mb-1">2.3h</p>
          <p className="text-sm text-green-600">↓ 15% from last month</p>
        </div>
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

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h2 className="text-neutral-900 mb-6">Recognition by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="recognitions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h2 className="text-neutral-900 mb-6">Points Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ department, percent }) => `${department} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="points"
              >
                {departmentStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Contributors by Department */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-6">Department Performance</h2>
        <div className="space-y-4">
          {departmentStats.map((dept, index) => {
            const avgRecognitions = (dept.recognitions / dept.employees).toFixed(1);
            const progress = (dept.recognitions / Math.max(...departmentStats.map(d => d.recognitions))) * 100;
            
            return (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-neutral-900">{dept.department}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-600">
                      {dept.recognitions} recognitions
                    </span>
                    <span className="text-neutral-600">
                      {avgRecognitions} avg/employee
                    </span>
                    <span className="text-neutral-600">
                      {dept.employees} employees
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exportable Data Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-neutral-900">Raw Data Export</h2>
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="w-4 h-4" />}
          >
            Download CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Department
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Employees
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Recognitions
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Total Points
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Avg/Employee
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
