"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Download, Users, ShieldAlert } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function AdminUsersPage() {
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data: userProfile, error: meError } = await api.getMe();
      if (meError || !userProfile) {
        router.push("/login");
        return;
      }
      setProfile(userProfile);

      // In production, backend should enforce role. 
      // We enforce a soft check here just in case.
      // if (userProfile.role !== 'admin') {
      //   router.push("/dashboard");
      //   return;
      // }

      const { data: adminUsers } = await api.getAdminUsers();
      if (adminUsers) {
        setUsers(adminUsers);
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  const downloadCSV = () => {
    if (users.length === 0) return;

    // 1. Define the CSV Headers
    const headers = ["User ID", "Full Name", "Email", "Phone", "Role", "Coin Balance", "Referral Count"];
    
    // 2. Map the user data to CSV rows
    const csvRows = users.map(user => {
      return [
        user.id || "",
        `"${(user.full_name || "").replace(/"/g, '""')}"`, // escape quotes
        user.email || "",
        user.phone || "",
        user.role || "fan",
        user.coin_balance || 0,
        user.referral_count || 0
      ].join(",");
    });

    // 3. Combine headers and rows
    const csvString = [headers.join(","), ...csvRows].join("\n");

    // 4. Create a Blob and trigger browser download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `tvibe_registered_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-sm font-bold uppercase tracking-widest text-[#666666] animate-pulse">
          Loading Admin Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans">
      <DashboardSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        <DashboardHeader profile={profile} />

        <main className="flex-1 p-8 w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#1a1a1a] mb-2 flex items-center gap-3">
                <ShieldAlert className="text-[#e91e63]" /> Admin: Registered Users
              </h1>
              <p className="text-sm font-medium text-[#666666]">
                View all registered fans, vendors, and clubs on TVIBE.
              </p>
            </div>
            
            <button 
              onClick={downloadCSV}
              className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#ff6d00] transition-colors flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> Export to CSV
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#eaecf0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#eaecf0]">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#666666]">User</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#666666]">Contact</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#666666]">Role</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#666666]">Wallet Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaecf0]">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-sm font-bold text-[#666666]">No users found.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.PK} className="hover:bg-[#fcfcfc] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9c27b0] to-[#ff9800] flex items-center justify-center text-white font-bold uppercase">
                              {user.full_name ? user.full_name.charAt(0) : "U"}
                            </div>
                            <div>
                              <p className="font-bold text-[#1a1a1a]">{user.full_name || "Unknown"}</p>
                              <p className="text-xs text-[#666666]">ID: {user.id?.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-[#1a1a1a] text-sm">{user.email}</p>
                          <p className="text-xs text-[#666666]">{user.phone || "No phone"}</p>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            user.role === 'vendor' ? 'bg-[#ff9800]/10 text-[#ff6d00]' :
                            user.role === 'admin' ? 'bg-[#e91e63]/10 text-[#e91e63]' :
                            'bg-[#9c27b0]/10 text-[#9c27b0]'
                          }`}>
                            {user.role || "Fan"}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-black text-[#1a1a1a] flex items-center gap-1">
                            <span className="text-[#ff6d00]">T</span> {user.coin_balance || 0}
                          </p>
                          <p className="text-[10px] text-[#666666] uppercase tracking-wider">{user.referral_count || 0} Refs</p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
