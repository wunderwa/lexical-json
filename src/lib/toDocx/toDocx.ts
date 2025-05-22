import { Document, Packer, File, ISectionOptions, INumberingOptions } from 'docx'

type DocxOpts = {
  title?: string
  description?: string
  creator?: string
  keywords?: string
}

export const toDocx = (sections: ISectionOptions[], numbering: INumberingOptions, options?: DocxOpts) => {
  const doc: File = new Document({
    ...options,
    sections,
    numbering,
  })

  return Packer.toBlob(doc)
}
