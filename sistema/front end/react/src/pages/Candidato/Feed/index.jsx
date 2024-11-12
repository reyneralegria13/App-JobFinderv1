import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import './JobsInterface.css';

const JobsInterface = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        {/* Profile Section */}
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Mais vagas para você</h2>
          </div>

          <div className="divide-y">
            {jobs.map(job => (
              <div key={job.id} className="p-4 hover:bg-gray-50">
                <div className="flex">
                  <img src={job.logo || 'default-logo-url.png'} alt={job.company} className="w-12 h-12 rounded" />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-blue-600 hover:underline cursor-pointer">
                        {job.title}
                      </h3>
                      <X className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                    <p className="text-gray-700">{job.company}</p>
                    <p className="text-gray-500 text-sm">
                      {job.location} {job.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Sugestões de pesquisas de vaga</h2>
            <X className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map(suggestion => (
                <button key={suggestion.id} onClick={() => toggleTag(suggestion.id)} className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTags.includes(suggestion.id) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Search className="w-3 h-3" />
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsInterface;
