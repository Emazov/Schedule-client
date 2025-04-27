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
};

const DroppableCell = ({ id, lesson }: DroppableCellProps) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<div ref={setNodeRef} className='table_time_slot'>
			{lesson && <LessonCard id={id} subject={lesson} />}
		</div>
	);
};

export default DroppableCell;
