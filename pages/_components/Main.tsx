import { LogTable } from "@/pages/_components/LogTable";
import { FileInput } from "@/pages/_components/FileInput";

import React, { useState, useEffect, useCallback } from 'react';

type LogEntry = {
  fileName: string;
  executionTime: number;
};

export const Main: React.FC = () => {
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
