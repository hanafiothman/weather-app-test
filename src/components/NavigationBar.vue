<template>
  <div id="navigation-bar">
    <nav>
      <router-link v-for="routes in links"
        class="routerlink"
        :key="routes.id"
        :to="`${routes.page}`">{{routes.title}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      links: [
        {
          id: 0,
          title: 'Home',
          page:'/home'
        }
      ]
    }
  }
}
</script>
