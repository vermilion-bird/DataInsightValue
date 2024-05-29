// Import the type for IConnectionData, make sure the path is correct
"use client"
import type { IConnectionData } from '@/api/connections';
import AddConnectionForm from "@/components/data_source/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DataSourceCard } from "@/components/data_source/datasourcecard";
import ConnectionsApi from '@/api/connections';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export default function DataBase() {
  const [dataSources, setDataSources] = useState<IConnectionData[]>([]); // Assuming IConnectionData is an array

  useEffect(() => {
    // Fetch data from API
    const fetchDataSources = async () => {
      try {
        const data = await ConnectionsApi.list();
        setDataSources(data); // Assuming ConnectionsApi.list() returns an array of IConnectionData
      } catch (error) {
        console.error('Error fetching data sources:', error);
        // Handle error state
      }
    };

    fetchDataSources();
  }, []);

  const onDelete = async (id: string) => {  // The id parameter is used to identify which data source to delete
    try {
      await ConnectionsApi.delete(id);
      setDataSources(dataSources.filter(dataSource => dataSource.id !== id)); // Update the state to remove the deleted data source
    } catch (error) {
      console.error('Error deleting data source:', error);
    }
  };
  return (

    <main className="p-6 md:p-24 w-full">
      <h1 className="pb-2 text-2xl w-full">数据源</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {dataSources.map((dataSource, index) => (
          <DataSourceCard
            key={index} // Assuming dataSource has a unique 'id' property
            title={dataSource.connectionName}
            subTitle={`${dataSource.username}@${dataSource.hostURL}:${dataSource.port}/${dataSource.database}`} // Dynamic subtitle based on dataSource
            imgSrc="./postgres.svg"
            imgAlt="Postgres"
            id = {dataSource.id}
            onDelete={() => onDelete(dataSource.id)} // Pass a function that calls onDelete with the dataSource's id
          />
        ))}

        {/* Add Connection Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between bg-neutral-100 hover:bg-neutral-200 hover:scale-105 transition-transform duration-300 p-4 rounded-lg">
              <img className="h-12 w-12 pl-3" src="./add.svg" alt="Add Connection" />
              <img className="h-12 w-12 pr-2" src="./postgres.svg" alt="Postgres" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full" align="center" side="bottom">
            <AddConnectionForm />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
