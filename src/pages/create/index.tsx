import React from "react";
import { useRouter } from "next/router";
import { HeroInterface } from "@/interfaces/hero.interface";
import {saveHero} from "@/services/hero.service";

export default function Create() {
    const { push } = useRouter(); // Hook called at the top level

    const navigateTo = (route: string) => {
        push(route);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name")?.toString().trim() || "";
        const superPower = formData.get("super-power")?.toString().trim() || "";
        const humilityScore = Number(formData.get("humility-score"));

        if (isNaN(humilityScore) || humilityScore < 1 || humilityScore > 10) {
            alert("Field 'Humility Score' must be a number between 1 and 10.");
            return;
        }

        const hero: HeroInterface = {
            name,
            superpower: superPower,
            humilityScore,
        };

        await saveHero(hero);

        alert("Hero created successfully!");
        navigateTo('/');
    };

    return (
        <div className="bg-white mb-20 relative p-4 ml-20 mr-20 mt-20 rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Create Hero</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="name"
                                            name="name"
                                            required
                                            type="text"
                                            placeholder="Cleber"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="super-power" className="block text-sm/6 font-medium text-gray-900">
                                    Super Power
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="super-power"
                                        required
                                        name="super-power"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="humility-score" className="block text-sm/6 font-medium text-gray-900">
                                    Humility Score
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="humility-score"
                                        required
                                        name="humility-score"
                                        type="number"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => navigateTo('/')} type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
