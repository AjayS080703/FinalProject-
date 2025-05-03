import React from 'react';

const FilterSection = ({ filters, onChange }) => (
  <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 justify-center">
    {filters.map(({ name, options }) => (
      <div key={name} className="flex flex-col">
        <label className="font-medium text-gray-700">{name}</label>
        <select
          className="border rounded-md px-2 py-1"
          name={name.toLowerCase()}
          onChange={onChange}
        >
          <option value="">All</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    ))}
  </div>
);

export default FilterSection;