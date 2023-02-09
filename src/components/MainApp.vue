<template>
  <div class="container">
    <section name="filter" class="filter">
      <div class="filter__search">
        <input
          type="search"
          v-model="search"
          placeholder="Введите логин или статус"
        />
      </div>
      <div class="filter__select">
        <select v-model="range" @change="addSelect()">
          <option :value="range" selected disabled>
            Выберите один из вариантов
          </option>
          <option v-for="selected in select" :key="selected">
            {{ selected }}
          </option>
        </select>
        <input type="button" value="Сбросить" @click="canselSelect()" />
      </div>
    </section>
    <section name="description" class="description">
      <div class="description__sort">
        Сортировать по:
        <span>{{ sortKey }}</span>
      </div>
      <div class="description__range">
        Выбран диапозон:
        <span v-if="range !== null"> от:{{ range[0] }} до:{{ range[1] }} </span>
        <span v-else> Диапозон не выбран </span>
      </div>
    </section>
    <section name="table" class="table">
      <div class="table-head">
        <router-link
          class="table-head__item"
          active-class="active"
          v-for="column in columns"
          :key="column"
          @click="
            $router.push({ path: 'sort', query: { column } });
            sortBy(column);
          "
          to="/"
        >
          {{ column }}
          <div class="arrow arrow__top" v-if="reverse === false"></div>
          <div class="arrow arrow__bottom" v-else></div>
        </router-link>
      </div>
      <div class="table-body">
        <div
          class="table-body__items"
          v-for="user in filterUsers"
          :key="user.id"
        >
          <div class="table-body__item">{{ user.position }}</div>
          <div class="table-body__item">{{ user.login }}</div>
          <div class="table-body__item">{{ user.orders }}</div>
          <div class="table-body__item">{{ user.status }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MainApp",
  props: {},
  data() {
    return {
      sortKey: "Место",
      reverse: false,
      columns: ["Место", "Логин", "Подтвержденные заказы", "Статус"],
      search: "",
      select: ["0-10", "10-30", "30-60", "60-100000"],
      range: null,
      users: [
        {
          id: 1,
          position: 1,
          login: "smith@gmail.com",
          orders: 312,
          status: "Ценитель красоты",
        },
        {
          id: 2,
          position: 2,
          login: "b@gmail.com",
          orders: 120,
          status: "Поставщик аксессуаров",
        },
        {
          id: 3,
          position: 3,
          login: "a@gmail.com",
          orders: 98,
          status: "Конкурент минздрава",
        },
        {
          id: 4,
          position: 4,
          login: "dog@mail.ru",
          orders: 64,
          status: "Рыбак",
        },
        {
          id: 5,
          position: 5,
          login: "nightmare@mail.ru",
          orders: 34,
          status: "Охотник",
        },
        {
          id: 6,
          position: 6,
          login: "cat@mail.ru",
          orders: 1,
          status: "Ценитель красоты",
        },
      ],
      getSortedUsers(prop, sortKey) {
        (this.reverse = false), (this.sortKey = sortKey);
        this.users.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
      },
      getFiteredUsers(user) {
        return (
          user.login.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          user.status.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      },
    };
  },
  computed: {
    filterUsers() {
      if (this.range === null) {
        return this.users.filter((user) => {
          return this.getFiteredUsers(user);
        });
      }
      return this.users
        .filter((user) => {
          return user.orders > this.range[0] && user.orders < this.range[1];
        })
        .filter((user) => {
          return this.getFiteredUsers(user);
        });
    },
  },
  methods: {
    addSelect() {
      this.range = this.range.toString().split("-").map(Number);
    },
    canselSelect() {
      (this.range = null), (this.search = "");
    },
    sortBy(sortKey) {
      switch (sortKey) {
        case this.sortKey:
          this.users.reverse(),
            (this.reverse = !this.reverse),
            (this.sortKey = sortKey);
          break;
        case "Место":
          this.getSortedUsers("position", sortKey);
          break;
        case "Логин":
          this.getSortedUsers("login", sortKey);
          break;
        case "Подтвержденные заказы":
          this.getSortedUsers("orders", sortKey);
          break;
        case "Статус":
          this.getSortedUsers("status", sortKey);
          break;
      }
    },
  },
  getters: {
    doneTodos (state) {
      return state.users
    }
  }
};
</script>

<style>
@import "../styles/css/index.min.css";
</style>
