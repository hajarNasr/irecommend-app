const displayNone = 'display-none';

export const handleMainNavClick = (e)=>{
    e.preventDefault();
  
    removeCurrentActiveNav();
    
    addNewActiveNav(e.target);
     
    removeCurrentActiveSection();
 
    const navdata = e.target.getAttribute('navdata');
    addNewActiveSection(navdata);
}

export const removeCurrentActiveNav = () =>{
     document.querySelector('.active-nav')
             .classList
             .remove('active-nav');
}

export const removeCurrentActiveSection = ()=>{
    document.querySelector('.active-section')
            .classList
            .remove("active-section");     
}

export const addNewActiveNav = (target)=>{
        target
        .classList
        .add('active-nav');
}

export const addNewActiveSection = (navdata)=>{
    document.querySelector(`[sectiondata="${navdata}"]`)
            .classList
            .add('active-section');
}

export const goToHomeSectionOne =()=>{
    activateHomeSection(1);
}

export const goToLoginPage = () =>{  
    activateHomeSection(4);
    cleanLoginFormFields();
    hideSignupPage(getSignupLoginElements());
}
export const goToSignupPage = ()=>{
    activateHomeSection(4);
    cleanSignupFormFields();
    hideLoginPage(getSignupLoginElements());
}
const cleanLoginFormFields = ()=>{
    const loginFormElms = getElement('login-form').elements;
    clearValue(loginFormElms.username);
    clearValue(loginFormElms.password);
    getElement('login-error').innerHTML = "";
}

const cleanSignupFormFields =()=>{
    const signupFormElms = getElement('signup-form').elements;
    clearValue(signupFormElms.username);
    clearValue(signupFormElms.email);
    clearValue(signupFormElms.password1);
    clearValue(signupFormElms.password2);

    const signupFormFields = Array.from(getElement('signup-form').querySelectorAll(".form-field"));
    
    signupFormFields.map(field =>(
           field.querySelector(".error-msg").innerHTML = ""
    ));

}
const clearValue = (elem) => {
    elem.value = "";
}
const activateHomeSection = (num)=>{
    removeCurrentActiveNav();
    addNewActiveNav(getElement(`nav-${num}`));
    removeCurrentActiveSection();
    addNewActiveSection(num);
}

const hideSignupPage = (elements) =>{
    elements.signupPage.classList.add(displayNone);
    elements.signupBtn.classList.remove(displayNone);
    elements.loginPage.classList.remove(displayNone);
    elements.loginBtn.classList.add(displayNone);
}

const hideLoginPage = (elements) =>{
    elements.signupPage.classList.remove(displayNone);
    elements.signupBtn.classList.add(displayNone);
    elements.loginPage.classList.add(displayNone);
    elements.loginBtn.classList.remove(displayNone);
}

const getSignupLoginElements = () =>{
    return {loginPage:getElement('login-page'), 
           signupPage:getElement('signup-page'), 
           signupBtn: getElement('signup-btn-4-id'), 
           loginBtn:  getElement('login-btn-4-id')}
} 

const getElement = (id)=>{
    return document.getElementById(id);
}



 