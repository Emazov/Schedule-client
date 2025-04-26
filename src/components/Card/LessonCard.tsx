import { useDraggable } from '@dnd-kit/core';

type LessonCardProps = {
	id: string;
	subject: {
		id: string;
		title: string;
		color: string;
	};
};

const LessonCard = ({ id, subject }: LessonCardProps) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
		data: { title: subject.title, color: subject.color },
	});

	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		backgroundColor: subject.color,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='side_lessons_item no_select'
		>
			{subject.title}
		</div>
	);
};

export default LessonCard;
