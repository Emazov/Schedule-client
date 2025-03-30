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
];

const timeSlots = [
	{ slot: '1st Hour', start: '09:00', end: '09:55' },
	{ slot: '2nd Hour', start: '10:00', end: '10:40' },
	{ slot: '3rd Hour', start: '10:45', end: '11:25' },
	{ slot: '4th Hour', start: '11:30', end: '12:10' },
	{ slot: '5th Hour', start: '12:15', end: '12:55' },
	{ slot: '6th Hour', start: '13:00', end: '13:40' },
	{ slot: '7th Hour', start: '13:45', end: '14:25' },
	{ slot: '8th Hour', start: '14:30', end: '15:10' },
	{ slot: '9th Hour', start: '15:15', end: '15:55' },
	{ slot: '10th Hour', start: '16:00', end: '16:40' },
	{ slot: '11th Hour', start: '16:45', end: '17:25' },
	{ slot: '12th Hour', start: '17:30', end: '18:10' },
];

const hours = Array.from({ length: 12 }, (_, i) => i + 8);

export const TaskBoard = ({ tasks, onDrop, onTaskDoubleClick }) => {
	return (
		<div className='task-board'>
			<div className='grid-header'>Group</div>

			{daysOfWeek.map((day) => (
				<div key={day} className='grid-header'>
					{day}
				</div>
			))}

			{timeSlots.map((hour) => (
				<React.Fragment key={hour.slot}>
					<div className='time-label'>
						<p>{hour.slot}</p>
						<p>
							{hour.start} <br /> {hour.end}
						</p>
					</div>

					{daysOfWeek.map((day) => {
						const key = `${day}-${hour.slot}`;
						const slotTasks = tasks[key] || [];
						return (
							<TimeSlot
								key={key}
								day={day}
								hour={hour.slot}
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
