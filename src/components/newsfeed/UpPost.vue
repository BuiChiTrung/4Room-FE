<template>
<div class="up-post container">
  <div class="row row-with-caption">
    <div class="col-2">
      <a href="#">
        <img id="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
      </a>
    </div>
    <div class="col-10 div-write-caption">
      <textarea class="form-control text-write-caption" name="caption" placeholder="what's on your mind?">
      </textarea>
    </div>
  </div>

  <div class="row attach-file">
<!--    <div class="col-10 d-flex mb-3">-->
<!--      <div class="p-2 bd-highlight">-->
<!--        <form name="uploadForm">-->
<!--          <input id="uploadInput" type="file" name="myFiles" multiple>-->
<!--          <div><input type="submit" value="Send file"></div>-->
<!--        </form>-->
<!--      </div>-->
<!--      <div class="ms-auto p-2 bd-highlight">Flex item</div>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
export default {
  name: "UpPost"
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
//div * {
//  border: 1px black solid;
//}

.up-post {
  margin-bottom: 1em;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
}

.text-write-caption {
  font-size: 12.9px;
  line-height: 1.2;
}

.row-with-caption {
  height: 7.7em;

}

.attach-file {
  margin-top: 1em;
}

.div-write-caption {
  display: inline;
}

#avatar {
  height: 5.5em;
}

textarea {
  height: 100%;
  resize: none;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
}

textarea::-webkit-scrollbar {
  width: 9px;
  background-color: #ffffff;
}

textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #b5c3da;
}

$breakpoint-tablet: 500px;
@media (max-width: $breakpoint-tablet) {
  #avatar {
    display: none;
  }
}


</style>
