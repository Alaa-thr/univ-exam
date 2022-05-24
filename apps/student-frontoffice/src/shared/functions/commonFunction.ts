
export function calculeTime(startHour: string, endHour: string):number{
    const startValue = new Date("01/01/2007 " + startHour);
    const endValue = new Date("01/01/2007 " + endHour);
    const min = Math.round((endValue.getTime()-startValue.getTime())/60000);
    return min;
}