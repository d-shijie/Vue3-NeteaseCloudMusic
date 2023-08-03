<template>
  <div class="flex">
    <section class="flex-1 px-30px overflow-hidden">
      <section class="fixed-button pt-20px flex items-center fixed bg-#2b2b2b ">
        <h3 class="p-0 m-0 mr-15px">动态</h3>
        <span class="flex items-center bg-#ec4141 px-18px py-8px rounded-2xl hover:bg-#d73535 cursor-default">
          <svg-icon name="send_event" class="mr-3px"></svg-icon>
          <span style="font-size: 14px;">发动态</span>
        </span>
      </section>

      <section class="mt-72px w-100% relative">
        <EventList />
     
      </section>
    </section>

    <section class="profile w-232px ">
      <UserInfo />
    </section>
  </div>
</template>

<script setup lang="ts">
import EventList from './components/eventList.vue'
import UserInfo from './components/userInfo.vue'
</script>

<style scoped lang="scss">
.profile {
  box-shadow: -1px 0px 1px #363636;
  min-height: calc(100vh - 112px);
  border-left: 1px solid #363636;

}

.fixed-button {
  width: calc(100vw - 520px);
}
</style>