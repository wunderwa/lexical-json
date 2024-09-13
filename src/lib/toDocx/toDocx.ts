import { Document, Packer, File, ISectionOptions, INumberingOptions } from 'docx'

type DocxOpts = {
  creator?: string
  title?: string
  description?: string
}

export const toDocx = (sections: ISectionOptions[], numbering: INumberingOptions, options?: DocxOpts) => {
  const doc: File = new Document({
    ...options,
    sections,
    numbering,
  })

  return Packer.toBlob(doc)
}
