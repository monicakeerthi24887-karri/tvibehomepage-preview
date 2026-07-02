"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({ children }) {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData?.session) {
        router.push("/login");
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from('vw_super_profiles')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single();

      if (!profileError && userProfile) {
        setProfile(userProfile);
      }
    }
    loadProfile();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans pb-16 md:pb-0">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative">
        <DashboardHeader profile={profile} />
        {children}
      </div>
    </div>
  );
}
