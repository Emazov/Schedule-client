import React, { useState } from 'react';
import { useDndMonitor } from '@dnd-kit/core';
import DroppableCell from '../DroppableCell';
import './index.css';

type MainTableProps = {
	daysOfWeek: string[];
	timeSlots: { slot: string; start: string; end: string }[];
	schedule: { [cellId: string]: any };
	setSchedule: React.Dispatch<React.SetStateAction<{ [cellId: string]: any }>>;
};

type DroppedLesson = {
	id: string;
	title: string;
	color: string;
};

const MainTable = ({
	daysOfWeek,
	timeSlots,
	schedule,
	setSchedule,
}: MainTableProps) => {
	const [_, setCellData] = useState<
		Record<string, DroppedLesson | null>
	>({});

	// Слушаем событие drop
	useDndMonitor({
		onDragEnd(event) {
			const { over, active } = event;

			if (over && active) {
				const cellId = over.id as string;
				const lesson = active.data?.current?.subject as DroppedLesson;

				if (lesson) {
					setCellData((prev) => ({
						...prev,
						[cellId]: lesson, // записываем в конкретную ячейку урок
					}));
				}
			}
		},
	});

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
