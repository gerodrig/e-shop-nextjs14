'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

type ProductToOrder = {
    productId: string;
    quantity: number;
    size: Size;
}

type PlaceOrderResponse = {
    ok: boolean;
    order?: any;
    prismaTx?: any;
    message?: string;
}


export const placeOrder = async(productIds: ProductToOrder[], address: Address): Promise<PlaceOrderResponse> => {

    try {
        const session = await auth();
        const userId = session?.user.id;

        if(!userId) {
            throw new Error('Session not found');
        }

        console.log({productIds, address, userId})

        //? Get product information
        // NOTE: We can have 2 products with the same id but different size
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds.map(p => p.productId)
                }
            }
        });

        //? Calculate total price
        const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

        // Calculate totals including subtotal, tax, etc.
        const {subtotal, tax, total } = productIds.reduce((totals, item) => {
            const productQuantity = item.quantity;
            const product = products.find(p => p.id === item.productId);

            if(!product) {
                throw new Error('Product not found');
            }

            const subtotal = product.price * productQuantity;

            totals.subtotal += subtotal;
            totals.tax += subtotal * 1.05;
            totals.total += subtotal * 1.05;

            return totals;
        },{subtotal: 0, tax: 0, total: 0});

        //? Create database transaction using Prisma
        const orderTx = await prisma.$transaction(async(tx) => {
            //? 1.Update Products stock

            //Accumulate values
            const updateProdcutsPromise = products.map((product) => {
                const productQuantity = productIds.filter(p => p.productId === product.id).reduce((count, p) => count + p.quantity, 0);

                if(productQuantity === 0) {
                    throw new Error(`${product.id} has no quantity`);
                }



                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            //? Wait for all products to be updated
            const updatedProducts = await Promise.all(updateProdcutsPromise);

            //? Verify that all products have stock
            updatedProducts.forEach((product) => {
                if(product.inStock < 0) {
                    throw new Error(`${product.title} has no stock`);
                }
            });

            //? Create order Header and Details
            const order = await tx.order.create({
                data: {
                userId,
                itemsInOrder,
                subtotal,
                tax,
                total,

                OrderItem: {
                    createMany: {
                        data: productIds.map(p => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find(product => product.id === p.productId)?.price ?? 0
                        }))
                    }
                }
            }
            });
            //? Persist order address
            const { country, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            });

            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            }
        });

        return {
            ok: true,
            order: orderTx.order,
            prismaTx: orderTx,
        }

        
    } catch (error: any) {
        console.log(error);
        return {
            ok:  false,
            message: error.message ?? 'Something went wrong'
        }
    }

}

