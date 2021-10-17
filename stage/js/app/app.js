// Variables
const PREV_BTNS = document.querySelectorAll("form .prev"),
    NEXT_BTNS = document.querySelectorAll("form .next"),
    FORM_STEPS = document.querySelectorAll("form .form-step"),
    PROGRESS_BAR = document.querySelector(".form-steps .progress-bar "),
    PROGRESS_BAR_STEPS = PROGRESS_BAR.querySelectorAll(".progress-step"),
    BAR = PROGRESS_BAR.querySelector(".bar")
    // --------------------------------------------------------------------
let formStepNum = 0;
let formStepCount = FORM_STEPS.length;
//--- next button
NEXT_BTNS.forEach(btn => {
    btn.addEventListener("click", (e) => {
        formStepNum++;
        nextStep();
        updateProgressBar();
        stopPreStep()

    })
})
PREV_BTNS.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepNum--;
        prevStep();
        updateProgressBar();
        stopPreStep()
    })
})
const nextStep = () => {
    FORM_STEPS.forEach(step => {
        step.classList.remove('active');
    })
    FORM_STEPS[formStepNum].classList.add("active")
}
const prevStep = () => {
    FORM_STEPS.forEach(step => {
        step.classList.remove('active');
    })
    FORM_STEPS[formStepNum].classList.add("active")
}
const updateProgressBar = () => {
    PROGRESS_BAR_STEPS.forEach((step, i) => {
        if (i < formStepNum + 1) {
            step.classList.add("active")
        } else {
            step.classList.remove("active")
        }
    })
    let activeProgress = document.querySelectorAll(".form-steps .progress-bar .active");
    BAR.style.width = ((activeProgress.length - 1) / (PROGRESS_BAR_STEPS.length - 1)) * 100 + "%";
}
const stopPreStep = () => {
    if (formStepNum >= formStepCount - 1) {
        NEXT_BTNS.forEach(btn => {
            btn.style.opacity = .6;
            btn.style.pointerEvents = "none"
        })
    } else {
        NEXT_BTNS.forEach(btn => {
            btn.style.opacity = 1;
            btn.style.pointerEvents = "all"
        })
    }

}