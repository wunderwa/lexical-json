import { compactXml, $ } from '../../utils'
import { toFb2TitleInfo } from './toFb2TitleInfo'
import { Fb2Description } from '../../typesFb2'

export const toFb2Description = (data: Fb2Description) => {
  const content = [toFb2TitleInfo(data.titleInfo)]

  return $('description', compactXml(content))
}
