import React from 'react';
import './index.css';

interface MainTableProps {
	daysOfWeek: string[];
	timeSlots: { slot: string; start: string; end: string }[];
}

const MainTable: React.FC<MainTableProps> = ({ daysOfWeek, timeSlots }) => {
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
