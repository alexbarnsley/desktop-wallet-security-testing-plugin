module.exports = {
  template: `
    <div>
      <h1>DB</h1>
      <div class="text-theme-feature">Can I access IndexedDB?: {{ testIndexedDB }}</div>
    </div>
  `,

  computed: {
    testIndexedDB () {
      return '?'
    }
  }
}
