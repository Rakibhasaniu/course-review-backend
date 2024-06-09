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