import LogTable from "@/components/LogTable";
import FileInput from "@/components/FileInput";

import React, { useState } from 'react';

type LogEntry = {
  fileName: string;
  executionTime: number;
};

const Main: React.FC = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  return (
    <div className="container mx-auto p-4">
      <FileInput setLogEntries={setLogEntries} />
      {logEntries.length > 0 && (
        <LogTable setLogEntries={setLogEntries} logEntries={logEntries} />
      )}
    </div>
  );
};

export default Main;
