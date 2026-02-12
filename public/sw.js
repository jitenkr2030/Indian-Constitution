const CACHE_NAME = 'indian-constitution-app-v1.0.0'
const STATIC_CACHE_NAME = 'indian-constitution-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'indian-constitution-dynamic-v1.0.0'

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other static assets as needed
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('Serving from cache:', request.url)
          return response
        }

        // Otherwise, fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response.ok) {
              return response
            }

            // Clone the response since it can only be used once
            const responseClone = response.clone()
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                console.log('Caching dynamic content:', request.url)
                cache.put(request, responseClone)
              })

            return response
          })
          .catch(() => {
            // If both cache and network fail, try to serve offline page
            if (request.destination === 'document') {
              return caches.match('/offline.html')
            }
            
            // For API requests, return offline response
            if (request.url.includes('/api/')) {
              return new Response(
                JSON.stringify({
                  success: false,
                  error: 'Offline - Please check your internet connection',
                  offline: true
                }),
                {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                }
              )
            }
          })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)
  
  if (event.tag === 'sync-bookmarks') {
    event.waitUntil(syncBookmarks())
  }
  
  if (event.tag === 'sync-search-history') {
    event.waitUntil(syncSearchHistory())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Indian Constitution App', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received')
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper functions
async function syncBookmarks() {
  try {
    // Sync offline bookmarks to server
    const offlineBookmarks = await getOfflineBookmarks()
    
    for (const bookmark of offlineBookmarks) {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmark)
      })
    }
    
    await clearOfflineBookmarks()
  } catch (error) {
    console.error('Failed to sync bookmarks:', error)
  }
}

async function syncSearchHistory() {
  try {
    // Sync offline search history to server
    const offlineHistory = await getOfflineSearchHistory()
    
    for (const search of offlineHistory) {
      await fetch('/api/search-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search)
      })
    }
    
    await clearOfflineSearchHistory()
  } catch (error) {
    console.error('Failed to sync search history:', error)
  }
}

// IndexedDB helpers for offline storage
async function getOfflineBookmarks() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ConstitutionAppDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['bookmarks'], 'readonly')
      const store = transaction.objectStore('bookmarks')
      const getAllRequest = store.getAll()
      
      getAllRequest.onerror = () => reject(getAllRequest.error)
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
    }
  })
}

async function clearOfflineBookmarks() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ConstitutionAppDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['bookmarks'], 'readwrite')
      const store = transaction.objectStore('bookmarks')
      const clearRequest = store.clear()
      
      clearRequest.onerror = () => reject(clearRequest.error)
      clearRequest.onsuccess = () => resolve(clearRequest.result)
    }
  })
}

async function getOfflineSearchHistory() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ConstitutionAppDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['searchHistory'], 'readonly')
      const store = transaction.objectStore('searchHistory')
      const getAllRequest = store.getAll()
      
      getAllRequest.onerror = () => reject(getAllRequest.error)
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
    }
  })
}

async function clearOfflineSearchHistory() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ConstitutionAppDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['searchHistory'], 'readwrite')
      const store = transaction.objectStore('searchHistory')
      const clearRequest = store.clear()
      
      clearRequest.onerror = () => reject(clearRequest.error)
      clearRequest.onsuccess = () => resolve(clearRequest.result)
    }
  })
}