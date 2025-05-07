import React from 'react';
import DroppableCell from '../DroppableCell';
import './index.css';

import { useScheduleStore } from '../../store/store.ts';
import { daysOfWeek, timeSlots, groups } from '../../defaultData';

const MainTable = () => {
	const { activeDayId, setActiveDay, schedules } = useScheduleStore();

	return (
		<div className='main_table' style={{ gridTemplateColumns: `auto repeat(${timeSlots.length}, 1fr)` }}>
			<div className='table_header'>
				<select
					value={activeDayId}
					onChange={(e) => setActiveDay(e.target.value)}
					onFocus={(e) => e.target.blur()}
					className='select'
				>
					{daysOfWeek.map((day) => (
						<option key={day.id} value={day.id}>
							{day.title}
						</option>
					))}
				</select>
			</div>

			{timeSlots.map((time) => (
				<div key={time.id} id={time.id} className='table_header'>
					{time.slot} <br /> {time.start}-{time.end}
				</div>
			))}

			{groups.map((group, groupIdx) => (
				<React.Fragment key={group.id}>
					<div id={group.id} className='table_time_label' style={{ gridRow: groupIdx + 2 }}>
						{group.title}
					</div>

					{timeSlots.map((time, timeIdx) => {
						const cellId = `${group.id}-${time.id}`;
						// const rowCol = `${groupIdx + 2}-${timeIdx + 2}`

						return (
							<DroppableCell
								row={groupIdx + 2}
								col={timeIdx + 2}
								key={cellId}
								id={cellId}
								lesson={schedules[activeDayId]?.[cellId] || null}
							/>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainTable;
