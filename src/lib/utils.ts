import { ChordToneShift, ChordsTone } from './types'

export const tones: ChordsTone[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

export const getShiftedTone = (tone: ChordsTone, shift: ChordToneShift): ChordsTone | null => {
  const _tone = tone.toUpperCase()
  const _shift = ((shift % 12) + 12) % 12
  const i = tones.indexOf(_tone as ChordsTone)
  if (i === -1) {
    return null
  }
  return [...tones, ...tones][i + _shift]
}
