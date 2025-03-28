const STORAGE_KEY = "feedback-form-state";

const formData = {email: "", message: ""};

const refs = {
    form: document.querySelector(".feedback-form"),
    formLabels: document.querySelectorAll('label'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
    button: document.querySelector('button'),
};

function addformStyle() {
    refs.form.style.display = 'flex';
    refs.form.style.flexDirection = 'column';
    refs.form.style.rowGap = '8px';
    refs.form.style.alignItems = 'start';
    refs.form.style.padding = '24px';
    refs.form.style.maxWidth = '360px';
    refs.form.style.fontFamily = 'Montserrat';
    refs.form.style.textUnderlinePosition = 'from-font';
    refs.form.style.fontWeight = 400;

    [...refs.formLabels].map((label) => {
        label.style.display = 'flex';
        label.style.flexDirection = 'column';
        label.style.rowGap = '8px';
        label.style.width = '100%';
        label.style.lineHeight = '24px';
        label.style.color = '#2E2F42';
        label.style.fontFamily = 'Montserrat';
        label.style.letterSpacing = '0.04em';
    });
    
    refs.input.autofocus = true;
    refs.input.style.borderRadius = '4px';
    refs.input.style.padding = '8px 16px';
    refs.input.style.border = '1px solid #808080';

    refs.textarea.style.borderRadius = '4px';
    refs.textarea.style.padding = '8px 16px';
    refs.textarea.style.border = '1px solid #808080';

    refs.button.style.display = 'flex';
    refs.button.style.padding = '8px 16px';
    refs.button.style.justifyContent = 'center';
    refs.button.style.alignItems = 'center';
    refs.button.style.borderRadius = '8px';
    refs.button.style.backgroundColor = '#4e75ff';
    refs.button.style.border = 'none';
    refs.button.style.color = '#fff';
    refs.button.style.fontFamily = 'Montserrat';
    refs.button.style.lineHeight = '24px';
    refs.button.style.letterSpacing = '0.04em';
};

addformStyle();

function addHoverActive() {
    refs.formLabels[0].addEventListener('mouseenter', function () {
      refs.input.style.borderColor = '#000000';
    });
  
    refs.formLabels[0].addEventListener('mouseleave', function () {
        refs.input.style.borderColor = '#808080';
    });
    refs.formLabels[1].addEventListener('mouseenter', function () {
     refs.textarea.style.borderColor = '#000000';
    });
  
    refs.formLabels[1].addEventListener('mouseleave', function () {
        refs.textarea.style.borderColor = '#808080';
    });
  
    refs.input.addEventListener('focus', function () {
        refs.input.setAttribute('placeholder', 'Type area');
    });
  
    refs.input.addEventListener('blur', function () {
        refs.input.removeAttribute('placeholder');
    });
  
    refs.button.addEventListener('mouseenter', function () {
        refs.button.style.backgroundColor = '#6C8CFF';
    });
  
    refs.button.addEventListener('mouseleave', function () {
        refs.button.style.backgroundColor = '#4E75FF';
    });
};

addHoverActive();

refs.form.addEventListener('input', e => {
    formData.email = e.currentTarget.elements.email.value.trim();
    formData.message = e.currentTarget.elements.message.value.trim();
    saveToLS(STORAGE_KEY, formData);
});

function initPage () {
    const dataLS = loadFromLS(STORAGE_KEY);
    refs.form.elements.email.value = dataLS?.email || '';
    refs.form.elements.message.value = dataLS?.message || '';
};
initPage();

refs.form.addEventListener('submit', e => {
    e.preventDefault();
    formData.email = e.currentTarget.elements.email.value.trim();
    formData.message = e.currentTarget.elements.message.value.trim();
    if (formData.email === "" || formData.message === "") {
        return alert("Fill please all fields");
      };
    console.log(formData);
    refs.form.reset();
    formData.email = "";
    formData.message = "";
    localStorage.removeItem(STORAGE_KEY);
});

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
};

function loadFromLS(key) {
    const body = localStorage.getItem(key);
    try {
        const data = JSON.parse(body);
        return data;
    } catch (err) {
        console.log(err);
        return body;
    }
};


