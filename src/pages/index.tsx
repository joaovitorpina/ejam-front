import { HeroInterface } from "@/interfaces/hero.interface";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getHeroes } from "@/services/hero.service";

export default function Index() {
    const [heroes, setHeroes] = React.useState<HeroInterface[]>([]);
    const { push } = useRouter();

    const navigateTo = (route: string) => {
        push(route);
    };

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const data = await getHeroes(); // Call the API
                setHeroes(data); // Update state with fetched heroes
            } catch (error) {
                console.error("Failed to fetch heroes:", error);
            }
        };

        fetchHeroes();
    }, []);

    return (
        <>
            <div className={"bg-white relative p-4 ml-20 mr-20 mt-20 rounded-md"}>
                <button
                    type="button"
                    onClick={() => navigateTo("/create")}
                    className="absolute right-0 mb-40 mt-2 mr-2 top-0 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create new
                </button>
                <ul role="list" className="divide-y mt-10 divide-gray-100">
                    {heroes.map((person, idx) => (
                        <li key={idx} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                        <a className="hover:underline">{person.name}</a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm/6 text-gray-900">{person.superpower}</p>
                                    <p className="mt-1 text-xs/5 text-gray-500">
                                        Humility Score: {person.humilityScore}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
