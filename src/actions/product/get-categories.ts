'use server';

import prisma from "@/lib/prisma";

export const getCategories = async() => {

    try {

        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        if(!categories) throw new Error('No categories found');

        return  categories
        
    } catch (error: any) {
        console.log(error);
        return [];
    }
};