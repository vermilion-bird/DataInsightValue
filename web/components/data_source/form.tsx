import React, { useState } from 'react';
import ConnectionsApi from '@/api/connections'; // Adjust the import path to where your ConnectionsApi file is located
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

export default function AddConnectionForm() {
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();


  const [connection, setConnection] = useState({
    connectionName: '',
    hostURL: '',
    port: 0,
    database: '',
    username: '',
    password: '',
    schema: ''
    // useSSL: false // Uncomment this if you want to use SSL
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setConnection({ ...connection, [name]: value });
  };

  const handleCreateConnection = async () => {
    try {
      const createdConnection = await ConnectionsApi.create(connection);
      console.log("Connection created successfully:", createdConnection);
      // Update UI here if needed
    } catch (error) {
      console.error("Error creating connection:", error);
      // Update UI with error here if needed
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleCreateConnection();
    setShowForm(false)
    router.refresh()

  };

  const handleCancel = () => {
    // setConnection({
    //   connectionName: '',
    //   hostURL: '',
    //   port: 0,
    //   database: '',
    //   username: '',
    //   password: '',
    //   schema: '',
    //   // useSSL: false // Uncomment this if you want to use SSL
    // });
    setShowForm(false)
  };

  return (
    <div className="mt-10">
      {showForm && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* Connection Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectionName">
              连接名
            </label>
            <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="connectionName"
              type="text"
              placeholder="e.g., 业务库"
              name="connectionName"
              value={connection.connectionName}
              onChange={handleInputChange}
            />
          </div>

          {/* Host URL */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hostURL">
              主机
            </label>
            <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hostURL"
              type="text"
              placeholder="主机 IP 地址"
              name="hostURL"
              value={connection.hostURL}
              onChange={handleInputChange}
            />
          </div>

          {/* Port and Database */}
          <div className="flex mb-4">
            {/* Port */}
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="port">
                端口
              </label>
              <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="port"
                type="text"
                placeholder="5432"
                name="port"
                value={connection.port}
                onChange={handleInputChange}
              />
            </div>
            {/* Database */}
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="database">
                数据库
              </label>
              <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="database"
                type="text"
                placeholder="e.g., postgres"
                name="database"
                value={connection.database}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Username and Password */}
          <div className="flex mb-6">
            {/* Username */}
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                用户名
              </label>
              <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="postgres"
                name="username"
                value={connection.username}
                onChange={handleInputChange}
              />
            </div>
            {/* Password */}
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                密码
              </label>
              <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={connection.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* SSL Checkbox 
        <div className="mb-6">
          <label className="flex items-center">
            <Input className="mr-2 leading-tight" 
                   type="checkbox" 
                   id="useSSL" 
                   name="useSSL"
                   checked={connection.useSSL}
                   onChange={handleInputChange} />
            <span className="text-sm">
              Use SSL
            </span>
          </label>
        </div>
        */}

          {/* Buttons */}
          <div className="flex items-center justify-around">
            <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCancel}>
              取消
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              添加
            </button>
          </div>
        </form>)}
    </div>
  );
}
