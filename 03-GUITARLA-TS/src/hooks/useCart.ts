import { useEffect, useMemo, useState } from "react";
import { db } from '../data/db';
import type { TCartItem, TGuitar } from "../types/types";

function useCart() {

  const initialCart = (): TCartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item: TGuitar) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) { // existe en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const newItem: TCartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: TGuitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function decreaseQuantity(id: TGuitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id: TGuitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  // se recomienda que sea un objeto para acceder a las funciones por su nombre al importarlas
  return {
    data,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
}

export default useCart;