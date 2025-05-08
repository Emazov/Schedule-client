import { ChangeEvent } from 'react';
import { useScheduleStore } from '../../store/store';
import { daysOfWeek } from '../../defaultData';

const roles = ['admin', 'teacher', 'student'];

const Header = () => {
	const { userRole, setUserRole, setActiveDay } = useScheduleStore();

	const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>) => {
		setUserRole(e.target.value as 'admin' | 'teacher' | 'student');
		setActiveDay(daysOfWeek[0].id);
	};
	return (
		<header className='header w-full bg-white'>
			<div className='header_container max-w-400 mx-auto px-3 py-2 flex items-center justify-between'>
				<img src='./logo_aiu.png' alt='' className='w-18 cursor-pointer' />
				<h1 className='text-3xl font-bold cursor-pointer'>AIU Schedule</h1>
				<select
					className='header_btn cursor-pointer uppercase outline-0'
					name='role'
					value={userRole}
					onChange={handleChangeRole}
				>
					{roles.map((role) => (
						<option key={role} value={role} className='uppercase'>
							{role}
						</option>
					))}
				</select>
			</div>
		</header>
	);
};

export default Header;
