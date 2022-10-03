// import {
//   add,
//   eachDayOfInterval,
//   endOfMonth,
//   format,
//   getDay,
//   isBefore,
//   isEqual,
//   isSameDay,
//   isSameMonth,
//   isToday,
//   parse,
//   parseISO,
//   startOfToday,
// } from 'date-fns'
// import React, { useState } from 'react'
// import { LeftArrowIcon, RightArrowIcon } from './arrowIcons'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// };

// function Calendar() {
//     let today = startOfToday()
//     let [selectedDay, setSelectedDay] = useState(today)
//     let [checkIn, setCheckIn] = useState('none')
//     let [checkOut, setCheckOut] = useState('none')
//     let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
//     let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
//     let days = eachDayOfInterval({
//       start: firstDayCurrentMonth,
//       end: endOfMonth(firstDayCurrentMonth),
//     })
  
//     function previousMonth() {
//       let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
//       setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
//     }
  
//     function nextMonth() {
//       let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
//       setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
//     }
  
  
//   function handleDaySelect(day) {
//     setSelectedDay(day)
//     if (checkIn == 'none') {
//       setCheckIn(day);
//     } else {
//       setCheckOut(day);
//       //popUp trigger=False
//     }
    
//   }

//     return (
//       <div className=" h-full w-full ">
//         <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
//           <div className=" ">
//             <div className="">
//               <div className="flex items-center">
//                 <h2 className="flex-auto font-semibold text-gray-900">
//                   {format(firstDayCurrentMonth, 'MMMM yyyy')}
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={previousMonth}
//                   className="calendar_arrow"
//                 >
//                   <span className="sr-only">Previous month</span>
//                   <LeftArrowIcon  height="12" width="20"/>
//                 </button>
//                 <button
//                   onClick={nextMonth}
//                   type="button"
//                   className="calendar_arrow"
//                 >
//                   <span className="sr-only">Next month</span>
//                   <RightArrowIcon height="12" width="20"/>
//                 </button>
                
//               </div>
//               <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>T</div>
//                 <div>W</div>
//                 <div>T</div>
//                 <div>F</div>
//                 <div>S</div>
//               </div>
//               <div className="grid grid-cols-7 mt-2 text-sm">
//                 {days.map((day, dayIdx) => (
//                   <div
//                     key={day.toString()}
//                     className={classNames(
//                       dayIdx === 0 && colStartClasses[getDay(day)],
//                       'py-1.5'
//                     )}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => handleDaySelect(day)}
//                       className={classNames(
//                         isBefore(day, selectedDay) && 'text-gray-400',
//                         isEqual(day, selectedDay) && 'text-white',
//                         !isEqual(day, selectedDay) &&
//                           isToday(day) &&
//                           'text-red-500',
//                         !isEqual(day, selectedDay) &&
//                           !isToday(day) &&
//                           isSameMonth(day, firstDayCurrentMonth) &&
//                           'text-gray-900',
//                         !isEqual(day, selectedDay) &&
//                           !isToday(day) &&
//                           !isSameMonth(day, firstDayCurrentMonth) &&
//                           'text-gray-400',
//                         isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
//                         isEqual(day, selectedDay) &&
//                           !isToday(day) &&
//                           'bg-gray-900',
//                         !isEqual(day, selectedDay) && 'hover:bg-gray-200',
//                         (isEqual(day, selectedDay) || isToday(day)) &&
//                           'font-semibold',
//                         'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
//                       )}
//                       disabled={isBefore(day, today)}
//                     >
//                       <time dateTime={format(day, 'yyyy-MM-dd')}>
//                         {format(day, 'd')}
//                       </time>
//                     </button>
  
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   let colStartClasses = [
//     '',
//     'col-start-2',
//     'col-start-3',
//     'col-start-4',
//     'col-start-5',
//     'col-start-6',
//     'col-start-7',
//   ]