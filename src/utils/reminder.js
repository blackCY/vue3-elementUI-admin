import { Message } from 'element-ui';

export default ({ message, type = 'info', duration = 2000, center, iconClass, showClose, onClose }) => {
  Message({
    message,
    type,
    duration,
    center,
    iconClass,
    showClose,
    onClose,
  });
};
