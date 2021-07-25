export default function ({ app }) {
  app.i18n.onLanguageSwitched = (_, newLocale) => {
    app.store.dispatch('updateLocale', newLocale);
  }
}