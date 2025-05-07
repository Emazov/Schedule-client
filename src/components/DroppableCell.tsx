import { useDroppable } from '@dnd-kit/core';
import LessonCard from './Card/LessonCard';

type DroppedLesson = {
	id: string;
	title: string;
	color: string;
	teacher?: string;
	room?: string;
};

type DroppableCellProps = {
	id: string;
	lesson: DroppedLesson | null;
	row: number;
	col: number;
};

const DroppableCell = ({ id, lesson, row, col }: DroppableCellProps) => {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			id={id}
			className='table_time_slot'
			style={{ backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : '' }}
			row-data={row}
			col-data={col}
		>
			{lesson && <LessonCard id={id} subject={lesson} isInTable={true} />}
		</div>
	);
};

export default DroppableCell;