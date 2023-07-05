export type currentMusicLevel =
  | 'standard'
  | 'higher'
  | 'exhigh'
  | 'lossless'
  | 'hires'
  | 'jyeffect'
  | 'sky'
  | 'jymaster'

// order顺序播放 single单曲循环 random随机播放 list列表循环
export type PlayOrderType = 'order' | 'single' | 'random' | 'list'
