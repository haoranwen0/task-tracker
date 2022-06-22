import { useCallback, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { default as SyncIcon } from '@mui/icons-material/CachedOutlined';
import { default as ChangePasswordIcon } from '@mui/icons-material/LockOutlined';
import { default as ThemeIcon } from '@mui/icons-material/DarkModeOutlined';
import { default as APITokenIcon } from '@mui/icons-material/ContentPasteOutlined';
import { default as CreateIcon } from '@mui/icons-material/AddCircleOutlined';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useSidebar from '../hooks/useSidebar';

const Sidebar = () => {
  const [
    user,
    showStatus,
    selectedColor,
    selectedCourses,
    onCreateCourse,
    updateNewCourse,
    updateShowStatus,
    handleUpdateSelectedColor,
    handleUpdateSelectedCourses,
  ] = useSidebar();

  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
  ];

  const Course = ({ course, color }) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false); // hide menu

    const handleContextMenu = useCallback(
      (event) => {
        event.preventDefault();
        setAnchorPoint({ x: event.pageX, y: event.pageY });
        setShow(true);
      },
      [setAnchorPoint]
    );

    const handleClick = useCallback(
      () => (show ? setShow(false) : null),
      [show]
    );

    useEffect(() => {
      document.addEventListener('click', handleClick);
      document.addEventListener('contextmenu', handleContextMenu);
      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    });

    return (
      <div
        className={`w-full p-4 cursor-pointer rounded-md mb-2 select-none flex items-center justify-between ${
          showStatus.editCourse
            ? 'pointer-events-none'
            : selectedCourses[course]
            ? 'bg-gray-200'
            : ''
        }`}
        onClick={() => handleUpdateSelectedCourses(course)}
      >
        <div className='flex items-center'>
          <div
            className={`${color} w-[16px] h-[16px] rounded-full mr-4`}
            onClick={() => handleUpdateSelectedCourses(course)}
          />
          <span onClick={() => handleUpdateSelectedCourses(course)}>
            {course}
          </span>
        </div>
        {showStatus.editCourse && (
          <div className='flex items-center'>
            <div className='icon-container mr-2'>
              <EditIcon />
            </div>
            <div className='icon-container'>
              <DeleteIcon />
            </div>
          </div>
        )}
        {show && (
          <ul
            className='menu'
            style={{
              top: anchorPoint.y,
              left: anchorPoint.x,
            }}
          >
            <li>Share to..</li>
            <li>Cut</li>
          </ul>
        )}
      </div>
    );
  };

  const Color = ({ color, selected }) => {
    return (
      <div
        className={`icon-container text-white w-[28px] h-[28px] rounded-full ${color} mb-2 cursor-pointer`}
        onClick={() => {
          handleUpdateSelectedColor(color);
          updateNewCourse((prevState) => ({
            ...prevState,
            color,
          }));
        }}
      >
        {selected && <CheckIcon fontSize='small' />}
      </div>
    );
  };

  return (
    <div className='w-[350px] h-full bg-gray-100 flex flex-col rounded-tr-lg rounded-br-lg'>
      <div className='flex items-center mb-12 px-6 pt-6'>
        <div className='icon-container mr-4'>
          <DoneAllIcon fontSize='large' />
        </div>
        <h1 className='font-medium text-2xl'>Task Tracker</h1>
      </div>
      <div className='px-6'>
        <div className='w-full flex items-center justify-between cursor-pointer mb-4 select-none'>
          <h1 className='text-xl'>Courses</h1>
          <div
            className='icon-container'
            onClick={() =>
              updateShowStatus((prevState) => ({
                ...prevState,
                editCourse: !showStatus.editCourse,
              }))
            }
          >
            <MoreHorizIcon />
          </div>
        </div>
        <div className='w-full'>
          <Course course='6.1000' color='bg-red-500' />
          <Course course='6.2000' color='bg-green-500' />
          <Course course='6.1070' color='bg-yellow-500' />
          <Course course='All' color='bg-purple-600' />
          <button
            className='p-4 mt-4 mb-4 text-center rounded-md w-full text-white bg-purple-600'
            onClick={() =>
              updateShowStatus((prevState) => ({
                ...prevState,
                createCourse: !showStatus.createCourse,
              }))
            }
          >
            Create New Course
          </button>
          <form
            className={`bg-white rounded-md shadow-sm p-4 transition-all origin-top-right ${
              showStatus.createCourse
                ? 'scale-1 opacity-100'
                : 'scale-0 opacity-0'
            }`}
            onSubmit={onCreateCourse}
          >
            <div className='flex flex-wrap mb-2 justify-between'>
              {colors.map((color, index) => (
                <Color
                  key={index}
                  color={color}
                  selected={selectedColor[color] ? true : false}
                />
              ))}
            </div>
            <div className='flex items-center relative mx-[0.07rem]'>
              <input
                type='text'
                name='course'
                placeholder='Enter course number'
                onChange={(e) =>
                  updateNewCourse((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                className='focus:outline-none bg-transparent w-full border-b border-gray-300 pb-2 pr-6 focus:border-purple-600 transition'
              />
              <div
                className={`icon-container absolute right-[-2px] bottom-[8px] cursor-pointer text-purple-600`}
              >
                <CreateIcon />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-auto flex justify-between items-center bg-gray-200 p-6 relative rounded-br-lg'>
        {user && (
          <div className='flex'>
            <div
              className='w-12 h-12 bg-purple-600 rounded-full grid place-items-center mr-4 items-center cursor-pointer select-none'
              onClick={() =>
                updateShowStatus((prevState) => ({
                  ...prevState,
                  settingsMenu: !showStatus.settingsMenu,
                }))
              }
            >
              <span className='text-white font-semibold'>
                {user.attributes.given_name[0].toUpperCase()}
              </span>
            </div>
            <div className='flex flex-col justify-center'>
              <span className='text-lg'>
                {user.attributes.given_name +
                  ' ' +
                  user?.attributes.family_name}
              </span>
              <span className='text-sm'>{user.attributes.email}</span>
            </div>
          </div>
        )}
        <div
          className='icon-container cursor-pointer'
          onClick={() => Auth.signOut()}
        >
          <LogoutIcon />
        </div>
        <div
          className={`absolute w-64 border-gray-200 border transition-all origin-bottom-left bg-white bottom-0 left-0 mb-[84px] ml-5 rounded-md shadow-sm ${
            showStatus.settingsMenu ? 'scale-1' : 'scale-0'
          }`}
        >
          <div className='p-4 hover:bg-gray-100 flex cursor-pointer transition'>
            <div className='icon-container mr-4'>
              <SyncIcon />
            </div>
            <span>Sync Canvas</span>
          </div>
          <div className='p-4 hover:bg-gray-100 flex cursor-pointer transition'>
            <div className='icon-container mr-4'>
              <APITokenIcon />
            </div>
            <span>Canvas API Token</span>
          </div>
          <div className='p-4 hover:bg-gray-100 flex cursor-pointer transition'>
            <div className='icon-container mr-4'>
              <ChangePasswordIcon />
            </div>
            <span>Change Password</span>
          </div>
          <div className='p-4 hover:bg-gray-100 flex cursor-pointer transition'>
            <div className='icon-container mr-4'>
              <ThemeIcon />
            </div>
            <span>Theme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
