import { ChangeEvent, useState } from 'react';

const roles = ['admin', 'teacher', 'student'];

const Header = () => {
	const [headerRole, setHeaderRole] = useState('admin');

	const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>) => {
		setHeaderRole(e.target.value);
	};
	return (
		<header className='header w-full bg-white'>
			<div className='header_container max-w-400 mx-auto px-3 py-2 flex items-center justify-between'>
				<img src='./logo_aiu.png' alt='' className='w-18 cursor-pointer' />
				<h1 className='text-3xl font-bold cursor-pointer'>AIU Schedule</h1>
				<select
					className='header_btn cursor-pointer uppercase outline-0'
					name='role'
					value={headerRole}
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
