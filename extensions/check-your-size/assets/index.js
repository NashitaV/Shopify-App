import { Extension, FieldType, Modal, TextInput } from '@shopify/checkout-ui-extensions';

const extension = new Extension();

const HEIGHT_WEIGHT_FIELD = {
  type: FieldType.Object,
  label: 'Height & Weight',
  properties: {
    height: {
      type: FieldType.String,
      label: 'Height (cm)',
      default: '',
    },
    weight: {
      type: FieldType.String,
      label: 'Weight (kg)',
      default: '',
    },
  },
};

extension.blocks.register('height-weight-block', (block) => {
  block.addComponent('Button', (component) => {
    component.setLabel('Enter Height & Weight');
    component.addEventListener('click', () => {
      const modal = new Modal({
        title: 'Enter Height & Weight',
        primaryAction: {
          label: 'Save',
          loading: true,
          onClick: (modal) => {
            const heightInput = document.getElementById('height-input');
            const weightInput = document.getElementById('weight-input');
            const { height, weight } = HEIGHT_WEIGHT_FIELD.properties;

            height.defaultValue = heightInput.value;
            weight.defaultValue = weightInput.value;

            block.saveField({
              type: 'height-weight-field',
              value: {
                height: heightInput.value,
                weight: weightInput.value,
              },
            });

            modal.close();
          },
        },
      });

      modal.appendChild(new TextInput({
        label: 'Height (cm)',
        required: true,
        id: 'height-input',
      }));

      modal.appendChild(new TextInput({
        label: 'Weight (kg)',
        required: true,
        id: 'weight-input',
      }));

      modal.show();
    });
  });
});

extension.fields.register('height-weight-field', HEIGHT_WEIGHT_FIELD);

export default extension;