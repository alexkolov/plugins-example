import { mapGetters, mapActions } from 'vuex';

const pageMixin = {
  computed: {
    ...mapGetters([
      'plugins'
    ]),
    routeId() {
      return this.$route.meta.id
    },
    routeTitle() {
      return this.$route.meta.title
    }
  },
  methods: {
    ...mapActions([
      'loadPlugins'
    ])
  },
  created() {
    this.loadPlugins({ routeId: this.routeId });
  }
};

export default pageMixin;
