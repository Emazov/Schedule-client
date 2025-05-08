import { create } from 'zustand';

type Lesson = {
	id: string;
	title: string;
	color: string;
	duration?: number;
	teacher?: string;
	room?: string;
};

type Schedule = {
	[cellId: string]: Lesson | null;
};

type ScheduleStore = {
	schedules: { [dayId: string]: Schedule };
	activeDayId: string;
	setActiveDay: (dayId: string) => void;
	addLessonToCell: (dayId: string, cellId: string, lesson: Lesson) => void;
	removeLessonFromCell: (dayId: string, cellId: string) => void;
	swapLessons: (dayId: string, fromCellId: string, toCellId: string) => void;
	addNewLesson: (lesson: Lesson) => void;
	availableLessons: Lesson[];
};

import { defaultTasks, daysOfWeek } from '../defaultData';
import { timeSlots } from '../defaultData';

export const useScheduleStore = create<ScheduleStore>((set) => ({
	schedules: daysOfWeek.reduce((acc, day) => {
		acc[day.id] = {};
		return acc;
	}, {} as { [dayId: string]: Schedule }),
	activeDayId: daysOfWeek[0].id,
	availableLessons: [...defaultTasks],

	setActiveDay: (dayId) => set({ activeDayId: dayId }),

	addLessonToCell: (dayId, cellId, lesson) =>
		set((state) => ({
			schedules: {
				...state.schedules,
				[dayId]: {
					...state.schedules[dayId],
					[cellId]: lesson,
				},
			},
		})),

	removeLessonFromCell: (dayId, cellId) =>
		set((state) => {
			const daySchedule = { ...state.schedules[dayId] };
			delete daySchedule[cellId];

			return {
				schedules: {
					...state.schedules,
					[dayId]: daySchedule,
				},
			};
		}),

	swapLessons: (dayId, fromCellId, toCellId) =>
		set((state) => {
			const daySchedule = { ...state.schedules[dayId] };

			// Получаем уроки
			const fromLesson = daySchedule[fromCellId];
			const toLesson = daySchedule[toCellId];

			// Удаляем старые записи
			delete daySchedule[fromCellId];
			delete daySchedule[toCellId];

			// Освобождаем занятые ячейки для fromLesson
			if (fromLesson && fromLesson.duration && fromLesson.duration > 1) {
				const [fromGroupId, fromTimeId] = fromCellId.split("-");
				const fromTimeIndex = timeSlots.findIndex(t => t.id === fromTimeId);

				for (let i = 1; i < fromLesson.duration; i++) {
					const nextTimeId = timeSlots[fromTimeIndex + i]?.id;
					if (nextTimeId) {
						const nextCellId = `${fromGroupId}-${nextTimeId}`;
						delete daySchedule[nextCellId];
					}
				}
			}

			// Освобождаем занятые ячейки для toLesson
			if (toLesson && toLesson.duration && toLesson.duration > 1) {
				const [toGroupId, toTimeId] = toCellId.split("-");
				const toTimeIndex = timeSlots.findIndex(t => t.id === toTimeId);

				for (let i = 1; i < toLesson.duration; i++) {
					const nextTimeId = timeSlots[toTimeIndex + i]?.id;
					if (nextTimeId) {
						const nextCellId = `${toGroupId}-${nextTimeId}`;
						delete daySchedule[nextCellId];
					}
				}
			}

			// Добавляем уроки в новые ячейки
			if (fromLesson) daySchedule[toCellId] = fromLesson;
			if (toLesson) daySchedule[fromCellId] = toLesson;

			return {
				schedules: {
					...state.schedules,
					[dayId]: daySchedule,
				},
			};
		}),

	addNewLesson: (lesson) =>
		set((state) => ({
			availableLessons: [...state.availableLessons, lesson],
		})),
}));
