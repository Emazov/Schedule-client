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

	const handleDoubleClick = () => {
		setSchedule((prev) => {
			const updated = { ...prev };
			delete updated[id];
			return updated;
		});
	};

	return (
		<div
			ref={setNodeRef}
			className='table_time_slot'
			onDoubleClick={handleDoubleClick}
		>
			{lesson && <LessonCard subject={lesson} id={id} />}
		</div>
	);
};

export default DroppableCell;
