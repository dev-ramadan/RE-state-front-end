import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Agent {
  id: string;
  name: string;
  data:{
    properties:any
  }
}

export const useAgent = () => {
  const { user } = useAuth();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchAgent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://re-estate.runasp.net/api/Agent/${user.userId}`);
        if (!res.ok) throw new Error("Failed to fetch agent");
        const data: Agent = await res.json();
        setAgent(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [user?.userId]);

  return { agent, loading, error };
};
