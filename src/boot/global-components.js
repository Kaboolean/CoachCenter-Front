import { boot } from 'quasar/wrappers';
import LoadingSpinner from '../components/ui/LoadingSpinner.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';

export default boot(async ({ app }) => {
  app.component('loading-spinner', LoadingSpinner);
  app.component('confirm-dialog', ConfirmDialog);
});
