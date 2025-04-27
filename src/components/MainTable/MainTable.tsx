import React from 'react';
import DroppableCell from '../DroppableCell';
import './index.css';

import { useScheduleStore } from '../../store/store.ts';
import { daysOfWeek, timeSlots, groups } from '../../defaultData';

const MainTable = () => {
	const { activeGroupId, setActiveGroup, schedules } = useScheduleStore();

	const selectedGroup = groups.find((g) => g.groupId === activeGroupId)!;

	return (
		<div className='main_table'>
			<div className='table_header'>
				<select
					value={selectedGroup.groupId}
					onChange={(e) => setActiveGroup(e.target.value)}
					onFocus={(e) => e.target.blur()}
					className='select'
				>
					{groups.map((group) => (
						<option key={group.groupId} value={group.groupId}>
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
								lesson={schedules[activeGroupId]?.[cellId] || null}
							/>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainTable;
