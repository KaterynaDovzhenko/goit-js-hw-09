const feedbackForm = document.querySelector('.feedback-form');

let formData = JSON.parse(localStorage.getItem('feedback-form-data')) || {
  email: '',
  message: '',
};

const fillFields = () => {
  try {
    if (!localStorage.getItem('feedback-form-data')) {
      return;
    }
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-data')
    );

    formData = formDataFromLS;

    for (const key in formDataFromLS) {
      feedbackForm.elements[key].value = formDataFromLS[key];
    }
  } catch (error) {
    console.log(error);
  }
};

fillFields();

const onFormFieldChange = event => {
  const { target: fieldEl } = event;
  const fieldValue = fieldEl.value;
  const fieldName = fieldEl.name;

  formData[fieldName] = fieldValue;
  localStorage.setItem('feedback-form-data', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();

  for (const key in formData) {
    if (!formData[key]) {
      alert('Fill please all fields');
      return;
    }
  }
  const { currentTarget: formEl } = event;
  formEl.reset();
  localStorage.removeItem('feedback-form-data');
  formData = { email: '', message: '' };
};

feedbackForm.addEventListener('input', onFormFieldChange);
feedbackForm.addEventListener('submit', onFormSubmit);
