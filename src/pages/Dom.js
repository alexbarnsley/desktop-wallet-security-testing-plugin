module.exports = {
  template: `
    <div>
      <h1>DOM</h1>

      <div>
        <h2>Can I access external DOM information?</h2>
        <span v-if="readContent" style="background-color: red; color: white">{{ readContent }}</span>
        <span v-if="!readContent" style="background-color: green; color: white">NO</span>
      </div>

      <div>
        <h2>Can I add content to the external DOM?</h2>
        <span>{{ appendToBottom }}</span>
      </div>

      <div>
        <h2>Can I modify existing nodes of the external DOM?</h2>
        <span>{{ alterAvatar }}</span>
      </div>

      <div>
        <h2>Can I remove existing nodes of the external DOM?</h2>
        <span>{{ removeSidebarItem }}</span>
      </div>

      <div>
        <h2>Can I listen to events of the external DOM? (click on the settings)</h2>
        <span>{{ spyClicks }}</span>
      </div>

      <div>
        <h2>Can I listen to events of the external DOM after using the plugin? (TODO)</h2>
        <span>{{ spyInputs }}</span>
      </div>
    </div>
  `,

  computed: {
    readContent () {
      return document.querySelector('.ProfileAvatar').title
    },

    /* These computed properties produce side effects that are not detected by Vue */

    appendToBottom () {
      const p = document.createElement('p')
      p.innerHTML = '&nbsp;Ecosystem amazing team'
      document.body.querySelector('footer').appendChild(p)

      return 'Yes, check the bottom'
    },

    alterAvatar () {
      this.$nextTick(() => {
        // This example doesn't work always without altering the parent element
        const $container = document.querySelector('.AppSidemenu__avatar__container')
        $container.innerHTML = ''

        const $avatar = document.querySelector('.AppSidemenu__avatar')
        $avatar.style.backgroundImage = "url('https://media.tenor.com/images/37a7adee5bca77ad3bf87aeeff5c6a1f/tenor.gif')"
        $avatar.style.backgroundSize = 'contain'
      })

      return 'Yes, see the avatar'
    },

    removeSidebarItem () {
      return 'Yes, the announcements button on the sidebar is gone'
    },

    spyClicks () {
      // document.addEventListener()
      return 'Yes, I know where you are clicking'
    },

    spyInputs () {
      // document.addEventListener()
      return 'Yes, I logged what your typed. See the console'
    }
  }
}
