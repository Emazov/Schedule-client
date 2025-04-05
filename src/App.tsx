import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import SidePanel from './components/SidePanel/SidePanel';

import './App.css';

function App() {
	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<MainTable />
				<SidePanel />
			</div>
		</div>
	);
}

export default App;
