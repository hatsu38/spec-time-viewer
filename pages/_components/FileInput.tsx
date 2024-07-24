import React, { useCallback } from 'react';

type FileInputProps = {
  setLogEntries: (entries: LogEntry[]) => void;
};

type LogEntry = {
  fileName: string;
  executionTime: number;
};

const FileInput: React.FC<FileInputProps> = ({ setLogEntries }) => {
  const parseLogFile = (content: string): LogEntry[] => {
    const lines = content.trim().split('\n');
    return lines.map(line => {
      const [fileName, executionTime] = line.split(':');
      const executionTimeInSeconds = parseFloat(executionTime.trim());
      const time = isNaN(executionTimeInSeconds) ? -1 : executionTimeInSeconds;
      return {
        fileName: fileName.trim(),
        executionTime: time
      };
    }).filter(entry => entry.executionTime !== -1);
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string;
        const parsedEntries = parseLogFile(content);
        setLogEntries(parsedEntries);
      };
      reader.readAsText(file);
    }
  }, [setLogEntries]);


  return (
    <div className="mb-4">
    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
      ログファイルをアップロード
    </label>
    <input
      id="file-upload"
      type="file"
      accept=".log"
      onChange={handleFileUpload}
      className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
    />
  </div>
  );
}

export default FileInput;
