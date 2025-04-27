import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';
import './App.css';

import {
	defaultTasks,
} from './defaultData';

function App() {
	const [schedule, setSchedule] = useState<{ [cellId: string]: any }>({});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		// Если тащим элемент с панели (id начинается с 'custom-' или число)
		const isFromPanel =
			activeId.toString().startsWith('custom-') ||
			!activeId.toString().includes('-');

		if (isFromPanel) {
			// Если переносим с панели в таблицу
			setSchedule((prev) => ({
				...prev,
				[overId]: defaultTasks.find((t) => t.id === activeId) || {
					id: activeId,
					title: active.data.current?.title,
					color: active.data.current?.color,
				},
			}));
		} else {
			// Перемещение или обмен между ячейками
			setSchedule((prev) => {
				const updated = { ...prev };

				const fromLesson = updated[activeId];
				const toLesson = updated[overId];

				// Обмен
				updated[activeId] = toLesson;
				updated[overId] = fromLesson;

				return updated;
			});
		}
	};

	return (
		<div className='app'>
			<Header />
			<DndContext onDragEnd={handleDragEnd}>
				<div className='container'>
					<MainTable
						schedule={schedule}
						setSchedule={setSchedule}
					/>
					<SidePanel
						setSchedule={setSchedule}
					/>
				</div>
			</DndContext>
		</div>
	);
}

export default App;
