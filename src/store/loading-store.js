import { create } from 'zustand'

const useLoadingStore = create((set, get) => ({
    mainSeries: false,
    trendingShows: false,
    originalShows: false,
    animeShows: false,
    recentMovies: false,
    isLoading:false,
    showMenu:false,
    finishedMainSeries: (mainSeries) => set(()=>({mainSeries: true})),
    finishedTrendingShows: (trendingShows) => set(()=>({trendingShows: true})),
    finishedOriginalShows: (originalShows) => set(()=>({originalShows: true})),
    finishedAnimeShows: (animeShows) => set(()=>({animeShows: true})),
    finishedRecentMovies: (recentMovies) => set(()=>({recentMovies: true})),
    isReady: () => {
        return (get().mainSeries && get().trendingShows && get().originalShows && get().animeShows && get().recentMovies)
    },
    setIsLoading: (bool) => set(()=>({isLoading:bool})),
    setShowMenu: (bool) => set(()=>({showMenu:bool}))
}));

export default useLoadingStore;