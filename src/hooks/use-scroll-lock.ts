"use client"

import { useCallback, useEffect, useRef } from "react"

// Глобальный refcount — чтобы несколько компонентов могли безопасно «шерить» лок.
let LOCK_COUNT = 0

function applyLock() {
  const w = typeof window !== "undefined" ? window : null
  if (!w) return

  const html = document.documentElement
  const body = document.body

  // Уже залочено? Увеличим счётчик и выйдем.
  if (LOCK_COUNT > 0) {
    LOCK_COUNT++
    return
  }

  const scrollY = w.scrollY || w.pageYOffset || 0

  html.classList.add("overflow-hidden")
  body.classList.add("overflow-hidden")

  // iOS-friendly фикс: «замораживаем» страницу в текущей позиции
  body.style.position = "fixed"
  body.style.top = `-${scrollY}px`
  body.style.left = "0"
  body.style.right = "0"
  body.style.width = "100%"

  // Гасим overscroll-зацепы/броски
  html.style.overscrollBehavior = "contain"

  LOCK_COUNT = 1
}

function releaseLock() {
  const w = typeof window !== "undefined" ? window : null
  if (!w) return

  if (LOCK_COUNT === 0) return
  LOCK_COUNT--

  if (LOCK_COUNT > 0) return // ещё есть активные локи — не снимаем

  const html = document.documentElement
  const body = document.body

  const y = body.style.top ? -Number.parseInt(body.style.top, 10) : 0

  body.style.position = ""
  body.style.top = ""
  body.style.left = ""
  body.style.right = ""
  body.style.width = ""
  html.style.overscrollBehavior = ""
  html.classList.remove("overflow-hidden")
  body.classList.remove("overflow-hidden")

  // Возвращаем прежнюю позицию
  w.scrollTo(0, y)
}

/**
 * Низкоуровневый хук: даёт методы lock/unlock.
 * Сам ничего не «следит» — вызывайте вручную или через другой useEffect.
 */
export function useScrollLock() {
  const lockedRef = useRef(false)

  const lock = useCallback(() => {
    if (lockedRef.current) return
    applyLock()
    lockedRef.current = true
  }, [])

  const unlock = useCallback(() => {
    if (!lockedRef.current) return
    releaseLock()
    lockedRef.current = false
  }, [])

  // На случай размонтирования — снимем лок
  useEffect(() => {
    return () => {
      if (lockedRef.current) {
        releaseLock()
        lockedRef.current = false
      }
    }
  }, [])

  return { lock, unlock, isLocked: lockedRef.current }
}

/**
 * Удобная обёртка: «следит» за булевым флагом и лочит/анлочит автоматически.
 */
export function useScrollLockWhen(enabled: boolean) {
  const { lock, unlock } = useScrollLock()
  useEffect(() => {
    if (enabled) {
      lock()
      return () => unlock()
    }
    unlock()
  }, [enabled, lock, unlock])
}
