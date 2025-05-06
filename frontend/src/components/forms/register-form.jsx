import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // USERS FORM
  const [user, setUser] = useState({ username: '', hash_password: '' });

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/users', user);
    alert('User created!');
    setUser({ username: '', hash_password: '' });
  };

  // TRADES FORM
  const [trade, setTrade] = useState({ trade_name: '' });

  const handleTradeSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/trades', trade);
    alert('Trade created!');
    setTrade({ trade_name: '' });
  };

  // TRAINEES FORM
  const [trainee, setTrainee] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    trade_id: ''
  });

  const handleTraineeSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/trainees', trainee);
    alert('Trainee added!');
    setTrainee({ firstName: '', lastName: '', gender: 'Male', trade_id: '' });
  };

  // MODULES FORM
  const [module, setModule] = useState({ modName: '', modCredits: '' });

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/modules', module);
    alert('Module created!');
    setModule({ modName: '', modCredits: '' });
  };

  // MARKS FORM
  const [marks, setMarks] = useState({
    trainee_id: '',
    trade_id: '',
    module_id: '',
    user_id: '',
    formative_ass: '',
    summative_ass: '',
    comprehensive_ass: '',
    total_marks_100: ''
  });

  const handleMarksSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/marks', marks);
    alert('Marks recorded!');
    setMarks({
      trainee_id: '',
      trade_id: '',
      module_id: '',
      user_id: '',
      formative_ass: '',
      summative_ass: '',
      comprehensive_ass: '',
      total_marks_100: ''
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          placeholder="Username"
          value={user.username}
          onChange={e => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.hash_password}
          onChange={e => setUser({ ...user, hash_password: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>

      <h2>Create Trade</h2>
      <form onSubmit={handleTradeSubmit}>
        <input
          placeholder="Trade Name"
          value={trade.trade_name}
          onChange={e => setTrade({ ...trade, trade_name: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Add Trainee</h2>
      <form onSubmit={handleTraineeSubmit}>
        <input
          placeholder="First Name"
          value={trainee.firstName}
          onChange={e => setTrainee({ ...trainee, firstName: e.target.value })}
        />
        <input
          placeholder="Last Name"
          value={trainee.lastName}
          onChange={e => setTrainee({ ...trainee, lastName: e.target.value })}
        />
        <select
          value={trainee.gender}
          onChange={e => setTrainee({ ...trainee, gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          placeholder="Trade ID"
          value={trainee.trade_id}
          onChange={e => setTrainee({ ...trainee, trade_id: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Create Module</h2>
      <form onSubmit={handleModuleSubmit}>
        <input
          placeholder="Module Name"
          value={module.modName}
          onChange={e => setModule({ ...module, modName: e.target.value })}
        />
        <input
          placeholder="Credits"
          type="number"
          value={module.modCredits}
          onChange={e => setModule({ ...module, modCredits: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>

      <h2>Record Marks</h2>
      <form onSubmit={handleMarksSubmit}>
        <input
          placeholder="Trainee ID"
          value={marks.trainee_id}
          onChange={e => setMarks({ ...marks, trainee_id: e.target.value })}
        />
        <input
          placeholder="Trade ID"
          value={marks.trade_id}
          onChange={e => setMarks({ ...marks, trade_id: e.target.value })}
        />
        <input
          placeholder="Module ID"
          value={marks.module_id}
          onChange={e => setMarks({ ...marks, module_id: e.target.value })}
        />
        <input
          placeholder="User ID"
          value={marks.user_id}
          onChange={e => setMarks({ ...marks, user_id: e.target.value })}
        />
        <input
          placeholder="Formative Assessment"
          value={marks.formative_ass}
          onChange={e => setMarks({ ...marks, formative_ass: e.target.value })}
        />
        <input
          placeholder="Summative Assessment"
          value={marks.summative_ass}
          onChange={e => setMarks({ ...marks, summative_ass: e.target.value })}
        />
        <input
          placeholder="Comprehensive Assessment"
          value={marks.comprehensive_ass}
          onChange={e => setMarks({ ...marks, comprehensive_ass: e.target.value })}
        />
        <input
          placeholder="Total Marks (out of 100)"
          value={marks.total_marks_100}
          onChange={e => setMarks({ ...marks, total_marks_100: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
