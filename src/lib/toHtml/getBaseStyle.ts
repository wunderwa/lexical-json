import { LexicalBase, LexicalStyle } from '../types'

export const getBaseStyle = (node: LexicalBase): LexicalStyle => {
  const styles: LexicalStyle = {}
  if (node.direction) styles.direction = node.direction
  if (node.format) styles.textAlign = node.format
  return styles
}
