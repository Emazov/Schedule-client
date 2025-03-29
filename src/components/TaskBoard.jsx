import React from 'react';
import { format } from 'date-fns';
import { TimeSlot } from './TimeSlot';

const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];
const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export const TaskBoard = ({ tasks, onDrop, onTaskDoubleClick }) => {
	return (
		<div className='task-board'>
			{/* Empty top-left corner */}
			<div className='grid-header'></div>

			{/* Day headers */}
			{daysOfWeek.map((day) => (
				<div key={day} className='grid-header'>
					{day}
				</div>
			))}

			{/* Time slots grid */}
			{hours.map((hour) => (
				<React.Fragment key={hour}>
					{/* Time label column */}
					<div className='time-label'>
						{format(new Date().setHours(hour, 0, 0, 0), 'h a')}
					</div>

					{/* Time slots for each day */}
					{daysOfWeek.map((day) => {
						const key = `${day}-${hour}`;
						const slotTasks = tasks[key] || [];
						return (
							<TimeSlot
								key={key}
								day={day}
								hour={hour}
								tasks={slotTasks}
								onDrop={onDrop}
								onTaskDoubleClick={onTaskDoubleClick}
							/>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};
