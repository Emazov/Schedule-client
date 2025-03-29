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
const hours = Array.from({ length: 12 }, (_, i) => i + 8); 

export const TaskBoard = ({ tasks, onDrop, onTaskDoubleClick }) => {
	return (
		<div className='task-board'>
			<div className='grid-header'></div>

			{daysOfWeek.map((day) => (
				<div key={day} className='grid-header'>
					{day}
				</div>
			))}

			{hours.map((hour) => (
				<React.Fragment key={hour}>
					<div className='time-label'>
						{format(new Date().setHours(hour, 0, 0, 0), 'h a')}
					</div>

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
