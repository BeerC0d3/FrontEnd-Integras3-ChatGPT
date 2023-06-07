import { Loading, QSpinnerGears } from 'quasar';

export const loader = {
  show: () => {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: 'white',
      messageColor: 'white',
      message: 'Procesando...',
    });
  },
  hide: () => {
    Loading.hide();
  },
};
