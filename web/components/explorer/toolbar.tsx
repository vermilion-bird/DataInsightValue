import React, { useState } from 'react';
import { Sheet, PieChart, LineChart, Download, AreaChart, Code } from 'lucide-react';
import LabelCheckbox from '@/components/explorer/labelcheckbox';

const Toolbar = ({ onIconClick, dimensions, metrics, handleCheckboxChange, handleCheckboxMetricChange, selectedDimensions, selectedMetrics }: any) => {
  const [activeIcon, setActiveIcon] = useState('sheet');

  // Define a list of icons with their corresponding labels and components
  const icons = [
    { name: 'sheet', label: 'Sheet', component: <Sheet /> },
    { name: 'lineChart', label: 'Line Chart', component: <LineChart /> },
    { name: 'areaChart', label: 'Area Chart', component: <AreaChart /> },
    { name: 'pieChart', label: 'Pie Chart', component: <PieChart /> },
    // { name: 'code', label: 'Code', component: <Code /> },
    // { name: 'download', label: 'Download', component: <Download /> },
    // Add more buttons as needed
  ];

  const handleClick = (icon: string) => {
    // console.log(`${icon} clicked`);
    setActiveIcon(icon);
    onIconClick(icon);
  };

  return (
    <div className="flex flex-row items-center toolbar space-x-2 border rounded-full bg-slate-100 px-3 py-1 justify-center">
      {icons.map((icon) => (
        <div key={icon.name} onClick={() => handleClick(icon.name)} aria-label={icon.label}>
          {React.cloneElement(icon.component, {
            className: `w-6/8 h-4/8 ${activeIcon === icon.name ? 'bg-blue-500 text-white' : 'text-black'}`,
          })}
        </div>
      ))}
      <LabelCheckbox
        dimensions={dimensions}
        metrics={metrics}
        handleCheckboxChange={handleCheckboxChange}
        handleCheckboxMetricChange={handleCheckboxMetricChange}
        selectedDimensions={selectedDimensions}
        selectedMetrics={selectedMetrics}
      />
    </div>
  );
};

export default Toolbar;
