import React from 'react';
import './index.css';

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

const groups = [
	{ id: 'group_COMCEH-24', name: 'COMCEH-24' },
	{ id: 'group_COMSE-24', name: 'COMSE-24' },
	{ id: 'group_COMFCI-24', name: 'COMFCI-24' },
	{ id: 'group_COMSEP-23', name: 'COMSEP-23' },
	{ id: 'group_COMCEH-23', name: 'COMCEH-23' },
	{ id: 'group_COMSE-23', name: 'COMSE-23' },
	{ id: 'group_COMFCI-23', name: 'COMFCI-23' },
	{ id: 'group_COM-22a', name: 'COM-22a' },
	{ id: 'group_COM-22b', name: 'COM-22b' },
	{ id: 'group_COM-21', name: 'COM-21' },
];

const MainTable = () => {
	return (
		<div className='main_table'>
			<div className='table_header'>GROUP</div>
			{daysOfWeek.map((day) => (
				<div key={day} className='table_header'>
					{day}
				</div>
			))}

			{timeSlots.map((time) => (
				<React.Fragment key={time.slot}>
					<div key={time.slot} className='table_time_label'>
						{time.slot} <br /> {time.start}-{time.end}
					</div>
					{daysOfWeek.map((day) => (
						<div key={`${day}-${time.slot}`} className='table_time_slot'></div>
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainTable;
