export function initializeForm(formName, form, values) {
  return async function () {
    let callbackModule = null;
    try {
      callbackModule = await import(/* @vite-ignore */ `/js/${formName}.js`);
    } catch (error) {
      console.log(`Could not load callback module ${formName}: ${error}`);
    }

    const validatorsModule = await import(/* @vite-ignore */ '~/lib/forms/validators');

    function validateFields(path, errors, values, fields) {
      fields.map((item) => {
        if (item['columns'] != undefined) {
          item['columns'].map((column) => {
            validateFields(path, errors, values, column.fields);
          });
        } else {
          if (item['validator'] != undefined) {
            try {
              validatorsModule[item['validator']](values[item.name], values, path);
            } catch (error) {
              errors[item.name] = error;
            }
          }
        }
      });
    }

    async function submitForm(event) {
      if (callbackModule) {
        const formElement = document.getElementById(formName.replace(/\//, '-'));
        if (formElement) {
          event.preventDefault();

          const element = document.createElement('input');
          element.setAttribute('name', 'submit');
          element.setAttribute('value', event.submitter.value);
          element.setAttribute('class', 'hidden');
          formElement.appendChild(element);

          if (typeof callbackModule.formCallback === 'function') {
            const formData = new FormData(formElement, event.submitter);
            const formErrors = {};
            const updatedValues = {};

            for (const field of Array.from(formData.entries())) {
              updatedValues[field[0]] = field[1];
            }

            validateFields(updatedValues['origin-path'], formErrors, updatedValues, form.fields);

            if (Object.keys(formErrors).length == 0) {
              const url = new URL(formElement.action);
              try {
                await callbackModule.formCallback(formName, form, updatedValues);
                url.searchParams.delete(`${formName.replace(/\//, '-')}-error`);
              } catch (error) {
                url.searchParams.delete(`${formName.replace(/\//, '-')}-error`);
                url.searchParams.append(`${formName.replace(/\//, '-')}-error`, error.message);
              }
              formElement.action = url.toString();
            }
          }

          formElement.removeEventListener('submit', submitForm);
          Object.getPrototypeOf(formElement).submit.call(formElement);
        }
      }
    }

    if (callbackModule) {
      const formElement = document.getElementById(formName.replace(/\//, '-'));
      if (formElement) {
        formElement.addEventListener('submit', submitForm);

        document.addEventListener(
          'astro:before-swap',
          () => {
            formElement.removeEventListener('submit', submitForm);
          },
          { once: true }
        );

        if (typeof callbackModule.formInitialize === 'function') {
          await callbackModule.formInitialize(formName, form, values);
        }
      }
    }
  };
}
