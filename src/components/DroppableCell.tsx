import { useDroppable } from '@dnd-kit/core';
import LessonCard from './Card/LessonCard';

type DroppedLesson = {
	id: string;
	title: string;
	color: string;
};

type DroppableCellProps = {
	id: string;
	lesson: DroppedLesson | null;
	setSchedule: React.Dispatch<React.SetStateAction<{ [cellId: string]: any }>>;
};

const DroppableCell = ({ id, lesson, setSchedule }: DroppableCellProps) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<div ref={setNodeRef} className='table_time_slot'>
			{lesson && (
				<LessonCard
					subject={lesson}
					id={id}
					setSchedule={setSchedule}
				/>
			)}
		</div>
	);
};

export default DroppableCell;
