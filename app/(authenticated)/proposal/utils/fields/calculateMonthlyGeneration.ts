// app/(authenticated)/proposal/utils/calculateMonthlyGeneration.ts
"use client"
export default function calculateMonthlyGeneration(kwp: number): number {
    const generationMultiplier = 
    Number(process.env.NEXT_PUBLIC_GENERATION_MULTIPLIER);

    const generation = kwp * generationMultiplier

    const remainder = generation % 100;

    if (remainder >= 95) {
        return Math.ceil(generation / 100) * 100;
    }

    return Math.floor(generation / 100) * 100;
}
    