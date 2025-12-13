import React, { useState, useEffect } from 'react';
import { Filter, Plus, Send, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FeedItem } from '../components/feed/FeedItem';
import Select from 'react-select';
import apiRequest from '../utils/ApiService';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import ToggleTabs from '../components/achievements/ToggleTabs';

interface Appreciation {
  id: string;
  message: string;
  from: string;
  date: string;
  status: 'pending' | 'approved';
  image_url?: string;
  receiver_names?: string[];
}

interface PeerAppreciationPageProps {
  darkMode: boolean;
  navigateTo: (page: string) => void;
}

export function PeerAppreciationPage({ darkMode }: PeerAppreciationPageProps) {

  const [tab, setTab] = useState<"received" | "sent">("received");

  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');
  const [showFormPage, setShowFormPage] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [sentAppreciations, setSentAppreciations] = useState<Appreciation[]>([]);
  const [receivedAppreciations, setReceivedAppreciations] = useState<Appreciation[]>([]);

  const email = Cookies.get("userEmail");

  // -------------------------------------------------------
  // FETCH SENT + RECEIVED APPRECIATIONS
  // -------------------------------------------------------
  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const response = await apiRequest({
          url: '/Peerappreciation/send/appreciation',
          method: 'POST',
          data: { email },
        });

        const sentData = response.data?.sent || [];
        const receivedData = response.data?.received || [];

        // FORMAT SENT DATA
        const sentFormatted: Appreciation[] = sentData.map((item: any) => ({
          id: item.id.toString(),
          message: item.message,
          from: item.sender_name,
          date: new Date(item.createdAt).toISOString(),
          status: item.status,
          image_url: item.image_url,
          receiver_names: item.receiver_names
        }));

        // FORMAT RECEIVED DATA
        const receivedFormatted: Appreciation[] = receivedData.map((item: any) => ({
          id: item.id.toString(),
          message: item.message,
          from: item.sender_name,
          date: new Date(item.createdAt).toISOString(),
          status: item.status,
          image_url: item.image_url,
          receiver_names: item.receiver_names
        }));

        setSentAppreciations(sentFormatted);
        setReceivedAppreciations(receivedFormatted);

      } catch (err) {
        console.error("Error fetching appreciations", err);
      }
    };

    fetchData();
  }, [email]);

  // -------------------------------------------------------
  // FETCH EMPLOYEES
  // -------------------------------------------------------
  useEffect(() => {
    if (!email) return;

    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await apiRequest({
          url: '/Peerappreciation/similaremployee',
          method: 'POST',
          data: { email }
        });

        const data = response.data?.data || [];
        setEmployeeOptions(
          data.map((emp: any) => ({
            value: emp.id,
            label: emp.name
          }))
        );
      } catch (err) {
        console.error("Error fetching employee list", err);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, [email]);

  // -------------------------------------------------------
  // SEND APPRECIATION
  // -------------------------------------------------------
  const handleSubmit = async () => {
    if (selectedEmployees.length === 0 || !message.trim()) return;

    const sender_email = email || "";
    const receiver_ids = selectedEmployees.map(e => e.value);
    const receiver_names = selectedEmployees.map(e => e.label);

    const payload = {
      sender_email,
      message,
      receiver_ids,
      receiver_names,
      image_url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
    };

    try {
      const response = await apiRequest({
        url: '/Peerappreciation/create',
        method: 'POST',
        data: payload
      });

      toast.success("Appreciation sent!");

      const newApp: Appreciation = {
        id: response.data?.id?.toString() || Date.now().toString(),
        message,
        from: "You",
        date: new Date().toISOString(),
        status: "pending",
        receiver_names,
        image_url: payload.image_url
      };

      setSentAppreciations(prev => [newApp, ...prev]);

      setSelectedEmployees([]);
      setMessage('');
      setShowFormPage(false);

    } catch (err) {
      toast.error("Failed to send appreciation");
      console.error(err);
    }
  };

  // -------------------------------------------------------
  // FORM PAGE
  // -------------------------------------------------------
  if (showFormPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFormPage(false)} className="p-2 rounded-lg hover:bg-neutral-100 transition">
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-neutral-900">Send Appreciation</h1>
        </div>

        <div className={`${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} border rounded-xl p-6`}>

          <label className="block text-sm mb-2 font-medium">Select Employees *</label>
          <Select
            isMulti
            options={employeeOptions}
            isLoading={loadingEmployees}
            value={selectedEmployees}
            placeholder="Select employees"
            onChange={(val) => setSelectedEmployees(val as any)}
          />

          <label className="block text-sm font-medium mt-6 mb-2">Message *</label>
          <textarea
            rows={4}
            className="w-full p-3 rounded-lg border bg-neutral-100"
            placeholder="Write your appreciation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex gap-2 items-center">
            <Send className="w-4 h-4" />
            Send
          </button>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // FILTER SENT LIST BY STATUS
  // -------------------------------------------------------
  const filteredSent = sentAppreciations.filter(app => app.status === filter);

  // -------------------------------------------------------
  // RECEIVED TAB (NO FILTER)
  // -------------------------------------------------------
  const receivedList = (
    <>
      <p className="text-neutral-600 mt-4">
        Showing {receivedAppreciations.length} received appreciation
      </p>

      <div className="space-y-4 mt-2">
        {receivedAppreciations.map(app => (
          <div key={app.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <FeedItem appreciation={app} />
          </div>
        ))}
      </div>
    </>
  );

  // -------------------------------------------------------
  // SENT TAB (WITH FILTER)
  // -------------------------------------------------------
  const sentList = (
    <>
      <div className="bg-white border border-neutral-200 rounded-xl p-4 mt-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-5 h-5 text-neutral-600" />
          <span className="text-neutral-700">Filter:</span>

          <div className="flex gap-2 flex-wrap">
            {['pending', 'approved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-1.5 rounded-lg text-sm ${filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
              >
                {status.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-neutral-600 mt-4">
        Showing {filteredSent.length} sent appreciation
      </p>

      <div className="space-y-4 mt-2">
        {filteredSent.map((app) => (
          <div key={app.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <FeedItem appreciation={app} />
          </div>
        ))}
      </div>
    </>
  );

  // -------------------------------------------------------
  // MAIN PAGE
  // -------------------------------------------------------
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-neutral-900">Peer Appreciation</h1>
          <p className="text-neutral-600">Manage all peer appreciation</p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowFormPage(true)}
        >
          New Appreciation
        </Button>
      </div>

      <ToggleTabs active={tab} onChange={setTab} />

      {tab === "received" ? receivedList : sentList}

    </div>
  );
}
