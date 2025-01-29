import {HeroInterface} from "@/interfaces/hero.interface";

const BASE_URL = process.env.HERO_SERVICE_BASE_URL || "";

/**
 * Saves a hero to the backend.
 * @param hero The hero data to be saved.
 */
export const saveHero = async (hero: HeroInterface): Promise<void> => {
    const response = await fetch(`${BASE_URL}/superheroes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hero),
    });

    if (!response.ok) {
        throw new Error("Failed to save the hero.");
    }
};

/**
 * Fetches a list of heroes ordered by descending humility score.
 */
export const getHeroes = async (): Promise<HeroInterface[]> => {
    const response = await fetch(`${BASE_URL}/superheroes`);

    if (!response.ok) {
        throw new Error("Failed to fetch heroes.");
    }

    return response.json();
};


