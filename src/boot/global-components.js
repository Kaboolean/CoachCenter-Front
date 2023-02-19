import { boot } from 'quasar/wrappers';
import LoadingSpinner from '../components/ui/LoadingSpinner.vue';

export default boot(async ({ app }) => {
  app.component('loading-spinner', LoadingSpinner);
});
