import React, { useState, useMemo } from 'react';

type LogEntry = {
  fileName: string;
  executionTime: number;
};

type SortKey = 'fileName' | 'executionTime';

type PropsType = {
  logEntries: LogEntry[];
  setLogEntries: (entries: LogEntry[]) => void;
};

export const LogTable: React.FC<PropsType> = ({ logEntries, setLogEntries }: PropsType) => {
  const [sortKey, setSortKey] = useState<SortKey>('executionTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isRegex, setIsRegex] = useState<boolean>(false);
  const [regexError, setRegexError] = useState<string | null>(null);

  const sortEntries = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }

    const sortedEntries = [...logEntries].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setLogEntries(sortedEntries);
  };

  const filteredEntries = useMemo(() => {
    if (!searchTerm) return logEntries;
    
    let searchRegex: RegExp;
    if (isRegex) {
      try {
        searchRegex = new RegExp(searchTerm, 'i');
        setRegexError(null);
      } catch (error) {
        setRegexError('無効な正規表現です');
        return logEntries;
      }
    } else {
      searchRegex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }

    return logEntries.filter(entry => searchRegex.test(entry.fileName));
  }, [logEntries, searchTerm, isRegex]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={isRegex ? "正規表現で検索..." : "ファイル名で検索..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-gray-700 flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRegex}
              onChange={() => setIsRegex(!isRegex)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-sm text-gray-700">正規表現を使用</span>
          </label>
        </div>
        {regexError && <p className="text-red-500 text-sm mt-1">{regexError}</p>}
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-2/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => sortEntries('fileName')}
              >
                ファイル名
                <span className={`ml-1 ${sortKey === 'fileName' ? "text-blue-500" : ""}`}>
                  {sortOrder === 'asc' ? "▲" : "▼"}
                </span>
              </button>
            </th>
            <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => sortEntries('executionTime')}
              >
                実行時間 (秒)
                <span className={`ml-1 ${sortKey === 'executionTime' ? "text-blue-500" : ""}`}>
                  {sortOrder === 'asc' ? "▲" : "▼"}
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEntries.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {entry.fileName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.executionTime.toFixed(10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredEntries.length === 0 && (
        <p className="text-center text-gray-500 mt-4">該当するエントリがありません。</p>
      )}
    </div>
  );
};
