export default function AddConnectionForm() {
    return (
        <div className="max-w-md mx-auto mt-10">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectionName">
                        连接名
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="connectionName" type="text" placeholder="e.g., 业务库" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hostURL">
                        主机
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hostURL" type="text" placeholder="主机 IP 地址" />
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="port">
                            端口
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="port" type="text" placeholder="5432" />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="database">
                            数据库
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="database" type="text" placeholder="e.g., postgres" />
                    </div>
                </div>
                <div className="flex mb-6">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            用户名
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="postgres" />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            密码
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                    </div>
                </div>
                {/* <div className="mb-6">
                    <label className="flex items-center">
                        <input className="mr-2 leading-tight" type="checkbox" id="useSSL" />
                        <span className="text-sm">
                            Use SSL
                        </span>
                    </label>
                </div> */}
                <div className="flex items-center justify-around">
                    <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        取消
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        添 加
                    </button>
                    {/* <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        You have reached the maximum number of databases allowed on your current plan.
                    </p> */}
                </div>
            </form>
        </div>
    );
}
