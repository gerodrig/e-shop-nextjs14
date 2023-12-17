'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async() => {

    const session = await auth();

    try {
        if(session?.user.role !== 'admin') {
            throw new Error('You are not authorized to perform this action');
        }

        const users = await prisma.user.findMany({
            orderBy: {
                name: 'desc'
            },
        });

        return {
            ok: true,
            users
        }
        
    } catch (error: any) {
        return {
            ok: false,
            error: error.message ?? 'Something went wrong'
        }
    }


};