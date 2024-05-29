import Link from "next/link";

export default function Header() {
    interface Nav {
        title: string;
        name?: string;
        url: string;
        target?: string;
    }
    const navigations: Nav[] = [
        { name: "pricing", title: "数据探索", url: "/", target: "_self" },
        { name: "pricing", title: "数据源", url: "/datasource", target: "_self" },
        { name: "pricing", title: "关于", url: "/about", target: "_self" },

    ];
    return (<header>
        <div className="h-auto w-screen">
            <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
                <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8 xl:px-20">
                    <a href="/" className="text-xl font-medium flex items-center">
                        <img
                            src="/logo.jpg"
                            className="w-8 h-8 rounded-full mr-2"
                            alt="logo"
                        />
                        <span className="font-bold text-primary text-2xl">
                            Chat2Data
                        </span>
                    </a>

                    <div className="hidden md:flex ml-16">
                        {navigations.map((tab: Nav, idx: number) => (
                            <Link
                                className="text-md font-normal leading-6 text-gray-800 mx-4"
                                key={idx}
                                href={tab.url}
                                target={tab.target}
                            >
                                {tab.title}
                            </Link>
                        ))}
                    </div>

                    <div className="flex-1"></div>
                    <a href="#" className="absolute right-5 lg:hidden"></a>
                    <div className="mx-auto flex flex-row items-center">
                        <a
                            href="https://github.com/CodeDevNinja/ChatDataExpert"
                            target="_blank"
                            className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
                        >
                            <img src="/github.svg" />
                        </a></div>
                </div>
            </nav>
        </div>
    </header>);
}