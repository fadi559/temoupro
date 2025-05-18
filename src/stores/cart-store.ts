import { updateCartItem, syncCartWithUser, getOrCreateCart } from '@/actions/cart-action';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    title: string; 
    price: number;
    quantity: number;
    image: string;
};

type CartStore = {
    items: CartItem[];
    isLoaded: boolean;
    isOpen: boolean;
    cartId: string | null;
    setStore: (store: Partial<CartStore>) => void;
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    openCart: () => void;
    close: () => void;
    setLoaded: (loaded: boolean) => void;
    syncWithUser: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            isLoaded: false,
            cartId: null,

            openCart: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),

            setStore: (store) => set(store),

            addItem: async (item) => {
                const { cartId } = get();
                if (!cartId) {
                    return;
                }

                const existingItem = get().items.find((i) => i.id === item.id);
                if (existingItem) {
                    await get().updateQuantity(item.id, existingItem.quantity + item.quantity);
                } else {
                    const updatedCart = await updateCartItem(cartId, item.id, {
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                    });

                    set((state) => ({
                        ...state,
                        cartId: updatedCart.id,
                        items: [...state.items, { ...item }],
                    }));
                }
            },

            removeItem: async (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));

                const cartId = get().cartId;
                if (!cartId) return;

                const item = get().items.find((item) => item.id === id);
                if (!item) return;

                await updateCartItem(cartId, item.id, { quantity: 0 });
            },

            updateQuantity: async (id, quantity) => {
                const { cartId } = get();
                if (!cartId) {
                    return;
                }

                const updatedCart = await updateCartItem(cartId, id, {
                    quantity: quantity,
                });

                set((state) => ({
                    ...state,
                    cartId: updatedCart.id,
                    items: state.items.map((item) => item.id === id ? { ...item, quantity } : item)
                }));
            },

            syncWithUser: async () => {
                const { cartId } = get();
                if(!cartId) {
                    const cart = await getOrCreateCart();
                    set((state) => ({
                        ...state,
                        cartId: cart.id,
                        items: cart.items
                    }));
                }
                const syncedCart = await syncCartWithUser(cartId);
                if(syncedCart) {
                    set((state) => ({
                        ...state,
                        cartId: syncedCart.id,
                        items: syncedCart.items,
                    }))
                }
            },

            clearCart: () => {
                set((state) => ({ ...state, items: [] }));
            },

            setLoaded: (loaded) => {
                set((state) => ({ ...state, isLoaded: loaded }));
            },

            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);