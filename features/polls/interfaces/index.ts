export interface IPoll {
  _id: string
  title: string
  description: string
  createdAt: string
  lastModified: string
  sections: IPollSection[]
}

export interface IPollSection {
  sectionId: string
  name: string
  description?: string
  isRequired?: boolean
  options: IPollOption[]
}

export interface IPollOption {
  optionId: string
  name: string
}