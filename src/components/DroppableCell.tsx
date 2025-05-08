import { useDroppable } from '@dnd-kit/core';
import LessonCard from './Card/LessonCard';
import { useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { useScheduleStore } from '../store/store';

type DroppedLesson = {
	id: string;
	title: string;
	color: string;
	teacher?: string;
	room?: string;
	duration?: number;
};

type DroppableCellProps = {
	id: string;
	lesson: DroppedLesson | null;
	col: number;
};

const DroppableCell = ({ id, lesson, col }: DroppableCellProps) => {
	const { setNodeRef, isOver } = useDroppable({ id });
	const [isDragging, setIsDragging] = useState(false);
	const { userRole } = useScheduleStore();
	const isAdmin = userRole === 'admin';

	useDndMonitor({
		onDragStart: (event) => {
			if (event.active.id === id) {
				setIsDragging(true);
			}
		},
		onDragEnd: () => {
			setIsDragging(false);
		},
		onDragCancel: () => {
			setIsDragging(false);
		}
	});

	const gridStyleMerged = lesson?.duration && lesson.duration > 1 && !isDragging
		? { gridColumn: `${col} / ${col + lesson.duration}` }
		: {};

	const backgroundHighlight = isOver && isAdmin
		? { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
		: {};

	const finalStyle = {
		...gridStyleMerged,
		...backgroundHighlight,
	};

	return (
		<div
			ref={setNodeRef}
			id={id}
			className='table_time_slot'
			style={finalStyle}
		>
			{lesson && <LessonCard id={id} subject={lesson} isInTable={true} />}
		</div>
	);
};

export default DroppableCell;