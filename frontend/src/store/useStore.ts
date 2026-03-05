import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    type: 'pet' | 'product';
    quantity: number;
}

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    breed?: string;
    type: 'pet' | 'product';
}

interface StoreState {
    cart: CartItem[];
    wishlist: WishlistItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            cart: [],
            wishlist: [],

            addToCart: (item) => {
                const existing = get().cart.find((c) => c.id === item.id);
                if (existing) {
                    set((state) => ({
                        cart: state.cart.map((c) =>
                            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
                        ),
                    }));
                } else {
                    set((state) => ({ cart: [...state.cart, { ...item, quantity: 1 }] }));
                }
            },

            removeFromCart: (id) =>
                set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(id);
                    return;
                }
                set((state) => ({
                    cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
                }));
            },

            clearCart: () => set({ cart: [] }),

            addToWishlist: (item) => {
                if (!get().isInWishlist(item.id)) {
                    set((state) => ({ wishlist: [...state.wishlist, item] }));
                }
            },

            removeFromWishlist: (id) =>
                set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== id) })),

            isInWishlist: (id) => get().wishlist.some((w) => w.id === id),

            getCartTotal: () =>
                get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

            getCartCount: () =>
                get().cart.reduce((sum, item) => sum + item.quantity, 0),
        }),
        {
            name: 'rumzee-store',
        }
    )
);
