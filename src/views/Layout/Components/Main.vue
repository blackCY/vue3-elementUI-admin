<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="scss" scoped>
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-right: 30px;
  padding-top: 105px;
  padding-left: 230px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0;
  background-color: #fff;
  @include webkit(box-sizing, border-box);
}
</style>
