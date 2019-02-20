module.exports = {
  template: `
    <div>
      <h1>DOM</h1>
      <h2>Can I access external DOM?</h2>

      <div>
        Access to information:
        <span v-if="spiedContent" style="background-color: red; color: white">{{ spiedContent }}</span>
        <span v-if="!spiedContent" style="background-color: green; color: white">NO</span>
      </div>

      <div>
        Change external nodes:
        {{ sideEffects }}
      </div>
    </div>
  `,

  computed: {
    spiedContent () {
      return document.querySelector('.ProfileAvatar').title
    },

    sideEffects () {
      // Adding data
      const p = document.createElement('p')
      p.innerHTML = 'A long text as example has been added to the body'
      document.body.appendChild(p)

      return '?'
    }
  }
}
