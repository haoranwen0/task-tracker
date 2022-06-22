import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useSidebar() {
  const user = useSelector((state) => state.user.value);
  const [initialSelectedCourses, updateInitialSelectedCourses] = useState({
    '6.1000': false,
    '6.2000': false,
    '6.1070': false,
    All: true,
  });
  const [showStatus, updateShowStatus] = useState({
    createCourse: false,
    settingsMenu: false,
    editCourse: false,
  });
  const [selectedCourses, updateSelectedCourses] = useState({
    '6.1000': false,
    '6.2000': false,
    '6.1070': false,
    All: true,
  });
  const [selectedColor, updateSelectedColor] = useState({
    'bg-red-500': true,
    'bg-green-500': false,
    'bg-purple-500': false,
    'bg-lime-500': false,
    'bg-slate-500': false,
    'bg-orange-500': false,
    'bg-yellow-500': false,
  });
  const [newCourse, updateNewCourse] = useState({
    name: '',
    color: 'bg-red-500',
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(selectedCourses);
  }, [selectedCourses]);

  const handleUpdateSelectedColor = (color) => {
    let newSelectedColor = {
      'bg-red-500': false,
      'bg-green-500': false,
      'bg-purple-500': false,
      'bg-lime-500': false,
      'bg-slate-500': false,
      'bg-orange-500': false,
      'bg-yellow-500': false,
    };
    newSelectedColor[color] = true;
    console.log(newSelectedColor);
    updateSelectedColor(newSelectedColor);
  };

  const handleUpdateSelectedCourses = (course) => {
    if (course !== 'All') {
      var numSelectedCourses = 0;
      var selectedCourse = null;
      for (const course in selectedCourses) {
        if (selectedCourses[course]) {
          numSelectedCourses += 1;
          selectedCourse = course;
        }
      }
      if (numSelectedCourses === 1 && selectedCourse === course) {
        updateSelectedCourses(initialSelectedCourses);
      } else {
        updateSelectedCourses((prevState) => ({
          ...prevState,
          [course]: !selectedCourses[course],
          All: false,
        }));
      }
    } else {
      updateSelectedCourses(initialSelectedCourses);
    }
  };

  const onCreateCourse = (e) => {
    e.preventDefault();
    console.log(newCourse);
  };

  return [
    user,
    showStatus,
    selectedColor,
    selectedCourses,
    onCreateCourse,
    updateNewCourse,
    updateShowStatus,
    handleUpdateSelectedColor,
    handleUpdateSelectedCourses,
  ];
}
