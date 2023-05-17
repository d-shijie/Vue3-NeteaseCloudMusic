import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      redirect: '/index/find-music',
      component: () => import('@/views/appIndex/appIndex.vue'),
      children: [
        {
          path: '/index/find-music',
          name: 'FindMuisc',
          component: () => import('@/views/findMusic/findMusicIndex.vue'),
          redirect: '/index/find-music/personalized-recommendations',
          children: [
            {
              path: '/index/find-music/personalized-recommendations',
              name: 'Personalizedrecommendations',
              component: () => import('@/views/findMusic/personalizedrecommendations.vue')
            },

          ]
        },
        {
          path: '/index/podcast',
          name: 'Podcast',
          component: () => import('@/views/podcast/podcastIndex.vue'),
        },
        {
          path: '/index/video',
          name: 'Video',
          component: () => import('@/views/video/videoIndex.vue'),
        },
        {
          path: '/index/follow',
          name: 'Follow',
          component: () => import('@/views/follow/followIndex.vue'),
        },
        {
          path: '/index/live-broadcast',
          name: 'LiveBroadcast',
          component: () => import('@/views/liveBroadcast/liveBroadcastIndex.vue'),
        },
        {
          path: '/index/private-fm',
          name: 'PrivateFM',
          component: () => import('@/views/privateFM/privateFMIndex.vue'),
        },
        {
          path: '/index/playlist-detail',
          name: 'PlaylistDetail',
          component: () => import('@/views/playlistDetail/playlistDetailIndex.vue'),
        }
      ]
    },

  ]
})

export default router
