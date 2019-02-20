module.exports = {
  template: `
    <div>
      <h1>Data vm</h1>
      <div>vm $parent.$store: {{ vm && vm.$parent && vm.$parent.$store ? 'true' : 'false' }}</div>
    </div>
  `,

  data (vm) {
    console.log('data vm', vm)
    return {
      vm
    }
  }
}
