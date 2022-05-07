<template>
  <div class="snippet-list-wrapper">
    <div class="snippet-tools">
      <div class="collapse-main-sidebar">
        <button type="button" id="hide-main-nav-button">x</button>
      </div>
      <div class="search-bar">
        <label for="search">
          <input type="search" id="search" name="search" />
        </label>
      </div>
      <div class="add-new">
        <button type="button" id="hide-main-nav-button">+</button>
      </div>
    </div>
    <ul class="snippet-list">
      <li class="snippet">
        <div class="snippet-title">
          <span>Snippet 1</span> <button type="button">x</button>
        </div>
        <div class="snippet-info">
          <span class="snippet-language">PHP</span>
          <span class="snippet-date">2 days ago</span>
        </div>
      </li>
      <li class="snippet">
        <div class="snippet-title">
          <span>Snippet 1</span> <button type="button">x</button>
        </div>
        <div class="snippet-info">
          <span class="snippet-language">PHP</span>
          <span class="snippet-date">2 days ago</span>
        </div>
      </li>
      <li class="snippet">
        <div class="snippet-title">
          <span>Snippet 1</span> <button type="button">x</button>
        </div>
        <div class="snippet-info">
          <span class="snippet-language">PHP</span>
          <span class="snippet-date">2 days ago</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SnippetList',
  setup() {},
};
</script>
<style scoped>
.snippet-list-wrapper {
  width: 400px;
}
.snippet-tools {
  display: flex;
}

.search-bar {
  width: 100%;
}

#search {
  width: 100%;
}

.snippet {
  margin: 10px 0px 10px 0px;
  cursor: pointer;
}

.snippet:hover {
  background-color: yellow;
}

.snippet-title {
  display: flex;
  justify-content: space-between;
}

.snippet-info {
  display: flex;
  justify-content: space-between;
}
</style>
