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
        <h2>Can I listen to events of the external DOM?</h2>
        <h3>{{ spyClicks }}</h3>
        <span v-if="currency" style="background-color: red; color: white">
          Yes, I know where you are clicking and that you changed your currency to {{ currency }}
        </span>
        <span v-if="!currency" style="background-color: green; color: white">
          I'm not doing anything dangerous
        </span>
      </div>

      <div>
        <h2>Can I listen to events of the external DOM after using the plugin? (TODO)</h2>
        <span>{{ spyInputs }}</span>
      </div>
    </div>
  `,

  data () {
    return {
      currency: null
    }
  },

  computed: {
    readContent () {
      return document.querySelector('.ProfileAvatar').title
    },

    /* These computed properties produce side effects that are not detected by Vue */

    appendToBottom () {
      const $p = document.createElement('p')
      $p.innerHTML = '&nbsp;Ecosystem amazing team'
      document.body.querySelector('footer').appendChild($p)

      return 'Yes, check the bottom'
    },

    alterAvatar () {
      this.$nextTick(() => {
        // This example doesn't work always without altering the parent element
        const $container = document.querySelector('.AppSidemenu__avatar__container')
        $container.innerHTML = ''

        const $avatar = document.querySelector('.AppSidemenu__avatar')
        if ($avatar) {
          $avatar.style.backgroundImage = "url('https://media.tenor.com/images/37a7adee5bca77ad3bf87aeeff5c6a1f/tenor.gif')"
          $avatar.style.backgroundSize = 'contain'
        }
      })

      return 'Yes, see the avatar'
    },

    removeSidebarItem () {
      this.$nextTick(() => {
        const $container = document.querySelector('.AppSidemenu__container')
        $container.innerHTML = ''

        const $item = document.querySelector('.MenuNavigationItem[title=Announcements]')
        const $parent = $item.parentElement
        if ($parent) {
          $item.innerHTML = ''
          $parent.removeChild($item)
        }
      })

      return 'Yes, the announcements button on the sidebar is gone forever'
    },

    /**
     * Listening to some nodes and iterating over all the `event.paths` break the application and dev tools,
     * so we check the target only
     */
    spyClicks () {
      document.getElementById('app').addEventListener('click', event => {
        const $button = event.target.querySelector('button')
        if ($button) {
          const $inner = $button.querySelector('button span span')
          if ($inner) {
            // `setTimeout` is disabled
            this.$nextTick(() => {
              const $items = document.querySelectorAll('.MenuDropdownItem__button')
              if ($items) {
                $items.forEach($item => {
                  $item.addEventListener('click', event => {
                    this.currency = event.target.innerText.trim()
                  })
                })
              }
            })
          }
        }
      })

      return 'Click on the settings and change the currency'
    },

    spyInputs () {
      // document.addEventListener()
      return 'Yes, I logged what your typed. See the console'
    }
  }
}
