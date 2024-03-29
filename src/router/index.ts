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
              component: () => import('@/views/findMusic/personalizedRecommendations.vue')
            },
            {
              path: '/index/find-music/exclusive-custome',
              name: 'ExclusiveCustom',
              component: () => import('@/views/findMusic/exclusiveCustom.vue')
            },
            {
              path: '/index/find-music/find-music-playlist',
              name: 'FindMusicPlaylist',
              component: () => import('@/views/findMusic/findMusicPlaylist.vue')
            },
            {
              path: '/index/find-music/rank',
              name: 'FindMusicRank',
              component: () => import('@/views/findMusic/findMusicRank.vue')
            },
            {
              path: '/index/find-music/singer',
              name: 'FindMusicSinger',
              component: () => import('@/views/findMusic/findMusicSinger.vue')
            },
            {
              path: '/index/find-music/new-music',
              name: 'FindMusicNewMusic',
              component: () => import('@/views/findMusic/findMusicNewMusic.vue')
            }
          ]
        },
        {
          path: '/index/podcast',
          name: 'Podcast',
          component: () => import('@/views/podcast/podcastIndex.vue')
        },
        {
          path: '/index/video',
          name: 'Video',
          component: () => import('@/views/video/videoIndex.vue'),
          redirect: '/index/video/video-index',
          children: [
            {
              path: '/index/video/video-index',
              name: 'VideoIndex',
              component: () => import('@/views/video/video/videoIndex.vue')
            },
            {
              path: '/index/video/mv-index',
              name: 'MvIndex',
              component: () => import('@/views/video/mv/mvIndex.vue')
            }
          ]
        },
        {
          path: '/index/follow',
          name: 'Follow',
          component: () => import('@/views/follow/followIndex.vue')
        },
        {
          path: '/index/live-broadcast',
          name: 'LiveBroadcast',
          component: () => import('@/views/liveBroadcast/liveBroadcastIndex.vue')
        },
        {
          path: '/index/private-fm',
          name: 'PrivateFM',
          component: () => import('@/views/privateFM/privateFMIndex.vue')
        },
        {
          path: '/index/playlist-detail',
          name: 'PlaylistDetail',
          component: () => import('@/views/playlistDetail/playlistDetailIndex.vue')
        },
        {
          path: '/index/dayly-songs-recommend',
          name: 'DaylySongsRecommend',
          component: () => import('@/views/daylySongsRecommend/daylySongsRecommend.vue')
        },
        {
          path: '/index/dj-detail',
          name: 'DjDetail',
          component: () => import('@/views/podcast/djDetail/djDetailIndex.vue')
        },
        {
          path: '/index/dj-list',
          name: 'DjList',
          component: () => import('@/views/podcast/djList/listIndex.vue')
        },
        {
          path: '/index/all-mv',
          name: 'AllMv',
          component: () => import('@/views/video/mv/allMv.vue')
        },
        {
          path: '/index/mv-rank',
          name: 'MvRank',
          component: () => import('@/views/video/mv/mvRank.vue')
        },
        {
          path: '/index/profile',
          name: 'Profile',
          component: () => import('@/views/profile/profileIndex.vue')
        },
        {
          path: '/index/search',
          name: 'Search',
          component: () => import('@/views/searchResult/searchIndex.vue'),
          redirect: '/index/search/single-music',
          children: [
            {
              path: '/index/search/single-music',
              name: 'SingleMusic',
              component: () => import('@/views/searchResult/components/singleMusic.vue')
            },
            {
              path: '/index/search/singer',
              name: 'SearchSinger',
              component: () => import('@/views/searchResult/components/searchSinger.vue')
            },
            {
              path: '/index/search/album',
              name: 'SearchAlbum',
              component: () => import('@/views/searchResult/components/searchAlbum.vue')
            },
            {
              path: '/index/search/video',
              name: 'SearchVideo',
              component: () => import('@/views/searchResult/components/searchVideo.vue')
            },
            {
              path: '/index/search/playlist',
              name: 'SearchPlaylist',
              component: () => import('@/views/searchResult/components/searchPlaylist.vue')
            },
            {
              path: '/index/search/lyric',
              name: 'SearchLyric',
              component: () => import('@/views/searchResult/components/searchLyric.vue')
            },
            {
              path: '/index/search/dj',
              name: 'SearchDj',
              component: () => import('@/views/searchResult/components/searchDj.vue')
            },
            {
              path: '/index/search/program',
              name: 'SearchProgram',
              component: () => import('@/views/searchResult/components/searchProgram.vue')
            },
            {
              path: '/index/search/user',
              name: 'SearchUser',
              component: () => import('@/views/searchResult/components/searchUser.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/video-detail',
      name: 'VideoDetail',
      component: () => import('@/views/video/videoDetail/videoDetailIndex.vue')
    }
  ]
})

export default router
