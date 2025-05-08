import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useScheduleStore } from '../store/store';
import { timeSlots } from '../defaultData';

interface DndManagerProps {
	children: React.ReactNode;
}

const DndManager: React.FC<DndManagerProps> = ({ children }) => {
	const { schedules, activeDayId, addLessonToCell, removeLessonFromCell, swapLessons, userRole } = useScheduleStore();
	const [activeData, setActiveData] = useState<any>(null);

	const isEditingAllowed = userRole === 'admin';

	const handleDragStart = (event: DragStartEvent) => {
		if (!isEditingAllowed) return;
		setActiveData(event.active.data.current);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		if (!isEditingAllowed) return;

		const { active, over } = event;

		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		// Если перетаскиваем из таблицы в таблицу
		if (activeId.includes('-') && overId.includes('-')) {
			if (activeId === overId) return;

			const lesson = schedules[activeDayId]?.[activeId];
			if (!lesson) return;

			const overLesson = schedules[activeDayId]?.[overId];

			// Если в целевой ячейке есть урок, выполняем свап
			if (overLesson) {
				// Проверяем возможность свапа с учетом длительности
				if (lesson.duration && lesson.duration > 1) {
					if (!canAcceptDrop(overId, activeData, schedules, activeDayId)) return;
				}

				if (overLesson.duration && overLesson.duration > 1) {
					// Проверяем, может ли урок из целевой ячейки поместиться в исходной
					const [activeGroupId, activeTimeId] = activeId.split("-");
					const activeTimeIndex = timeSlots.findIndex(t => t.id === activeTimeId);

					if (activeTimeIndex + overLesson.duration > timeSlots.length) return;

					for (let i = 1; i < overLesson.duration; i++) {
						const nextTimeId = timeSlots[activeTimeIndex + i].id;
						const nextCellId = `${activeGroupId}-${nextTimeId}`;

						if (schedules[activeDayId]?.[nextCellId] && nextCellId !== overId) {
							return;
						}
					}
				}

				swapLessons(activeDayId, activeId, overId);
			} else {
				// Проверяем возможность перемещения с учетом длительности
				if (!canAcceptDrop(overId, activeData, schedules, activeDayId)) return;

				// Удаляем из прежней ячейки
				removeLessonFromCell(activeDayId, activeId);

				// Добавляем в новую ячейку
				addLessonToCell(activeDayId, overId, lesson);
			}
		}
		// Если перетаскиваем из панели предметов в таблицу
		else if (!activeId.includes('-') && overId.includes('-')) {
			// Проверяем возможность перемещения с учетом длительности
			if (!canAcceptDrop(overId, activeData, schedules, activeDayId)) return;

			const newLesson = {
				id: activeData.id || activeId,
				title: activeData.title,
				color: activeData.color,
				teacher: activeData.teacher,
				room: activeData.room,
				duration: activeData.duration || 1
			};

			addLessonToCell(activeDayId, overId, newLesson);
		}

		setActiveData(null);
	};

	const canAcceptDrop = (
		cellId: string,
		dragData: any,
		schedules: Record<string, any>,
		activeDayId: string
	): boolean => {
		if (!dragData?.duration || dragData.duration <= 1) return true;

		const [groupId, timeId] = cellId.split("-");
		const timeIndex = timeSlots.findIndex(t => t.id === timeId);
		if (timeIndex === -1) return false;

		// Проверяем, хватает ли места справа
		if (timeIndex + dragData.duration > timeSlots.length) {
			return false;
		}

		// Проверяем, не заняты ли ячейки справа
		for (let i = 1; i < dragData.duration; i++) {
			const nextTimeId = timeSlots[timeIndex + i].id;
			const nextCellId = `${groupId}-${nextTimeId}`;

			// Игнорируем исходную ячейку при проверке
			if (schedules[activeDayId]?.[nextCellId] && nextCellId !== dragData.originalId) {
				return false;
			}
		}

		return true;
	};

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			{children}
		</DndContext>
	);
};

export default DndManager; 