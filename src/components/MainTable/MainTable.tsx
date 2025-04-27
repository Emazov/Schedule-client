import React, { useState } from 'react';
import DroppableCell from '../DroppableCell';
import './index.css';

import { daysOfWeek, timeSlots, groups } from '../../defaultData';

type MainTableProps = {
	schedule: { [cellId: string]: any };
	setSchedule: React.Dispatch<React.SetStateAction<{ [cellId: string]: any }>>;
};

const MainTable = ({ schedule, setSchedule }: MainTableProps) => {
	const [selectedGroup, setSelectedGroup] = useState(groups[0]);

	return (
		<div className='main_table'>
			<div className='table_header'>
				<select
					value={selectedGroup.title}
					onChange={(e) => {
						const selected = groups.find(
							(group) => group.title === e.target.value
						);
						if (selected) setSelectedGroup(selected);
					}}
					onFocus={(e) => e.target.blur()}
					className='select'
				>
					{groups.map((group) => (
						<option key={group.groupId} value={group.title}>
							{group.title}
						</option>
					))}
				</select>
			</div>
			{daysOfWeek.map((day) => (
				<div key={day} className='table_header'>
					{day}
				</div>
			))}

			{timeSlots.map((time) => (
				<React.Fragment key={time.slot}>
					<div className='table_time_label'>
						{time.slot} <br /> {time.start}-{time.end}
					</div>
					{daysOfWeek.map((day) => {
						const cellId = `${day}-${time.slot}`;

						return (
							<DroppableCell
								key={cellId}
								id={cellId}
								lesson={schedule[cellId]}
								setSchedule={setSchedule}
							/>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainTable;
