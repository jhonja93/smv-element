<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    urlBase: {
      type: String,
      default: process.env.BASE_URL || "http://localhost:5000"
    },
    path: {
      type: String,
      required: true
    },
    notificar: {
      type: Boolean,
      default: false
    },
    type: {
        type: String,
        required: true
    }
  },
  watch: {
    params: {
      immediate: true,
      handler: "load"
    }
  },
  data() {
    return {
      data: null,
      error: null,
      loading: false
    };
  },
  methods: {
    load() {
      return this.query("post", '/cases/data/'+this.type, { path: this.path, ...this.params});
    },
    async query(type, ...params) {
      if (this.loading) return;

      this.loading = true;
      this.$emit("loading", true);
      try {
        const response = await this.$axios[type](...params);
        this.data = response.data;
        this.error = null;
        if (response.hasOwnProperty("errors")) {
          this.error = response.errors;
          if (this.notificar && this.error.hasOwnProperty("message"))
            this.$snotify.error(this.error.message);
          this.$emit("error", error);
        } else {
          if (this.notificar && response.data.hasOwnProperty("message"))
            this.$snotify.success(response.data.message);
          this.$emit("success", response);
        }
      } catch (error) {
        this.data = null;
        this.error = error.response;
        this.$emit("error", error);
      }
      this.loading = false;
      this.$emit("loading", false);
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data,
      error: this.error,
      load: this.load,
      loading: this.loading,
      error: this.error
    });
  }
};
</script>
