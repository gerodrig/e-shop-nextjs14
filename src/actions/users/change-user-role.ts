'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole =async (userId: string, role: string) => {

    const session = await auth();
    try {
        if(session?.user?.role !== 'admin') {
            throw new Error('You are not authorized to perform this action');
        }

        const newRole = role === 'admin' ? 'admin' : 'user';

        await prisma.user.update({
            where: {id: userId},
            data: {role: newRole}

        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            message: 'User role updated successfully'
        }
        
    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }
};