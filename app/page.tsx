"use client";

import { useState } from "react";

export default function Home() {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [addresses, setAddresses] = useState({ home: "", work: "" });
  const [workDays, setWorkDays] = useState<boolean[]>(Array(7).fill(false));
  const [results, setResults] = useState<string | null>(null);

  const handleCsvUpload = (data: string) => {
    setCsvData(data);
  };

  const handleAddressSubmit = (home: string, work: string) => {
    setAddresses({ home, work });
  };

  const handleWorkScheduleChange = (days: boolean[]) => {
    setWorkDays(days);
  };

  const processData = async () => {
    if (!csvData || !addresses.home || !addresses.work) {
      alert("Please upload a CSV file and enter both addresses.");
      return;
    }

    const response = await fetch("/api/process-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csvData, addresses, workDays }),
    });

    if (response.ok) {
      const result = await response.text();
      setResults(result);
    } else {
      alert("Error processing data. Please try again.");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NSW Tolls Splitter</h1>

      <button
        onClick={processData}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Process Data
      </button>
    </main>
  );
}
