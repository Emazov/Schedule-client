import { useDroppable } from '@dnd-kit/core';
import LessonCard from './Card/LessonCard';

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

	const gridStyleMerged = lesson?.duration && lesson.duration > 1
		? { gridColumn: `${col} / ${col + lesson.duration}` }
		: {};

	const backgroundHighlight = isOver
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