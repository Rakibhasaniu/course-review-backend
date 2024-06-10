import { TTag } from "./course.interface"
import Course from "./course.model"

export const durationCalculator = (start: string, end: string) => {
    const startDate: Date = new Date(start)
    const endDate: Date = new Date(end)
    console.log(startDate,endDate)
  
    const timeDifferenceInMiliSecond: number =
      endDate.getTime() - startDate.getTime()
      console.log(timeDifferenceInMiliSecond)
  
    const weeks: number = Math.ceil(
      timeDifferenceInMiliSecond / (1000 * 60 * 60 * 24 * 7),
    )
    console.log(weeks)
  
    return weeks
  }

  export const CourseSearchAbleFields = ['title','language','tags.name']


  export const updateObject = (details: any) => {
    const simplifiedData: Record<string, unknown> = {}
  
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        simplifiedData[`details.${key}`] = value
      }
    }
  
    return simplifiedData
  }
  
  export const updateArray = async (id: string, tags: [TTag]) => {
    const deletedTagsName = tags
      .filter((tag) => tag.isDeleted === true)
      .map((tag) => tag.name)
    const updatedTags = tags.filter((tag) => tag.isDeleted === false)
    const updatedTagsName = updatedTags.map((tag) => tag.name)
    const courseData = await Course.findById(id)
  
    const currentTags = courseData?.tags
  
    currentTags?.forEach((tag) => {
      if (
        !deletedTagsName.includes(tag.name) &&
        !updatedTagsName.includes(tag.name)
      ) {
        updatedTags.push(tag)
      }
    })
  
    return updatedTags
  }