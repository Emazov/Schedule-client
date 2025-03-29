import { useDrag } from 'react-dnd';

export const TaskCard = ({ task, draggable = false, onDoubleClick }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'task',
		item: task,
		canDrag: draggable,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className='task-card'
			style={{
				backgroundColor: task.color,
				opacity: isDragging ? 0.5 : 1,
				cursor: draggable ? 'move' : 'default',
			}}
			onDoubleClick={onDoubleClick}
		>
			<div className='task-title'>{task.title}</div>
			{task.teacher && <div className='task-teacher'>{task.teacher}</div>}
			{task.room && <div className='task-room'>Room: {task.room}</div>}
		</div>
	);
};
