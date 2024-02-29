function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ?
        input.parentElement.querySelector('div.valid-feedback') :
        input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}


function newDishValidation(handler) {
    const form = document.forms.fNewDish;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Validación del nombre del plato
        this.ndName.value = this.ndName.value.trim();
        if (!this.ndName.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndName, false, "El nombre del plato es obligatorio.");
            if (!firstInvalidElement) firstInvalidElement = this.ndName;
        } else {
            showFeedBack(this.ndName, true, "Correcto.");
        }

        // Validación de la imagen del plato
        if (!this.ndImg.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndImg, false, "La URL de la imagen es inválida.");
            if (!firstInvalidElement) firstInvalidElement = this.ndImg;
        } else {
            showFeedBack(this.ndImg, true, "Correcto.");
        }

        // Validación de los ingredientes
        this.ndIngredients.value = this.ndIngredients.value.trim();
        if (!this.ndIngredients.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndIngredients, false, "Los ingredientes son obligatorios.");
            if (!firstInvalidElement) firstInvalidElement = this.ndIngredients;
        } else {
            showFeedBack(this.ndIngredients, true, "Correcto.");
        }

        // Validación de la descripción
        if (!this.ndDescription.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndDescription, false, "La descripción es obligatoria.");
            if (!firstInvalidElement) firstInvalidElement = this.ndDescription;
        } else {
            showFeedBack(this.ndDescription, true, "Correcto.");
        }

        // Validación de las categorías
        if (!this.ndCategories.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndCategories, false, "Seleccione al menos una categoría.");
            if (!firstInvalidElement) firstInvalidElement = this.ndCategories;
        } else {
            showFeedBack(this.ndCategories, true, "Correcto.");
        }

        // Validación de los alergenos
        if (!this.ndAllergens.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndAllergens, false, "Seleccione al menos un alergeno.");
            if (!firstInvalidElement) firstInvalidElement = this.ndAllergens;
        } else {
            showFeedBack(this.ndAllergens, true, "Correcto.");
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ndName.value, this.ndDescription.value, this.ndIngredients.value, this.ndImg.value,this.ndCategories.value,this.ndAllergens.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    // Restablecer la validación al hacer reset
    form.addEventListener('reset', function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input, select, textarea')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.ndName.focus();
    });

    for (const element of form.querySelectorAll('input, select, textarea')) {
        element.addEventListener('change', defaultCheckElement);
    }
}

function deleteDishValidator(handler) {
    const form = document.forms.fRemoveDish;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;

        const selectedDishes = form.rdDish.selectedOptions;
        if (selectedDishes.length === 0) {
            isValid = false;
            showFeedBack(form.rdDish, false, "Seleccione al menos un plato.");
        } else {
            showFeedBack(form.rdDish, true, "Correcto.");
        }
        if (isValid) {
            handler();
        } else {
            //console.log(this.ndName.value, this.ndDescription.value, this.ndIngredients.value, this.ndImg.value);
            handler(this.ndName.value, this.ndDescription.value, this.ndIngredients.value, this.ndImg.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}



function newCategoryValidation(handler) {
    const form = document.forms.fNewCategory;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Validación del nombre del plato
        this.ncName.value = this.ncName.value.trim();
        if (!this.ncName.checkValidity()) {
            isValid = false;
            showFeedBack(this.ncName, false, "El nombre de la categoria es obligatorio.");
            if (!firstInvalidElement) firstInvalidElement = this.ncName;
        } else {
            showFeedBack(this.ncName, true, "Correcto.");
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ncDescription.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback,div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input, textarea, select')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.ncName.focus();
    });

    for (const input of form.querySelectorAll('input, textarea, select')) {
        input.addEventListener('change', defaultCheckElement);
    }
}

export { newDishValidation, deleteDishValidator, newCategoryValidation };
