import {showMessage} from 'react-native-flash-message';

const showError = (message, position, description) => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
    description,
  });
};

const showSuccess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};
const showInfo = message => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
};

export {showInfo, showError, showSuccess};
