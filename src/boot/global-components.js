import { boot } from 'quasar/wrappers';
import LoadingSpinner from '../components/ui/LoadingSpinner.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import UserInput from '../components/ui/UserInput.vue';
import UserNumber from '../components/ui/UserNumber.vue';
import UserDate from '../components/ui/UserDate.vue';

export default boot(async ({ app }) => {
  app.component('loading-spinner', LoadingSpinner);
  app.component('confirm-dialog', ConfirmDialog);
  app.component('user-input', UserInput);
  app.component('user-number', UserNumber);
  app.component('user-date', UserDate);
});
